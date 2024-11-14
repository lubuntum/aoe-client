import { useEffect, useState } from "react"

import "./css/account_result_grid.css"

import "./css/result_selection_btn.css"
import "./css/result_variants_selection.css"
import "./css/result_tasks_selection.css"

import "./css/result_audio_viewer.css"
import "./css/result_media.css"

import { VariantsSelection } from "./sidebar/VariantsSelection"
import { TaskSelection } from "./topbar/TasksSelection"

import { TaskContentViewer } from "./content_viewer/TaskContentViewer"
import { ExamContentViewer } from "./content_viewer/ExamContentViewer"

import { ResultViewerPanel } from "./result_viewer/ResultViewerPanel"
import { ResultViewerEmpty } from "./result_viewer/ResultViewerEmpty"

import { getCustomerCompletedVariants } from "../../../modules/api/account/AccountApi"

export const AccountResultsGrid = () =>{
    const [currentVariant, setCurrentVariant] = useState()
    const [currentTask, setCurrentTask] = useState()
    const [examPicked, setExamPicked] = useState(false)
    const [variants, setVariants] = useState()
    useEffect(()=>{
        const variantsRequest = async () => {
            const response = await getCustomerCompletedVariants(localStorage.getItem("token"))
            console.log(response)
            setVariants(response.data)
        }
        variantsRequest()
    },[])

    const findTaskByTaskTypeInVariant = (taskType, variant) =>{
        return variant.variantTasks.find(t => t.taskType === taskType)
    }
    /**
     * Функция клика на вариант задания,
     * необходима для получения варианта и работы с ним по клику
     * @param {*} i Индекс текущего варианта
     */
    const showTasksClick = (i) =>{
        //const chosenVariant = testResponse.data.variants[i]
        const chosenVariant = variants[i]
        setCurrentVariant(chosenVariant)
        if(currentTask !== undefined) setCurrentTask(findTaskByTaskTypeInVariant(currentTask.taskType, chosenVariant))
    }
    /**
     * Функция необходимая для отображения
     * контента отдельной задачи по клику
     * на кнопку задания
     * @param {*} task Задание
     * 
     */
    const showContentByTaskClick = (task) => {
        console.log(task)//exam false hook
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
        <div className="accountResultGrid">
            <VariantsSelection 
                variants={variants} 
                showTasksClick = {showTasksClick}/>

            <TaskSelection  
                currentVariant = {currentVariant} 
                showContentByTaskClick = {showContentByTaskClick} 
                showContentByExamClick = {showContentByExamClick}/>

            {examPicked ? <ExamContentViewer variant={currentVariant} exams={undefined}/> : <TaskContentViewer task={currentTask}/>}

            {(currentTask !== undefined || examPicked) ? <ResultViewerPanel variant={currentVariant} examPicked={examPicked}/> : <ResultViewerEmpty/>}
            
        </div>
    </>)
}