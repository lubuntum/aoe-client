import "./css/account_result_grid.css"
import "./css/result_media.css"

import { useEffect, useState } from "react"

import { VariantsSelection } from "./sidebar/VariantsSelection"
import { TaskSelection } from "./topbar/TasksSelection"

import { TaskViewerWrapper } from "./content_viewer/TaskViewerWrapper"
import { ExamViewerWrapper } from "./content_viewer/ExamViewerWrapper"
import { ContentViewerEmpty } from "./content_viewer/ContentViewerEmpty"

import { TaskResultsViewerPanel } from "./result_viewer/TaskResultsViewerPanel"
import { ExamResultsViewerPanel } from "./result_viewer/ExamResultsViewerPanel"
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
        chosenVariant.variantTasks.sort((a,b) => a.taskType - b.taskType)
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
        setCurrentTask(task)
        setExamPicked(false)  
    }
    const showContentByExamClick = () =>{
        //account token, currentVariant.id
        setExamPicked(true)
        console.info("set true")
    } 
    
    return (<>
        <div className="accountResultGrid">
            <VariantsSelection 
                variants={variants} 
                showTasksClick = {showTasksClick}/>

            <TaskSelection  
                currentVariant = {currentVariant} 
                showContentByTaskClick = {showContentByTaskClick} 
                showContentByExamClick = {showContentByExamClick}/>

            {examPicked ? <ExamViewerWrapper variant={currentVariant} exams={undefined}/> 
            : currentTask ? <TaskViewerWrapper task={currentTask}/>
            : <ContentViewerEmpty/>}

            {examPicked ? <ExamResultsViewerPanel variant={currentVariant} examPicked={examPicked}/>
            : currentTask ? <TaskResultsViewerPanel variant={currentVariant} task={currentTask}/>
            : <ResultViewerEmpty/>}
        </div>
    </>)
}