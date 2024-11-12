import axios from "axios"
import { API_CUSTOMER_TASK_DATA, SERVER_API_URL } from "../../../config"

export const getCustomerTaskByExamId = async (examId) => {
    const response = await axios.get(`${SERVER_API_URL}${API_CUSTOMER_TASK_DATA}?examId=${examId}`)
    return response
}