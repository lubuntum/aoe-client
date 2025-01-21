import axios from "axios"
import { API_SUBSCRIPTION_GET_ALL_VALID, API_SUBSCRIPTION_PURCHASE, SERVER_API_URL } from "../../config"

export const getAllValidSubscriptionTypes = async (token) => {
    const response = await axios.get(`${SERVER_API_URL}${API_SUBSCRIPTION_GET_ALL_VALID}` , {
        headers:{"Authorization": token}
    })
    return response;
}

export const purchaseSubscription = async (token, subscriptionTypeId) => {
    const param = new URLSearchParams()
    param.append("subscriptionTypeId", subscriptionTypeId)
    const response = await axios.post(`${SERVER_API_URL}${API_SUBSCRIPTION_PURCHASE}`, param, {
        headers : {"Authorization" : token}
    })
    return response
}