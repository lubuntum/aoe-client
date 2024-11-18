import axios from "axios"
import { API_CUSTOMER_COMPLETED_VARIANTS, API_CUSTOMER_EXAMS_BY_VARIANT, API_CUSTOMER_TASK_DATA, SERVER_API_URL } from "../../../config"

export const getCustomerTaskByExamId = async (examId) => {
    const response = await axios.get(`${SERVER_API_URL}${API_CUSTOMER_TASK_DATA}?examId=${examId}`)
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