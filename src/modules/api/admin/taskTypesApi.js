import axios from "axios"
import { API_ADMIN_TASKS_TYPES, API_ADMIN_UPDATE_TASK_TYPE, SERVER_API_URL } from "../../../config"

export const getTasksTypes = async (token) => {
    const response = await axios.get(`${SERVER_API_URL}${API_ADMIN_TASKS_TYPES}`, {
        headers : {"Authorization": token}
    })
    return response
}
export const updateTaskType = async (token, taskType) => {
    const param = new URLSearchParams()
    param.append("taskTypeId", taskType.id)
    param.append("prompt", taskType.prompt)
    const response = await axios.post(`${SERVER_API_URL}${API_ADMIN_UPDATE_TASK_TYPE}`, param,
        {headers:{"Authorization" : token}}
    )
    return response;
}