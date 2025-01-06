import axios from "axios"
import { API_CUSTOMER_COMPLETED_VARIANTS, API_CUSTOMER_EXAMS_BY_VARIANT, API_CUSTOMER_TASK_DATA, API_CUSTOMER_TASKS_BY_EXAM_DATA, API_CUSTOMER_TASKS_BY_TASK, API_TASK_EXPRESS, SERVER_API_URL } from "../../config"
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
//Начать экспресс проверку задачи
export const startExpressCheckForTask = async (customerTask, transcriptionService, aiService, aiModel, textDistanceMethod, task, sessionKey) => {
    const taskDTO = {
        id : task.id,
        taskContent : JSON.stringify(task.taskContent),
        taskType : task.taskType
    }
    const request = {
        id : customerTask.id,
        task : taskDTO,
        audioPath: customerTask.audioPath,
        transcriptionServiceName : transcriptionService,
        aiServiceName : aiService,
        aiModelName : aiModel,
        textDistanceMethod : textDistanceMethod
    }
    console.log(request)
    console.log(`trying to send customerTask => ${JSON.stringify(request)}`)
    const response = await axios.post(`${SERVER_API_URL}${API_TASK_EXPRESS}`, request,
        {headers: {Authorization: sessionKey}}
    )
    return response
}
