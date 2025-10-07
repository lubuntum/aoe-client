import "./footer_style.css"

import { useNavigate } from "react-router-dom"

import routes from "../../routes.js"
import { BtnLink } from "../tme_reusable/BtnLink"

import { ReactComponent as TelegramI } from "../../res/icons/telegram_24dp.svg"
import { ReactComponent as VKI } from "../../res/icons/vk_24dp.svg"

export const Footer = () => {
    const navigate = useNavigate()

    return (<>
        <div className="footer">
            <div className="footer_wrapper">
                <div className="footer_info">
                    <div className="footer_container">
                        <div className="footer_logo">
                            <p>TestMy<span>Eng</span></p>
                        </div>

                        <div className="footer_socials">
                            <TelegramI className="svg_icon" onClick={()=>{window.open("https://t.me/aoe_channel1", "_blank")}}/>
                            <VKI className="svg_icon" onClick={()=>{window.open("https://vk.com/academy_oe", "_blank")}}/>
                        </div>
                    </div>

                    <div className="footer_container">
                        <div className="footer_title">
                            <p>О нас</p>
                        </div>

                        <div className="footer_body">
                            <p>Сервис подготовки к устной части ЕГЭ по английскому языку с котиками и печеньками</p>
                        </div>
                    </div>

                    <div className="footer_container">
                        <div className="footer_title">
                            <p>Навигация</p>
                        </div>

                        <div className="footer_body">
                            <BtnLink btnText={"Главная"}/>
                            <BtnLink btnText={"Преимущества"}/>
                            <BtnLink btnText={"Как пользоваться"}/>
                            <BtnLink btnText={"Варианты"} btnFunc={()=>navigate(routes.TASK)}/>
                        </div>
                    </div>

                    <div className="footer_container">
                        <div className="footer_title">
                            <p>Контакты</p>
                        </div>

                        <div className="footer_body">
                            <p>Осипов Вячеслав Сергеевич</p>
                            <p>osipowvs@gmail.com</p>
                            <p>+7 (906) 190 10-50</p>
                            <p>ИНН 1900012716</p>
                        </div>
                    </div>
                </div>

                <div className="footer_divider"></div>

                <div className="footer_bottom">
                    <div className="footer_docs">
                        <BtnLink btnText={"Политика конфиденциальности"} btnFunc={()=>{window.open(routes.PRIVACY_POLICE, "_blank")}}/>
                        <BtnLink btnText={"Пользовательское соглашение"} btnFunc={()=>{window.open(routes.USER_AGREEMENT, "_blank")}}/>
                    </div>

                    <div className="footer_meta">
                        <p>© ООО "Цифровые образовательные решения"</p>
                        <p>client build 1.6.22</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}