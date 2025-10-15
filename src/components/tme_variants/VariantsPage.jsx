import "./variants_style.css"
import "./variants_media_style.css"

import { Footer } from "../tme_footer/Footer"

import { Header } from "../tme_header/Header"
import { MultipleSelector } from "../tme_reusable/MultipleSelector"
import { VariantsCard } from "./VariantsCard"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { Btn } from "../tme_reusable/Btn"

import { ReactComponent as FeedbackI } from "../../res/icons/feedback_24dp_gi.svg"

export const VariantsPage = () => {
    const { isAuth } = useAuth()

    const cards = [
        {id: 1, authRequired: false},
        {id: 2, authRequired: false},
        {id: 3, authRequired: false},
        {id: 4, authRequired: false},
        {id: 5, authRequired: false},

        {id: 6, authRequired: true},
        {id: 7, authRequired: true},
        {id: 8, authRequired: true},
        {id: 9, authRequired: true},
    ]

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
                    {cards.map(card => (
                        <VariantsCard isLocked={!isAuth && card.authRequired}/>
                    ))}
                </div>
            </section>
            
            <section>
                <Btn btnText={"Показать еще"}/>
            </section>
        </div>

        <Footer/>
    </>)
}