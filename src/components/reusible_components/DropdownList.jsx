import "./css/dropdown_list.css"

import { useState, useEffect, useRef, useCallback } from "react"

import { ReactComponent as UnfoldMore } from "../../res/icons/unfold_more_24dp_gi.svg"


export const DropdownList = ({options, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(options[0])
    const dropdownRef = useRef(null)

    const toggleDropdown = useCallback(() => {
        setIsOpen(!isOpen)
    }, [])

    const handleOptionClick = useCallback((option) => {
        setSelectedOption(option)
        onSelect(option)
        setIsOpen(false)
    }, [onSelect])

    const handleClickOutside = useCallback((event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    }, [])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [handleClickOutside])

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdownToggle" onClick={toggleDropdown}>
                {selectedOption}
                <UnfoldMore className="svgIcon"/>
            </div>
            {isOpen && (
                <div className="dropdownMenu">
                    {options.map((item, index) => ( <>
                        <div key={`dropdownItem${index}`}
                             className="dropdownItem"
                             onClick={()=>handleOptionClick(item)}>
                            {item}
                        </div>
                    </>))}
                </div>
            )}
        </div>
    )
}