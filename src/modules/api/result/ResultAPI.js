import axios from "axios"
import { API_CUSTOMER_COMPLETED_VARIANTS, API_CUSTOMER_EXAMS_BY_VARIANT, API_CUSTOMER_TASK_DATA, API_CUSTOMER_TASKS_BY_EXAM_DATA, API_CUSTOMER_TASKS_BY_TASK, SERVER_API_URL } from "../../../config"
//Запрос для результата по экзамену для shareLink
export const getCustomerTaskByExamId = async (examId) => {
    const response = await axios.get(`${SERVER_API_URL}${API_CUSTOMER_TASKS_BY_EXAM_DATA}?examId=${examId}`)
    return response
}

export const getCustomerExamsByVariant = async (token, variant) => {
    const response = await axios.get(`${SERVER_API_URL}${API_CUSTOMER_EXAMS_BY_VARIANT}?variantId=${variant.id}`, {
        headers : {
            "Authorization":token
        }
    })
    return response
}
export const getCustomerTasksByTask = async (token, task) => {
    const response = await axios.get(`${SERVER_API_URL}${API_CUSTOMER_TASKS_BY_TASK}?taskId=${task.id}`, {
        headers:{
            "Authorization":token
        }
    })
    response.data?.forEach(customerTask => {
        customerTask.taskResults?.forEach(taskResult => {
            taskResult.result = JSON.parse(taskResult?.result)
        })
    })
    return response
}
//Запрос результата по заданию для shareLink
export const getCustomerTaskByCustomerTaskId = async (customerTaskId) => {
    const response = await axios.get(`${SERVER_API_URL}${API_CUSTOMER_TASK_DATA}?customerTaskId=${customerTaskId}`)
    return response
} 