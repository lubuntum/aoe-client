import { useEffect, useState } from "react"

import { ResultsSidebar } from "./sidebar_components/ResultsSidebar"
import { ResultsSidebarLoading } from "./sidebar_components/ResultsSidebarLoading"

import { ResultsTopbar } from "./topbar_components/ResultsTopbar"
import { ResultsTopbarEmpty } from "./topbar_components/ResultsTopbarEmpty"

import { ResultsTaskViewer } from "./viewer_components/ResultsTaskViewer"
import { ResultsExamViewer } from "./viewer_components/ResultsExamViewer"
import { ResultsEmptyViewer } from "./viewer_components/ResultsEmptyViewer"

import { ResultsTaskRecords } from "./records_components/ResultsTaskRecords"
import { ResultsExamRecords } from "./records_components/ResultsExamRecords"
import { ResultsEmptyRecords } from "./records_components/ResultsEmptyRecords"

import { getCustomerCompletedVariants } from "../../../modules/api_modules/accountAPI"

export const ResultsGrid = ({className}) =>{
    const [currentVariant, setCurrentVariant] = useState()
    const [currentTask, setCurrentTask] = useState()
    const [examPicked, setExamPicked] = useState(false)
    const [variants, setVariants] = useState()
    useEffect(()=>{
        const variantsRequest = async () => {
            const response = await getCustomerCompletedVariants(localStorage.getItem("token"))
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
        setCurrentTask(task)
        setExamPicked(false)  
    }
    const showContentByExamClick = () =>{
        setExamPicked(true)
    } 
    
    return (<>
        <div className={`resultGrid ${className}`}>
            {variants !== undefined ? <ResultsSidebar variants={variants} 
                                                      showTasksClick={showTasksClick} 
                                                      className={"resultGridItem1"}/> : 
                                      <ResultsSidebarLoading className={"resultGridItem1"}/>}

            {currentVariant !== undefined ? <ResultsTopbar currentVariant = {currentVariant} 
                                                           showContentByTaskClick = {showContentByTaskClick} 
                                                           showContentByExamClick = {showContentByExamClick}
                                                           className={"resultGridItem2"}/> : 
                                            <ResultsTopbarEmpty className={"resultGridItem2"}/>}


            {examPicked ? <ResultsExamViewer variant={currentVariant} exams={undefined} className={"resultGridItem3"}/> : 
            currentTask ? <ResultsTaskViewer task={currentTask} className={"resultGridItem3"}/> : 
                          <ResultsEmptyViewer className={"resultGridItem3"}/>}

            {examPicked ? <ResultsExamRecords variant={currentVariant} examPicked={examPicked} className={"resultGridItem4"}/> : 
            currentTask ? <ResultsTaskRecords variant={currentVariant} task={currentTask} className={"resultGridItem4"}/> : 
                          <ResultsEmptyRecords className={"resultGridItem4"}/>}
        </div>
    </>)
}