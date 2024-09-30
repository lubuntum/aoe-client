import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const Burger = () => {
    return (<>
        <div className="navBurger" style={{display: "none"}}>
            <input type="checkbox" id="navBurgerCheckbox"></input>
            <label className="btn" for="navBurgerCheckbox"><MenuIcon className="svgIcon"/></label>
            <nav>
                <a href="#">Главная</a>
                <a href="#">Преимущества</a>
                <a href="#">Как начать учиться</a>
                <a href="#">Тарифы</a>
                <a href="#">Отзывы</a>
                <a href="#">Партнеры</a>
                <a href="#">FAQ</a>
                <a href="#">Задания</a>
            </nav>
        </div>
    </>)
}