import axios from "axios";
import { SERVER_API_URL,  API_CUSTOMER_DATA, API_HEADER_DATA, API_CUSTOMER_COMPLETED_VARIANTS, API_CUSTOMER_EXAMS_BY_VARIANT} from "../../../config";

export const getCustomerData = async (token) => {
    const response =  await axios.get(`${SERVER_API_URL}${API_CUSTOMER_DATA}`,  {
        headers: {
            "Authorization": token
        }
    });
    return response
}

export const getHeaderData = async (token) => {
    const response = await axios.get(`${SERVER_API_URL}${API_HEADER_DATA}`, {
        headers:{
            "Authorization": token
        }
    });
    return response;
}

export const getCustomerCompletedVariants = async (token) => {
    const response = await axios.get(`${SERVER_API_URL}${API_CUSTOMER_COMPLETED_VARIANTS}`,{
        headers:{
            "Authorization": token
        }
    });
    response.data.map(v => {
        v.variantTasks.map(task => {
            task.taskContent = JSON.parse(task.taskContent)
            task.taskType = task.taskType.type
        })
    })
    return response;
}

