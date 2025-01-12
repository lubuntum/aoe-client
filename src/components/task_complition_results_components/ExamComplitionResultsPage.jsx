import "./css/task_complition_results.css"

import { ReactComponent as DownloadIcon } from "../../res/icons/download_24dp_gi.svg"
import { ReactComponent as LinkIcon } from "../../res/icons/link_24dp_gi.svg"

import { useAsyncError, useLocation } from "react-router-dom"
import { HeaderMain } from "../header_components/HeaderMain"
import { useEffect, useState } from "react"
import { getTasksByVariantId } from "../../modules/api_modules/variantAPI"
import { ComplitionResultsWrapper } from "./ComplitionResultsWrapper"
import { getCustomerTaskByExamId } from "../../modules/api_modules/resultAPI"
import { SERVER_API_URL } from "../../config"
import { PageTitle } from "../reusible_components/PageTitle"
import { Button } from "../reusible_components/Button"

export const ExamComplitionResultsPage = () => {
    const query = new URLSearchParams(useLocation().search)
    const examId = query.get('examId')
    const variantId = query.get('variantId')
    const [tasks, setTasks] = useState()
    const [customerTasks, setCustomerTasks] = useState()
    const [customerResults, setCustomerResults] = useState()

    useEffect(()=>{
        const loadTaskByVariantId = async () => {
            const tasksResonse = await getTasksByVariantId(variantId)
            const customerTasksResponse = await getCustomerTaskByExamId(examId)
            setCustomerResults(mergeData(tasksResonse.data, customerTasksResponse.data))
            setCustomerTasks(customerTasksResponse.data)
            setTasks(tasksResonse.data)
        }
        loadTaskByVariantId()
    }, [])

    const mergeData = (tasks,customerTasks) => {
        const result = tasks.map((task) => {
            const customerTask = customerTasks.find(cT => cT.taskId === task.id)
            return {task, customerTask}
        }) 
        result.sort((a,b) => a.task.taskType - b.task.taskType)
        return result;
    }
    
    /**TODO сделать запрос получить все результаты по examId, и сами задания variantId */
    return (<>
        <HeaderMain/>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="taskComplitionWrapper">
                    <PageTitle pageTitleText={`Ответы на {наименование варианта} - Экзамен`} className={""}/>
                    <div className="taskComplitionContainer">
                        <div className="taskComplitionInnerContainer">
                            {tasks && <>
                                {customerResults.map((result, index)=>(<>
                                    <div className="taskComplitionItemContainer">
                                        <p className="taskIterator">{`Задание ${index + 1}`}</p>
                                        <ComplitionResultsWrapper task={result.task}/>
                                        <div className="taskComplitionAudio taskComplitionExamAudio">
                                            <p>Ваша запись:</p>
                                            <audio controls src={`${SERVER_API_URL}/${result.customerTask.audioPath}`}></audio>
                                            <div className="taskComplitionOptions">
                                                <Button buttonType={""}
                                                        buttonPadding={"0 20px"}
                                                        buttonWidth={""}
                                                        buttonHeight={""}
                                                        buttonIcon={<DownloadIcon className="svgIcon"/>}
                                                        buttonText={"Скачать"}
                                                        buttonFunc={()=>{}}/>
                                                <Button buttonType={""}
                                                        buttonPadding={"0 20px"}
                                                        buttonWidth={""}
                                                        buttonHeight={""}
                                                        buttonIcon={<LinkIcon className="svgIcon"/>}
                                                        buttonText={"Cсылка"}
                                                        buttonFunc={()=>{}}/>
                                            </div>
                                        </div>
                                    </div>
                                </>))}
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}