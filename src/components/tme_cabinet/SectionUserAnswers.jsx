import { useMemo, useState } from "react"
import { MultipleSelector } from "../tme_reusable/MultipleSelector"
import { Filter } from "./Filter"
import { STATUS_TYPES, VariantAnswer } from "./VariantAnswer"
/**
 * 
 * TODO
 *  0. В личном кабинете отобразить данные пользователя (подгрузка и теперь их можно добавлять )
    1. Определить какие поля испольщуются на сервере и в новом компоненте для ответов
    2. Поместить тестовые обьекты в ansers проверить фильтрацию и тд что бы все отобрадалось
    3. Добавить загрузук по сети
    4. Сделать кнопку скопировать ссылку на вариант + скачать аудио файлы ответов
*/
export const SectionUserAnswers = () => {
    const [answers, setAnswers] = useState([]) // Массив ответов
    
    const [filters, setFilters] = useState({
        type: null,
        sort: "newest",
        status: null,
    })

    const filteredAnswers = useMemo(() => {
        let result = [...answers]

        // Фильтрация по типу ответа (Задание или Экзамен)
        if (filters.type) {
            result = result.filter(answer => answer.type === filters.type)
        }

        // Фильтрация по статусу ответа (Ожидает проверки или Проверено или Другие)
        if (filters.status) {
            result = result.filter(answer => answer.status === filters.status)
        }

        // Фильтрация по дате ответа (Новые или Старые) (Всегда активна)
        result.sort((a, b) => {
            if (filters.sort === "newest") {
                return new Date(b) - new Date(a)
            } else {
                return new Date(a) - new Date(b)
            }
        })

        return result
    }, [answers, filters])

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
    }

    return (<>
        <section className="cabinet_section">
            <h3>Пройденные задания</h3>

            <MultipleSelector items={["ОГЭ", "ЕГЭ"]} defaultActiveIndex={1}/>

            <Filter onFilterChange={handleFilterChange}/>

            <div className="cabinet_answer_grid">
                <VariantAnswer status={STATUS_TYPES.IDLE} tooltipText={{[STATUS_TYPES.IDLE]: "Простой"}}/>
                <VariantAnswer status={STATUS_TYPES.CHECKING} tooltipText={{[STATUS_TYPES.CHECKING]: "Идет проверка"}}/>
                <VariantAnswer status={STATUS_TYPES.DONE} tooltipText={{[STATUS_TYPES.DONE]: "Готов"}}/>
                <VariantAnswer/>
                <VariantAnswer status={STATUS_TYPES.WARNING} tooltipText={{[STATUS_TYPES.WARNING]: "Предупрждение"}}/>
                <VariantAnswer status={STATUS_TYPES.ERROR} tooltipText={{[STATUS_TYPES.ERROR]: "Ошибка"}}/>
                <VariantAnswer/>
                <VariantAnswer/>
            </div>
        </section>
    </>)
}