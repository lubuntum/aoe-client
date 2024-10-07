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
                        {"id":5, "theme":"someTheme5", 
                            "tasks": [{"id":7, 
                                        "task_content":{"task_guide":"Aboba guide1 theme", "task_text":"Aboba Text11"}, "task_type":1},
                                        {"id":8, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}, "task_type":2},
                                        {"id":9, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}, "task_type":3},
                                        {"id":10, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}, "task_type":4}]},
                        {"id":7, "theme":"someTheme7", 
                            "tasks": [{"id":15, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text111"}, "task_type":1},
                                        {"id":16, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}, "task_type":2},
                                        {"id":17, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}, "task_type":3},
                                        {"id":18, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}, "task_type":4}]},]
        }
    }
    const findTaskByTaskTypeInVariant = (taskType, variant) =>{
        return variant.tasks.find(t => t.task_type === taskType)
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
        if(currentTask !== undefined) setCurrentTask(findTaskByTaskTypeInVariant(currentTask.task_type, chosenVariant))
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
        <div className="resultTitle">Пройденные варианты</div>
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