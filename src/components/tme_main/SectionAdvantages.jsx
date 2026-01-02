import caseStudyAdv from "../../res/images/case_study_adv.webp"
import chatAdv from "../../res/images/chat_adv.webp"
import checklistAdv from "../../res/images/checklist_adv.webp"
import testAdv from "../../res/images/test_adv.webp"
import timeAdv from "../../res/images/time_adv.webp"
import variantAdv from "../../res/images/variant_adv.webp"
import { ReactComponent as FavoriteI } from "../../res/icons/favorite_24dp_gi.svg"
import { BtnLike } from "../tme_reusable/BtnLike"

export const SectionAdvantages = () => {
    return (<>
        <section className="main_advantages_section" id="main_advantages_section">
            <h1>Преимущества нашего сервиса</h1>

            <div className="main_advantages_container">
                <div className="main_advantages_item">
                    <p>Экономия времени<br/>и денег</p>

                    <img src={timeAdv} alt="advantages_icon"/>

                    <div className="main_advantages_likes_container">
                        <BtnLike btnIcon={<FavoriteI className="svg_icon"/>} btnLike={true}/>
                        <p>0</p>
                    </div>
                </div>

                <div className="main_advantages_item">
                    <p>Соответствие реальному<br/>формату ЕГЭ</p>

                    <img src={testAdv} alt="advantages_icon"/>

                    <div className="main_advantages_likes_container">
                        <BtnLike btnIcon={<FavoriteI className="svg_icon"/>} btnLike={true}/>
                        <p>0</p>
                    </div>
                </div>

                <div className="main_advantages_item">
                    <p>Количество вариантов<br/>доступных для тренировки</p>

                    <div className="main_advantages_variants_count">
                        <div className="main_advantages_variants_item">
                            <img src={variantAdv} alt="advantages_icon"/>
                            <p className="advantage_counter">30</p>
                            <p>Вариантов</p>
                        </div>

                        <div className="main_advantages_variants_item">
                            <img src={checklistAdv} alt="advantages_icon"/>
                            <p className="advantage_counter">120</p>
                            <p>Заданий</p>
                        </div>
                    </div>

                    <div className="main_advantages_likes_container">
                        <BtnLike btnIcon={<FavoriteI className="svg_icon"/>} btnLike={true}/>
                        <p>0</p>
                    </div>
                </div>

                <div className="main_advantages_item">
                    <p>Большой выбор<br/>оригинальных вариантов</p>

                    <img src={caseStudyAdv} alt="advantages_icon"/>

                    <div className="main_advantages_likes_container">
                        <BtnLike btnIcon={<FavoriteI className="svg_icon"/>} btnLike={true}/>
                        <p>0</p>
                    </div>
                </div>

                <div className="main_advantages_item">
                    <p>Мгновенная<br/>обратная связь</p>

                    <img src={chatAdv} alt="advantages_icon"/>

                    <div className="main_advantages_likes_container">
                        <BtnLike btnIcon={<FavoriteI className="svg_icon"/>} btnLike={true}/>
                        <p>0</p>
                    </div>
                </div>
            </div>
        </section>
    </>)
}