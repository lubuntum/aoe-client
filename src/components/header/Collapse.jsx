import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import { useEffect, useState } from "react"

export const Collapse = () => {

    const [collapseTop, setCollapseTop] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setCollapseTop(true);
            } else {
                setCollapseTop(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (<>
        <div className="collapseMenu">
            <input type="checkbox" id="collapseMenuCheckbox"></input>
            <label className="btn" for="collapseMenuCheckbox"><MenuIcon className="svgIcon"/> Меню</label>
            <nav className={`${collapseTop ? 'collapseTop120' : 'collapseTop140'}`}>
                <a href="#">Преимущества</a>
                <a href="#">Как начать учиться</a>
                <a href="#">Отзывы</a>
                <a href="#">Партнеры</a>
                <a href="#">FAQ</a>
            </nav>
        </div>
    </>)
}