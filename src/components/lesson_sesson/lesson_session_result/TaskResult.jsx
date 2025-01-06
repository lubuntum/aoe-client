import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getTaskByTaskId } from "../../../modules/api_modules/taskAPI"
import { getCustomerTaskByCustomerTaskId } from "../../../modules/api_modules/resultAPI"
import { HeaderMain } from "../../header_components/HeaderMain"
import { TasksContentWrapper } from "../task_session/TasksContentWrapper"
import { SERVER_API_URL } from "../../../config"
/** TODO сделать API к получению getTaskByTaskId и getCustomerTaskByCustomerTaskId 
 * Затем сделать API для получения CustomerTasks для панели результатов по заданию
 * Сделать транскрибацию react-speech-recognition во время записи ответа
*/

export const TaskResult = () => {
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
        {task && 
            <div> 
                <audio controls src={`${SERVER_API_URL}/${customerTask.audioPath}`}></audio>
                <TasksContentWrapper task={task} />
            </div>}

    </>)

}