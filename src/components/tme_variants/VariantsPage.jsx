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

    const cards = [
        {id: 1, authRequired: false, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 2, authRequired: false, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 3, authRequired: false, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 4, authRequired: false, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 5, authRequired: false, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},

        {id: 6, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 7, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 8, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 9, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 10, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 11, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 12, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 13, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 14, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 15, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 16, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 17, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 18, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 19, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 20, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 21, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 22, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 23, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 24, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 25, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 26, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 27, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 28, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 29, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
        {id: 30, authRequired: true, image: "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg"},
    ]

    const [visibleCount, setVisibleCount] = useState(9)
    const [isLoading, setIsLoading] = useState(false)
    const [preloadedImages, setPreloadedImages] = useState(new Set())

    // Предзагрузка всех изображений при монтировании компонента
    useEffect(() => {
        const preloadedAllImages = async () => {
            const imageUrls = cards.map(card => card.image).filter(Boolean)
            try {
                await Promise.allSettled(imageUrls.map(url => preloadImage(url)))
                setPreloadedImages(new Set(imageUrls))
            } catch (error) {
                console.warn("Some images failed to preload:", error)
            }
        }
        preloadedAllImages()
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
        const nextImages = nextCards.map(card => card.image).filter(Boolean)

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
                        <VariantsCard key={card.id} isLocked={!isAuth && card.authRequired} imgUrl={card.image} isPreloaded={preloadedImages.has(card.image)}/>
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