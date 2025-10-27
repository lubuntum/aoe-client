import { useState } from "react"

import { ReactComponent as FilterI } from "../../res/icons/filter_24dp_gi.svg"

export const Filter = ({onFilterChange}) => {
    const [filters, setFilters] = useState({
        type: null, // null | "tasks" | "exams"
        sort: "newest", // "newest" | "oldest"
        status: null, // null | "pending" | "checked" | "others"
    })

    const handleFilterChange = (filterType, value) => {
        const newValue = filters[filterType] === value ? null : value

        const newFilters = {
            ...filters,
            [filterType]: newValue
        }

        setFilters(newFilters)
        onFilterChange(newFilters)

        console.log("New filter settings:", newFilters)
    }

    const resetFilter = () => {
        const defaultFilters = {
            type: null,
            sort: "newest",
            status: null,
        }

        setFilters(defaultFilters)
        onFilterChange(defaultFilters)

        console.log("Filtering reset")
    }

    return (<>
        <div className="answer_filter_container">
            <FilterI className="svg_icon"/>

            <div className="filter_options">
                <button className={filters.type === "tasks" ? "active" : ""} onClick={() => handleFilterChange("type", "tasks")}>Задание</button>
                <button className={filters.type === "exam" ? "active" : ""} onClick={() => handleFilterChange("type", "exam")}>Экзамен</button>
            </div>

            <div className="filter_options">
                <button className={filters.sort === "newest" ? "active" : ""} onClick={() => handleFilterChange("sort", "newest")}>Сначала новые</button>
                <button className={filters.sort === "oldest" ? "active" : ""} onClick={() => handleFilterChange("sort", "oldest")}>Сначала старые</button>
            </div>

            <div className="filter_options">
                <button className={filters.status === "pending" ? "active" : ""} onClick={() => handleFilterChange("status", "pending")}>Ожидают проверки</button>
                <button className={filters.status === "checked" ? "active" : ""} onClick={() => handleFilterChange("status", "checked")}>Проверенные</button>
                <button className={filters.status === "others" ? "active" : ""} onClick={() => handleFilterChange("status", "others")}>Другие</button>
            </div>

            <div className="filter_options">
                <button onClick={resetFilter}>Сбросить</button>
            </div>
        </div>
    </>)
}