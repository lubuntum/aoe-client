import axios from "axios"
import { API_PAYMENT_CREATE, API_PAYMENT_STATUS, SERVER_API_URL } from "../../config"

export const createPayment = async (token, amount) => {
    const request = {currency: "RUB", amount: amount}
    const response = await axios.post(`${SERVER_API_URL}${API_PAYMENT_CREATE}`, request, {
        headers:{Authorization: token}
    })
    return response
}
export const paymentStatus = async(token) => {
    const response = await axios.get(`${SERVER_API_URL}${API_PAYMENT_STATUS}`,{
        headers:{Authorization:token}
    })
    return response
}