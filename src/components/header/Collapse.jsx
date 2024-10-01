import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const Collapse = () => {
    return (<>
        <div className="collapseMenu">
            <input type="checkbox" id="collapseMenuCheckbox"></input>
            <label className="btn" for="collapseMenuCheckbox"><MenuIcon className="svgIcon"/> Меню</label>
            <nav>
                <a href="#">Преимущества</a>
                <a href="#">Как начать учиться</a>
                <a href="#">Отзывы</a>
                <a href="#">Партнеры</a>
                <a href="#">FAQ</a>
            </nav>
        </div>
    </>)
}