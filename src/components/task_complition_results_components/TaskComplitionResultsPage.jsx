import "./css/task_complition_results.css"

import { ReactComponent as DownloadIcon } from "../../res/icons/download_24dp_gi.svg"
import { ReactComponent as LinkIcon } from "../../res/icons/link_24dp_gi.svg"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getTaskByTaskId } from "../../modules/api_modules/taskAPI"
import { getCustomerTaskByCustomerTaskId } from "../../modules/api_modules/resultAPI"
import { HeaderMain } from "../header_components/HeaderMain"
import { ComplitionResultsWrapper } from "./ComplitionResultsWrapper"
import { SERVER_API_URL } from "../../config"
import { PageTitle } from "../reusible_components/PageTitle"
import { Button } from "../reusible_components/Button"
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

    useEffect(() => {
        const loadCustomerTaskByTask = async () => {
            const taskResponse = await getTaskByTaskId(taskId)
            const customerTaskResponse = await getCustomerTaskByCustomerTaskId(customerTaskId)
            setTask(taskResponse.data)
            setCustomerTask(customerTaskResponse.data)
        }
        loadCustomerTaskByTask()
    },[])

    return (<>
        <HeaderMain/>
        <div className='sectionWrapper'>
            <div className='contentWrapper'>
                <div className='taskComplitionWrapper'>
                    <PageTitle pageTitleText={"Ответ на {наименование варианта} - {номер} задание"} className={""}/>
                    <div className="taskComplitionContainer">
                        <div className="taskComplitionInnerContainer">
                            {task && <>
                                <ComplitionResultsWrapper task={task} />
                                <div className="taskComplitionAudio">
                                    <p>Ваша запись:</p>
                                    <audio controls src={`${SERVER_API_URL}/${customerTask.audioPath}`}></audio>
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
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)

}