import "./css/admin_prompt.css"
import "./css/admin_change_prompt.css"
import "./css/admin_task_prompt.css"
import "./css/admin_prompt_hint.css"

import { AdminPromptHint } from "./AdminPromptHint"
import { AdminChangePrompt } from "./AdminChangePrompt"
import { useEffect, useState } from "react"

import { AdminTaskPrompt } from "./AdminTaskPrompt"
import { getTasksTypes, updateTaskType } from "../../../modules/api/admin/taskTypesApi"

export const AdminPrompts = () => {
    const [currentPromptComponent, setCurrentPromptComponent] = useState(2)

    const [currentTaskTypeId, setCurrentTaskTypeId] = useState(null)
    const [tasksTypes, setTasksTypes] = useState([]);

    const [status, setStatus] = useState("")
    const [statusColor, setStatusColor] = useState("")
    useEffect(()=>{
        loadTasksTypes()
    },[])
    const loadTasksTypes = async () => {
        const response = await getTasksTypes(localStorage.getItem("token"))
        setTasksTypes(response.data)
        setCurrentTaskTypeId(response.data.find(t => t.type === 2).id)
    }

    const updatePromptForTaskType = (value, taskTypeId) => {
        console.log(value)
        setTasksTypes(prev => {
            const updatedTasks = prev.map(t => t.id === taskTypeId ? { ...t, prompt: value } : t);
            console.log('Updated tasks:', updatedTasks);
            return updatedTasks;
        });
    }

    const updateCurrentTaskType = async () => {
        //console.log(`Промпт ${currentPromptComponent} сохранен. ${prompts[currentPromptComponent]}`)
        const response = await updateTaskType(localStorage.getItem("token"), tasksTypes.find(t => t.id === currentTaskTypeId))
        setStatus(`${response.status}!`)
        setStatusColor("good")
        setTimeout(() => {
            setStatus("")
            setStatusColor("")
        }, 3000)
    }
    console.log(currentTaskTypeId)
    return (<>
        {currentTaskTypeId !== null && <> 
            <div className="adminPrompHintContainer">
                <AdminPromptHint type={tasksTypes.find(t => t.id === currentTaskTypeId).type}/>
                <AdminTaskPrompt currentTaskTypeId = {currentTaskTypeId} tasksTypes = {tasksTypes} updatePromptForTaskType = {updatePromptForTaskType}/>
            </div>

            <AdminChangePrompt setCurrentTaskTypeId={setCurrentTaskTypeId} 
                            tasksTypes={tasksTypes}
                            updateCurrentTaskType={updateCurrentTaskType}
                            status={status}
                            statusColor={statusColor}/>
        </>}
        
    </>)
}