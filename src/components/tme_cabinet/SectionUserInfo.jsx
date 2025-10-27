import { Btn } from "../tme_reusable/Btn"
import { Field } from "../tme_reusable/Field"

export const SectionUserInfo = () => {
    return (<>
        <section className="cabinet_section">
            <h3>Личный кабинет</h3>

            <div className="cabinet_user_info">
                <div className="user_data">
                    <div>
                        <p>Почта</p>
                        <p>timofeyershovv@gmail.com</p>
                    </div>

                    <div>
                        <p>Баланс</p>
                        <p>200,00 ₽</p>
                    </div>

                    <div>
                        <p>Имя</p>
                        <Field type="text" ph={"Имя"}/>
                    </div>

                    <div>
                        <p>Фамилия</p>
                        <Field type="text" ph={"Фамилия"}/>
                    </div>
                </div>

                <div className="user_save">
                    <Btn btnText={"Сохранить"}/>
                </div>
            </div>
        </section>
    </>)
}