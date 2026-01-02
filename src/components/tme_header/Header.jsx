import "./header_style.css"
import "./header_media_style.css"

import { useLocation, useNavigate } from "react-router-dom"

import routes from "../../routes.js"
import { useAuth } from "../../modules/auth_modules/AuthProvider.js"
import { Btn } from "../tme_reusable/Btn.jsx"
import { BtnLink } from "../tme_reusable/BtnLink.jsx"
import { BtnIcon } from "../tme_reusable/BtnIcon.jsx"

import { ReactComponent as MenuI } from "../../res/icons/menu_24dp_gi.svg"
import { ReactComponent as LogoutI } from "../../res/icons/logout_svg_gi_24p.svg"
import { useCallback, useEffect, useRef, useState } from "react"
import { getHeaderData } from "../../modules/api_modules/accountAPI.js"

/**
 * Компонент хедера с навигацией, состояниями аутентификации и адаптивным выпадающим меню
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {boolean} [props.updateData=false] - Флаг для обновления данных
 * @param {Function} [props.setUpdateData=null] - Колбэк для сброса флага обновления
 * @returns {JSX.Element} Компонент хедера
 */
export const Header = ({ updateData = false, setUpdateData = null }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const { logout, isAuth, checkAuth } = useAuth()

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [headerData, setHeaderData] = useState()
    const dropdownRef = useRef(null)

    /**
     * Загружает данные для хедера из API
     * @type {Function}
     * @async
     * @throws {Error} При ошибке запроса к API
     */
    const fetchHeaderData = useCallback(async () => {
        try {
            const response = await getHeaderData(localStorage.getItem("token"))
            console.log("Header data fetched")
            setHeaderData(response.data)
        } catch (error) {
            console.error("Error fetch header data:", error)
            logout()
        }
    }, [logout])

    /**
     * Прокручивает к секции на главной странице
     * @param {string} sectionId - ID секции для прокрутки
     */
    const scrollToSection = useCallback((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const elementPosition = element.getBoundingClientRect().top
            const offsetPostion = elementPosition + window.pageYOffset - 75

            window.scrollTo({ 
                top: offsetPostion,
                behavior: 'smooth',
                block: 'start'
            })
        }
    }, [])

    /**
     * Обрабатывает переход на главную с последующей прокруткой
     * @param {string} sectionId - ID секции для прокрутки
     */
    const navigateToHomeWithScroll = useCallback((sectionId) => {
        if (location.pathname === routes.HOME) {
            // Если уже на главной, просто прокручиваем
            scrollToSection(sectionId)
        } else {
            // Если не на главной, переходим на главную и передаем sectionId в состоянии
            navigate(routes.HOME, { 
                state: { 
                    scrollToSection: sectionId,
                    scrollImmediately: true
                } 
            })
        }
    }, [location.pathname, navigate, scrollToSection])

    /**
     * Обрабатывает клик по логотипу - прокручивает вверх или переходит на главную
     * @type {Function}
     */
    const handleLogoClick = useCallback(() => {
        if (location.pathname === routes.HOME) {
            window.scrollTo(0, 0)
        }
        else {
            navigate(routes.HOME)
        }  
    }, [location.pathname, navigate])

    /**
     * Закрывает выпадающее меню
     * @type {Function}
     */
    const closeDropdown = useCallback(() => {
        setIsDropdownOpen(false)
    }, [])

    /**
     * Обрабатывает клик по навигационной кнопке с возможностью прокрутки
     * @param {string} sectionId - ID секции для прокрутки
     */
    const handleNavButtonClick = useCallback((sectionId) => {
        navigateToHomeWithScroll(sectionId)
        closeDropdown()
    }, [navigateToHomeWithScroll, closeDropdown])

    /**
     * Переключает видимость выпадающего меню
     * @type {Function}
     */
    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen(prev => !prev)
    }, [])

    /**
     * Обрабатывает перемещение касания для закрытия выпадающего меню на мобильных устройствах
     * @type {Function}
     */
    const handleTouchMove = useCallback((e, touchStartX, touchStartY) => {
        const touchCurrentX = e.touches[0].clientX
        const touchCurrentY = e.touches[0].clientY
        
        const deltaX = Math.abs(touchCurrentX - touchStartX)
        const deltaY = Math.abs(touchCurrentY - touchStartY)
        
        if (deltaX > 10 || deltaY > 10) {
            closeDropdown()
            return true
        }
        return false
    }, [closeDropdown])

    /**
     * Обрабатывает клик вне выпадающего меню
     * @type {Function}
     */
    const handleClickOutside = useCallback((event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            closeDropdown()
        }
    }, [closeDropdown])

    /**
     * Обрабатывает изменение размера окна для закрытия выпадающего меню на десктопной ширине
     * @type {Function}
     */
    const handleResize = useCallback(() => {
        if (window.innerWidth > 997) { 
            closeDropdown()
        }
    }, [closeDropdown])

    /**
     * Обработчик навигации с закрытием выпадающего меню
     * @type {Function}
     */
    const handleNavigation = useCallback((route) => {
        navigate(route)
        closeDropdown()
    }, [navigate, closeDropdown])

    /**
     * Обработчик действий аутентификации с закрытием выпадающего меню
     * @type {Function}
     */
    const handleAuthAction = useCallback((action) => {
        if (action === 'logout') {
            logout()
        } else {
            navigate(routes.AUTORIZATION)
        }
        closeDropdown()
    }, [logout, navigate, closeDropdown])

    // Обработка состояния из location.state для прокрутки после перехода
    useEffect(() => {
        if (location.pathname === routes.HOME && location.state?.scrollToSection) {
            // Небольшая задержка для гарантии, что страница загрузилась
            const timer = setTimeout(() => {
                scrollToSection(location.state.scrollToSection)
                // Очищаем состояние, чтобы не прокручивать при повторном рендере
                navigate(routes.HOME, { replace: true, state: {} })
            }, 100)
            
            return () => clearTimeout(timer)
        }
    }, [location.pathname, location.state, navigate, scrollToSection])

    // Загружает данные хедера при изменении аутентификации
    useEffect(() => {
        if (!isAuth) return
        fetchHeaderData()
    }, [isAuth, fetchHeaderData])

    // Обновляет данные при изменении флага updateData
    useEffect(() => {
        if (updateData === false) return
        
        const updateHeader = async () => {
            checkAuth()
            await fetchHeaderData()
            setUpdateData(false)
        }
        updateHeader()
    }, [updateData, fetchHeaderData, setUpdateData, checkAuth])

    // Обработчики событий для выпадающего меню
    useEffect(() => {
        if (!isDropdownOpen) return

        const handleScroll = () => closeDropdown()
        const handleTouchStart = (e) => {
            const touchStartX = e.touches[0].clientX
            const touchStartY = e.touches[0].clientY
            
            const onTouchMove = (e) => {
                handleTouchMove(e, touchStartX, touchStartY)
            }
            
            const onTouchEnd = () => {
                document.removeEventListener('touchmove', onTouchMove)
                document.removeEventListener('touchend', onTouchEnd)
            }
            
            document.addEventListener('touchmove', onTouchMove)
            document.addEventListener('touchend', onTouchEnd)
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('scroll', handleScroll, true)
        document.addEventListener('touchstart', handleTouchStart)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('scroll', handleScroll, true)
            document.removeEventListener('touchstart', handleTouchStart)
        }
    }, [isDropdownOpen, handleClickOutside, handleTouchMove, closeDropdown])

    // Обработчик изменения размера окна
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [handleResize])

    return (
        <>
            <div className="header_fixed">
                <div className="header_logo" onClick={handleLogoClick}>
                    <p>TestMy<span>Eng</span></p>
                </div>

                <div className="header_desktop_nav">
                    <BtnLink btnText="Главная" btnFunc={() => handleNavButtonClick("main_banner_section")} />

                    <BtnLink btnText="Преимущества" btnFunc={() => handleNavButtonClick("main_advantages_section")}/>

                    <BtnLink btnText="Как пользоваться" btnFunc={() => handleNavButtonClick("main_guide_section")}/>

                    <BtnLink btnText="Варианты" btnFunc={() => navigate(routes.TASK)} />
                </div>

                <div className="header_desktop_buttons">
                    {!isAuth && (
                        <Btn btnText="Войти" btnFunc={() => navigate(routes.AUTORIZATION)} />
                    )}

                    {isAuth && (
                        <BtnLink btnText="Личный кабинет" btnFunc={() => navigate(routes.ACCOUNT)} />
                    )}

                    {isAuth && (
                        <BtnIcon btnIcon={<LogoutI className="svg_icon" />} btnFunc={logout} />
                    )}
                </div>
                
                <div className="header_mobile_buttons">
                    <BtnIcon btnIcon={<MenuI className="svg_icon" />} btnFunc={toggleDropdown} />

                    <div className={`header_dropdown ${isDropdownOpen ? "header_dropdown_open" : ""}`} ref={dropdownRef}>
                        <BtnLink btnText="Главная" btnFunc={() => handleNavButtonClick("main_banner_section")} />

                        <BtnLink btnText="Преимущества" btnFunc={() => handleNavButtonClick("main_advantages_section")} />

                        <BtnLink btnText="Как пользоваться" btnFunc={() => handleNavButtonClick("main_guide_section")} />

                        <BtnLink btnText="Варианты" btnFunc={() => handleNavigation(routes.TASK)} />

                        {!isAuth && (
                            <BtnLink btnText="Войти" btnFunc={() => handleAuthAction('login')} />
                        )}

                        {isAuth && (
                            <BtnLink btnText="Личный кабинет" btnFunc={() => handleNavigation(routes.ACCOUNT)} />
                        )}

                        {isAuth && (
                            <BtnLink btnText="Выход" btnFunc={() => handleAuthAction('logout')} />
                        )}
                    </div>
                </div>
                
                {isDropdownOpen && (
                    <div className="dropdown_overlay" onClick={closeDropdown}></div>
                )}
            </div>
        </>
    )
}