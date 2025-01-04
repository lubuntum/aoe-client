import "./css/admin_prompt.css"
import "./css/admin_change_prompt.css"
import "./css/admin_task_prompt.css"
import "./css/admin_prompt_hint.css"

import { AdminPromptHint } from "./AdminPromptHint"
import { AdminChangePrompt } from "./AdminChangePrompt"
import { useEffect, useRef, useState } from "react"

import { AdminTaskPrompt } from "./AdminTaskPrompt"
import { getTasksTypes, updateTaskType } from "../../../modules/api/admin/taskTypesApi"

export const AdminPrompts = () => {
    const [currentTaskTypeId, setCurrentTaskTypeId] = useState(null)
    const [tasksTypes, setTasksTypes] = useState(null);
    const originalTasksTypesRef = useRef(null)
    const [status, setStatus] = useState("")
    const [statusColor, setStatusColor] = useState("")
    useEffect(()=>{
        loadTasksTypes()
    },[])
    const loadTasksTypes = async () => {
        const response = await getTasksTypes(localStorage.getItem("token"))

        originalTasksTypesRef.current = response.data
        setTasksTypes(response.data)
        if(!currentTaskTypeId) setCurrentTaskTypeId(response.data.find(t => t.type === 2).id)
    }

    const updatePromptForTaskType = (value, taskTypeId) => {
        setTasksTypes(prev => 
            prev.map(t => t.id === taskTypeId ? { ...t, prompt: value } : t)
        );
    }
    const resetCurrentTaskType = () => {
        const originalTaskType = originalTasksTypesRef.current.find(t=> t.id === currentTaskTypeId)
        console.log(originalTaskType.prompt)
        setTasksTypes(prev => prev.map(t => t.id === originalTaskType.id ? originalTaskType : t))
    }

    const updateCurrentTaskType = async () => {
        const response = await updateTaskType(localStorage.getItem("token"), tasksTypes.find(t => t.id === currentTaskTypeId))
        await loadTasksTypes()
        setStatus(`${response.status}!`)
        setStatusColor("good")
        setTimeout(() => {
            setStatus("")
            setStatusColor("")
        }, 3000)
    }
    console.log(currentTaskTypeId)
    return (<>
        {tasksTypes && <> 
            <div className="adminPrompHintContainer">
                <AdminPromptHint type={tasksTypes.find(t => t.id === currentTaskTypeId).type}/>
                <AdminTaskPrompt currentTaskTypeId = {currentTaskTypeId} tasksTypes = {tasksTypes} updatePromptForTaskType = {updatePromptForTaskType}/>
            </div>

            <AdminChangePrompt setCurrentTaskTypeId={setCurrentTaskTypeId}
                            tasksTypes={tasksTypes}
                            updateCurrentTaskType={updateCurrentTaskType}
                            resetCurrentTaskType={resetCurrentTaskType}
                            status={status}
                            statusColor={statusColor}/>
        </>}
        
    </>)
}