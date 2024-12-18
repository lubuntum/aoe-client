import "./css/admin_change_prompt.css"
import "./css/admin_task_prompt.css"

import { AdminSecondTaskPrompt } from "./AdminSecondTaskPrompt"
import { AdminThirdTaskPrompt } from "./AdminThirdTaskPrompt"
import { AdminFourthTaskPrompt } from "./AdminFourthTaskPrompt"
import { AdminChangePrompt } from "./AdminChangePrompt"
import { useState } from "react"

export const AdminPrompts = () => {
    const [currentPromptComponent, setCurrentPromptComponent] = useState(2)
    const [prompts, setPrompts] = useState({1:"", 2:"", 3:""})

    const [status, setStatus] = useState("")
    const [statusColor, setStatusColor] = useState("")

    const AdminPromptContentComponents = {
        2:{component: AdminSecondTaskPrompt},
        3:{component: AdminThirdTaskPrompt},
        4:{component: AdminFourthTaskPrompt},
    }

    const setPrompt = (value) => {
        setPrompts({ ...prompts, [currentPromptComponent]: value});
    }

    const savePromptData = async () => {
        console.log(`Промпт ${currentPromptComponent} сохранен. ${prompts[currentPromptComponent]}`)
        setStatus(`Промпт ${currentPromptComponent} сохранен!`)
        setStatusColor("good")
        setTimeout(() => {
            setStatus("")
            setStatusColor("")
        }, 3000)
    }

    const CurrentPromptComponent = AdminPromptContentComponents[currentPromptComponent]

    return (<>
        {currentPromptComponent === 2 && <CurrentPromptComponent.component prompt = {prompts[currentPromptComponent]} setPrompt = {setPrompt}/>}
        {currentPromptComponent === 3 && <CurrentPromptComponent.component prompt = {prompts[currentPromptComponent]} setPrompt = {setPrompt}/>}
        {currentPromptComponent === 4 && <CurrentPromptComponent.component prompt = {prompts[currentPromptComponent]} setPrompt = {setPrompt}/>}
        <AdminChangePrompt setCurrentPromptComponent={setCurrentPromptComponent} 
                           savePromptData={savePromptData}
                           status={status}
                           statusColor={statusColor}/>
    </>)
}