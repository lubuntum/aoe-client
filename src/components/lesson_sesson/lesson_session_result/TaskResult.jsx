import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getTaskByTaskId } from "../../../modules/api/variant/TaskApi"
import { getCustomerTaskByCustomerTaskId } from "../../../modules/api/result/ResultAPI"
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
        }
    },[])

    return (<>
    
    </>)

}