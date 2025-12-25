import "./css/dropdown_style.css"

import { useEffect, useRef, useState } from "react"

export const Dropdown = ({options, selectedValue, onSelect, label, placeholder = "Placeholder", disabled = false, containerWidth}) => {
    const [isOpen, setIsOpen] = useState(false)

    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("touchstart", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("touchstart", handleClickOutside)
        }
    }, [])

    const getSelectedText = () => {
        if (!selectedValue) return placeholder
        const selectedOption = options.find(option => option.value === selectedValue)
        return selectedOption ? selectedOption.label : placeholder
    }

    const handleSelect = (value) => {
        onSelect(value)
        setIsOpen(false)
    }

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen)
        }
    }

    return (<>
        <div className="custom_dropdown" ref={dropdownRef}>
            {label && <label className="dropdown_label">{label}</label>}

            <div className="dropdown_container" style={{ width: containerWidth }}>
                <div className={`dropdown_header ${isOpen ? "dropdown_header--open" : ""} ${disabled ? "dropdown_header--disabled" : ""}`} onClick={toggleDropdown}>
                    <span className="dropdown_selected_text">{getSelectedText()}</span>
                </div>
                
                {isOpen && (
                    <div className="dropdown_menu">
                        <div className="dropdown_items_container">
                            {options.length === 0 ? (
                                <div>
                                    Нет доступных опций
                                </div>    
                            ) : (
                                <ul className="dropdown_items_list">
                                    {options.map((option) => (
                                        <li className={`dropdown_item ${selectedValue === option.value ? "dropdown_item--selected" : ""}`} key={option.value} onClick={() => handleSelect(option.value)}>
                                            <span className="dropdown_item_label">{option.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>)
}