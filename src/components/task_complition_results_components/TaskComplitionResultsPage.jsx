import "./css/task_complition_results.css"
import "./css/task_complition_results_media.css"

import { ReactComponent as DownloadIcon } from "../../res/icons/download_24dp_gi.svg"
import { ReactComponent as LinkIcon } from "../../res/icons/link_24dp_gi.svg"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getTaskByTaskId } from "../../modules/api_modules/taskAPI"
import { getCustomerTaskByCustomerTaskId } from "../../modules/api_modules/resultAPI"
import { HeaderMain } from "../header_components/HeaderMain"
import { ComplitionResultsWrapper } from "./ComplitionResultsWrapper"
import { FooterMain } from "../footer_components/FooterMain"
import { SERVER_API_URL } from "../../config"
import { PageTitle } from "../reusible_components/PageTitle"
import { Button } from "../reusible_components/Button"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
/** TODO сделать API к получению getTaskByTaskId и getCustomerTaskByCustomerTaskId 
 * Затем сделать API для получения CustomerTasks для панели результатов по заданию
 * Сделать транскрибацию react-speech-recognition во время записи ответа
*/

export const TaskComplitionResultsPage = () => {
    const query = new URLSearchParams(useLocation().search)
    const taskId = query.get('taskId')
    const customerTaskId = query.get('customerTaskId')
    const [task, setTask] = useState()
    const [customerTask, setCustomerTask] = useState()

    const [updateHeader, setUpdateHeader] = useState(false)

    const{checkAuth} = useAuth()

    useEffect(() => {
        const loadCustomerTaskByTask = async () => {
            checkAuth()
            const taskResponse = await getTaskByTaskId(taskId)
            const customerTaskResponse = await getCustomerTaskByCustomerTaskId(customerTaskId)
            setTask(taskResponse.data)
            setCustomerTask(customerTaskResponse.data)
        }
        loadCustomerTaskByTask()
    },[])

    const shareTask = async () => {
        try {
            const url = window.location.href
            navigator.clipboard.writeText(url)
        } catch (err) {
            console.error("Failed copy", err)
        }
    }

    return (<>
        <HeaderMain updateData={updateHeader} setUpdateData={setUpdateHeader}/>
        <div className='sectionWrapper'>
            <div className='contentWrapper'>
                <div className='taskComplitionWrapper'>
                    <PageTitle pageTitleText={`#Ответ# на ${task ? task.taskType : "..."} задание`} className={""}/>
                    <div className="taskComplitionContainer">
                        <div className="taskComplitionInnerContainer">
                            {task && <>
                                <ComplitionResultsWrapper task={task} />
                                <div className="taskComplitionAudio">
                                    <p>Ваша запись:</p>
                                    <audio controls src={`${SERVER_API_URL}/${customerTask.audioPath}`}></audio>
                                    <div className="taskComplitionOptions">
                                        <Button key={0}
                                                buttonPadding={"0 20px"}
                                                buttonType={"block"}
                                                buttonIcon={<DownloadIcon className="svgIcon"/>}
                                                buttonText={"Скачать"}
                                                buttonFunc={()=>{}}/>
                                        <Button key={1}
                                                buttonPadding={"0 20px"}
                                                buttonIcon={<LinkIcon className="svgIcon"/>}
                                                buttonText={"Cсылка"}
                                                buttonFunc={shareTask}
                                                isCopyButton={true}/>
                                    </div>
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