import { useAsyncError, useLocation } from "react-router-dom"
import Header from "../../header/Header"
import { useEffect, useState } from "react"
import { getTasksByVariantId } from "../../../modules/api/variant/VariantApi"
import { TasksContentWrapper } from "../task_session/TasksContentWrapper"
import { getCustomerTaskByExamId } from "../../../modules/api/result/ResultAPI"
import { SERVER_API_URL } from "../../../config"
export const Results = () => {
    const query = new URLSearchParams(useLocation().search)
    const examId = query.get('examId')
    const variantId = query.get('variantId')
    const [tasks, setTasks] = useState()
    const [customerTasks, setCustomerTasks] = useState()
    const [customerResults, setCustomerResults] = useState()
    useEffect(()=>{
        const loadTaskByVariantId = async () => {
            const taskResonse = await getTasksByVariantId(variantId)
            const customerTaskResponse = await getCustomerTaskByExamId(examId)
            setCustomerResults(mergeData(taskResonse.data, customerTaskResponse.data))
            setCustomerTasks(customerTaskResponse.data)
            setTasks(taskResonse.data)
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
    return (
        <>
            <Header/>
            {tasks && 
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap"}}>
                {customerResults.map((result)=>(<>
                        <audio controls src={`${SERVER_API_URL}/${result.customerTask.audioPath}`}></audio>
                        <TasksContentWrapper task={result.task} />
                    </>
                ))}
            </div>}
        </>
    )
}