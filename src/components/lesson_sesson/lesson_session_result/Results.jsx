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
    // Тут будут подгружаться ответы пользователя на задания
    const [userTasks, setUserTasks] = useState([]) 
    useEffect(()=>{
        const loadTaskByVariantId = async () => {
            const taskResonse = await getTasksByVariantId(variantId)
            const customerTaskResponse = await getCustomerTaskByExamId(examId)
            console.log(customerTaskResponse.data[0].audioPath)

            setCustomerTasks(customerTaskResponse.data)
            setTasks(taskResonse.data)
        }
        loadTaskByVariantId()
    }, [])
    /**TODO сделать запрос получить все результаты по examId, и сами задания variantId */
    return (
        <>
            <Header/>
            <p>{`examId = ${examId},  variantId = ${variantId}`}</p>
            
            {customerTasks && 
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap"}}>
                {customerTasks.map((customerTask)=>(
                    <audio controls src={`${SERVER_API_URL}/${customerTask.audioPath}`}></audio>
                ))}
            </div>}
            {tasks && 
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap"}}>
                {tasks.map((task)=>(
                    <TasksContentWrapper task={task} />
                ))}
            </div>}
        </>
    )
}