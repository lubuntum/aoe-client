import "./css/dropdown_list.css"
import { ReactComponent as UnfoldMore } from "../../res/icons/unfold_more_24dp_gi.svg"
import { useState, useEffect, useRef } from "react"

export const DropdownList = ({options, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(options[0])
    const dropdownRef = useRef(null)
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }
    const handleOptionClick = (option) => {
        setSelectedOption(option)
        onSelect(option)
        setIsOpen(false)
    }
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (<>
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdownToggle" onClick={toggleDropdown}>
                {selectedOption}
                <UnfoldMore className="svgIcon"/>
            </div>
            {isOpen && (
                <div className="dropdownMenu">
                    {options.map((option, index) => ( <>
                        <div key={index}
                             className="dropdownItem"
                             onClick={()=>handleOptionClick(option)}>
                            {option}
                        </div>
                    </>))}
                </div>
            )}
        </div>
    </>)
}