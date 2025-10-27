import "./variants_style.css"
import "./variants_media_style.css"

import { Footer } from "../tme_footer/Footer"

import { Header } from "../tme_header/Header"
import { MultipleSelector } from "../tme_reusable/MultipleSelector"
import { Loader } from "../tme_reusable/Loader"
import { VariantsCard } from "./VariantsCard"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { Btn } from "../tme_reusable/Btn"

import { ReactComponent as FeedbackI } from "../../res/icons/feedback_24dp_gi.svg"
import { useCallback, useEffect, useMemo, useState } from "react"
import { getAvailableVariants, getVariants } from "../../modules/api_modules/variantAPI"

// Функция предзагрузки изображений
const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(src)
        img.onerror = reject
        img.src = src
    })
}

export const VariantsPage = () => {
    const { isAuth } = useAuth()

    const [cards, setCards] = useState([])
    const [visibleCount, setVisibleCount] = useState(9)
    const [isLoading, setIsLoading] = useState(false)
    const [preloadedImages, setPreloadedImages] = useState(new Set())

    useEffect(() => {
        const loadVariants = async () => {
            try {
                const response = await getVariants()
                console.log(response.data)
                
                // Process the cards based on authentication
                const processedCards = (response.data || []).map((card, index) => {
                    console.log(isAuth)
                    if (isAuth) {
                        // If user is authenticated, all cards are unlocked
                        return { ...card, isLocked: false }
                    } else {
                        // If user is not authenticated, only first 4 cards are unlocked
                        return { ...card, isLocked: index >= 5 }
                    }
                })
                
                setCards(processedCards)
            } catch (error) {
                console.error("Failed to load variants:", error)
                setCards([])
            }
        }
        loadVariants()
    }, [isAuth]) // Add isAuth as dependency to reload when auth changes

    // Предзагрузка всех изображений при изменении cards
    useEffect(() => {
        const preloadedAllImages = async () => {
            const imageUrls = cards.map(card => card.imagePath).filter(Boolean)
            try {
                await Promise.allSettled(imageUrls.map(url => preloadImage(url)))
                setPreloadedImages(new Set(imageUrls))
            } catch (error) {
                console.warn("Some images failed to preload:", error)
            }
        }
        
        if (cards.length > 0) {
            preloadedAllImages()
        }
    }, [cards])

    // Видимые карточки с мемоизацией
    const visibleCards = useMemo(() => 
        cards.slice(0, visibleCount),
        [cards, visibleCount]
    )

    // Оптимизированная функция подгрузки дополнительных карточек
    const handleShowMore = useCallback(async () => {
        if (isLoading) return
        setIsLoading(true)

        const nextCards = cards.slice(visibleCount, visibleCount + 9)
        const nextImages = nextCards.map(card => card.imagePath).filter(Boolean)

        try {
            await Promise.allSettled(nextImages.map(url => preloadImage(url)))
        } catch (error) {
            console.warn("Some images failed to preload:", error)
        }

        requestAnimationFrame(() => {
            setVisibleCount(prev => {
                const newCount = prev + 9
                return newCount > cards.length ? cards.length : newCount
            })
            setTimeout(() => setIsLoading(false), 50)
        })
    }, [isLoading, cards, visibleCount])

    // Проверка на то есть ли еще элементы в массиве карточек
    const hasMoreCards = visibleCount < cards.length

    return (<>
        <Header/>
        
        <div className="content_wrapper">
            <section>
                <MultipleSelector items={["ОГЭ", "ЕГЭ", "Мои ответы"]} defaultActiveIndex={1}/>
                
                {!isAuth && <div className="warning_massage">
                    <FeedbackI className="svg_icon"/>
                    <p>Чтобы разблокировать остальные варианты сначала зарегистрируйся и/или войди в свой аккаунт!</p>
                </div>}
            </section>
            
            <section>
                <div className="variants_grid">
                    {visibleCards.map(card => (
                        <VariantsCard 
                            key={card.id} 
                            card={card}
                            imgUrl={card.imagePath} 
                            isPreloaded={preloadedImages.has(card.imagePath)}
                        />
                    ))}
                </div>
            </section>
            
            {hasMoreCards && 
            <section>
                {!isLoading ? <Btn btnText={"Показать еще"} btnFunc={handleShowMore} btnDis={isLoading}/> : <Loader/> }
            </section>}
        </div>

        <Footer/>
    </>)
}