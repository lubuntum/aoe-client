import { useEffect, useState } from "react"

import { ResultsSidebar } from "./sidebar_components/ResultsSidebar"
import { ResultsSidebarLoading } from "./sidebar_components/ResultsSidebarLoading"

import { ResultsTopbar } from "./topbar_components/ResultsTopbar"

import { ResultsTaskViewer } from "./viewer_components/ResultsTaskViewer"
import { ResultsExamViewer } from "./viewer_components/ResultsExamViewer"

import { ResultsTaskRecords } from "./records_components/ResultsTaskRecords"
import { ResultsExamRecords } from "./records_components/ResultsExamRecords"

import { EmptyContainer } from "../../reusible_components/EmptyContainer"

import { getCustomerCompletedVariants } from "../../../modules/api_modules/accountAPI"

export const ResultsGrid = ({className, setContentPopup, setShowPopup}) =>{
    const [currentVariant, setCurrentVariant] = useState()
    const [currentTask, setCurrentTask] = useState()
    const [examPicked, setExamPicked] = useState(false)
    const [variants, setVariants] = useState()
    useEffect(()=>{
        const variantsRequest = async () => {
            try{
                const response = await getCustomerCompletedVariants(localStorage.getItem("token"))
                setVariants(response.data)
            } catch (e) {
                setVariants(null)
            }
            
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
            {variants ? <ResultsSidebar variants={variants} 
                                                      showTasksClick={showTasksClick} 
                                                      className={"resultGridItem1"}/> : 
                                      <ResultsSidebarLoading className={"resultGridItem1"}/>}

            {currentVariant ? <ResultsTopbar currentVariant = {currentVariant} 
                                                           showContentByTaskClick = {showContentByTaskClick} 
                                                           showContentByExamClick = {showContentByExamClick}
                                                           className={"resultGridItem2"}/> : 
                                            <EmptyContainer emptyText={"Вариант не выбран"} className={"resultGridItem2"}/>}


            {examPicked ? <ResultsExamViewer variant={currentVariant} exams={undefined} className={"resultGridItem3"}/> : 
            currentTask ? <ResultsTaskViewer task={currentTask} className={"resultGridItem3"}/> : 
                          <EmptyContainer emptyText={"Задание не выбрано"} className={"resultGridItem3"}/>}

            {examPicked ? <ResultsExamRecords variant={currentVariant} examPicked={examPicked} className={"resultGridItem4"} setContentPopup={setContentPopup} setShowPopup={setShowPopup}/> : 
            currentTask ? <ResultsTaskRecords variant={currentVariant} task={currentTask} className={"resultGridItem4"} setContentPopup={setContentPopup} setShowPopup={setShowPopup}/> : 
                          <EmptyContainer emptyText={"Задание не выбрано"} className={"resultGridItem4 resultEmptyRecords"}/>}
        </div>
    </>)
}