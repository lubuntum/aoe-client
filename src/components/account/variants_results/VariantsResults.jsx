import "./css/variants_result.css"
import { useState } from "react"
import { VariantsSelection } from "./VariantsSelection"
import { TaskSelection } from "./TasksSelection"
import { TaskContentViewer } from "./TaskContentViewer"
import { ExamContentViewer } from "./ExamContentViewer"

export const VariantsResults = () =>{
    const [currentVariant, setCurrentVariant] = useState()
    const [currentTask, setCurrentTask] = useState()
    const [examPicked, setExamPicked] = useState()
    /** TEST
     * Данные которые будут подсасываться через useEffect
     */
    const testResponse = {
        "data" : {
            "variants": [{"id":1, "theme":"someTheme1", 
                            "tasks": [{"id":1, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}, "task_type":1},
                                        {"id":2, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}, "task_type":2},
                                        {"id":3, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}, "task_type":3},
                                        {"id":4, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}, "task_type":4}]},
                        {"id":2, "theme":"someTheme2", 
                            "tasks": [{"id":5, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}, "task_type":1},
                                        {"id":6, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}, "task_type":2},
                                        {"id":7, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}, "task_type":3},
                                        {"id":8, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}, "task_type":4}]},
                        {"id":3, "theme":"someTheme3", 
                            "tasks": [{"id":9, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":10, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":11, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":12, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},
                        {"id":4, "theme":"someTheme4", 
                            "tasks": [{"id":13, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":14, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":15, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":16, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},
                                        
                        {"id":5, "theme":"someTheme5", 
                            "tasks": [{"id":17, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":18, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":19, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":20, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},
                                        
                        {"id":6, "theme":"someTheme6", 
                            "tasks": [{"id":21, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":22, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":23, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":24, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},
                        {"id":7, "theme":"someTheme7", 
                            "tasks": [{"id":25, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":26, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":27, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":28, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},
                        {"id":8, "theme":"someTheme8", 
                            "tasks": [{"id":29, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":30, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":31, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":32, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},
                        {"id":9, "theme":"someTheme9", 
                            "tasks": [{"id":33, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":34, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":35, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":36, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},
                        {"id":10, "theme":"someTheme10", 
                            "tasks": [{"id":37, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":38, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":39, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":40, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},
                        {"id":11, "theme":"someTheme11", 
                            "tasks": [{"id":41, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":42, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":43, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":44, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},
                        {"id":12, "theme":"someTheme12", 
                            "tasks": [{"id":45, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":46, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":47, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":48, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},
                        {"id":13, "theme":"someTheme13", 
                            "tasks": [{"id":49, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":50, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":51, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":52, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},]
        }
    }
    /**
     * Функция клика на вариант задания,
     * необходима для получения варианта и работы с ним по клику
     * @param {*} i Индекс текущего варианта
     */
    const showTasksClick = (i) =>{
        const chosenVariant = testResponse.data.variants[i]
        console.log(chosenVariant.theme)
        setCurrentVariant(chosenVariant)
    }
    /**
     * Функция необходимая для отображения
     * контента отдельной задачи по клику
     * на кнопку задания
     * @param {*} task Задание
     * 
     */
    const showContentByTaskClick = (task) => {
        console.log(task.id)//exam false hook
        console.info("set false")
        setExamPicked(false)
        setCurrentTask(task)
    }
    const showContentByExamClick = () =>{
        //account token, currentVariant.id
        setExamPicked(true)
        console.info("set true")
    } 
    //Сделать отдельным компонентом дофига логики
    return (<>
        <div className="resultTitle">Сохраненные ответы</div>
        <div className="resultContainer">
            <VariantsSelection 
                variants={testResponse.data.variants} 
                showTasksClick = {showTasksClick}/>

            <TaskSelection  
                currentVariant = {currentVariant} 
                showContentByTaskClick = {showContentByTaskClick} 
                showContentByExamClick = {showContentByExamClick}/>

            {examPicked ? <ExamContentViewer variant={currentVariant} exams={undefined}/> :  <TaskContentViewer task={currentTask}/>}
        </div>
    </>)
}