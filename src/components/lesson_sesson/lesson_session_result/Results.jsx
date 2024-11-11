import { useLocation } from "react-router-dom"
import Header from "../../header/Header"
import { useEffect, useState } from "react"
import { getTasksByVariantId } from "../../../modules/api/variant/VariantApi"
import { TasksContentWrapper } from "../task_session/TasksContentWrapper"
export const Results = () => {
    const query = new URLSearchParams(useLocation().search)
    const examId = query.get('examId')
    const variantId = query.get('variantId')
    const [tasks, setTasks] = useState()
    useEffect(()=>{
        const loadTaskByVariantId = async () => {
            const taskResonse = await getTasksByVariantId(variantId)
            console.log(taskResonse.data)
            setTasks(taskResonse.data)
        }
        loadTaskByVariantId()
    }, [])
    /**TODO сделать запрос получить все результаты по examId, и сами задания variantId */
    return (
        <>
            <Header/>
            <p>{`examId = ${examId},  variantId = ${variantId}`}</p>
            {tasks && 
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap"}}>
                {tasks.map((task)=>(
                    <TasksContentWrapper task={task} />
                ))}
            </div>}
        </>
    )
}