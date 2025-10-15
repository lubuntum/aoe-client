import "./css/selector_style.css"

import { useState } from "react"

export const MultipleSelector = ({items = ['default1', 'default2', 'default3'], defaultActiveIndex = 2}) => { 
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)

    const handleItemClick = (index) => {
        setActiveIndex(index)
    }

    return (<>
        <div className="multiple_selector">
            {items.map((item, index) => (
                <div className={`selector_item ${index === activeIndex ? "selector_active" : ""}`} onClick={() => handleItemClick(index)}>
                    {item}
                </div>
            ))}
        </div>
    </>)
}