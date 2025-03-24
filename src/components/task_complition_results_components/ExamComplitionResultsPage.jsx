import "./css/task_complition_results.css"
import "./css/task_complition_results_media.css"

import { ReactComponent as DownloadIcon } from "../../res/icons/download_24dp_gi.svg"
import { ReactComponent as LinkIcon } from "../../res/icons/link_24dp_gi.svg"

import { useAsyncError, useLocation, useNavigate } from "react-router-dom"
import { HeaderMain } from "../header_components/HeaderMain"
import { useEffect, useState } from "react"
import { getTasksByVariantId, getVariantById } from "../../modules/api_modules/variantAPI"
import { ComplitionResultsWrapper } from "./ComplitionResultsWrapper"
import { getCustomerTaskByExamId } from "../../modules/api_modules/resultAPI"
import { FooterMain } from "../footer_components/FooterMain"
import { SERVER_API_URL } from "../../config"
import { PageTitle } from "../reusible_components/PageTitle"
import { Button } from "../reusible_components/Button"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import routes from "../../routes"

export const ExamComplitionResultsPage = () => {
    const { isAuth } = useAuth()
    const navigate = useNavigate()
    const query = new URLSearchParams(useLocation().search)
    const examId = query.get('examId')
    const variantId = query.get('variantId')
    const [tasks, setTasks] = useState()
    const [customerTasks, setCustomerTasks] = useState()
    const [customerResults, setCustomerResults] = useState()
    const {checkAuth} = useAuth()

    useEffect(()=>{
        const loadTaskByVariantId = async () => {
            checkAuth()
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

    const shareTask = async () => {
        try {
            const url = window.location.href
            navigator.clipboard.writeText(url)
        } catch (err) {
            console.error("Failed copy", err)
        }
    }
    const navigateToCheckResults = () => {
        navigate(routes.ACCOUNT)
        setTimeout(()=>{window.scrollTo({top: 650, behavior:"instant"})}, 100)
    }
    /**TODO сделать запрос получить все результаты по examId, и сами задания variantId */
    return (<>
        <HeaderMain/>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="taskComplitionWrapper">
                    <PageTitle pageTitleText={`#Ответы# на экзамен`} className={""}/>
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
                                        </div>
                                    </div>
                                </>))}
                                <div className="examComplitionOptions">
                                    <div className="taskComplitionOptions">
                                        <Button key={"examComplitionButton1"}
                                                buttonPadding={"0 20px"}
                                                buttonType={"block"}
                                                buttonIcon={<DownloadIcon className="svgIcon"/>}
                                                buttonText={"Скачать"}
                                                buttonFunc={()=>{}}/>
                                        <Button key={"examComplitionButton2"}
                                                buttonPadding={"0 20px"}
                                                buttonIcon={<LinkIcon className="svgIcon"/>}
                                                buttonText={"Cсылка"}
                                                isCopyButton={true}
                                                buttonFunc={shareTask}/>
                                    </div>
                                    {isAuth && 
                                    <div className="examCabinetLink">
                                        <p>Вы можете увидеть свои сохраненные записи и отправить их на проверку из личного кабинета, выбрав нужный ВАРИАНТ и ЭКЗАМЕН</p>
                                        <Button key={"examComplitionButton3"}
                                                buttonPadding={"0 20px"}
                                                buttonText={"Личный кабинет"}
                                                buttonFunc={navigateToCheckResults}/>
                                    </div>}
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterMain/>
    </>)
}