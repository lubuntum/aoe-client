import axios from "axios"
import { API_TASK_DATA, SERVER_API_URL } from "../../config"

export const getTaskByTaskId = async (taskId) => {
    const url = API_TASK_DATA.replace("%d", taskId)
    const response = await axios.get(`${SERVER_API_URL}${url}`)
    response.data.taskContent = JSON.parse(response.data.taskContent)
    response.data.taskType = response.data.taskType.type
    return response
}