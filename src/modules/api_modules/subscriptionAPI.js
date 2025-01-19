import axios from "axios"
import { API_SUBSCRIPTION_GET_ALL_VALID, SERVER_API_URL } from "../../config"

export const getAllValidSubscriptionTypes = async (token) => {
    const response = await axios.get(`${SERVER_API_URL}${API_SUBSCRIPTION_GET_ALL_VALID}` , {
        headers:{"Authorization": token}
    })
    return response;
}