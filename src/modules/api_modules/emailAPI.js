import axios from "axios"
import { API_EMAIL_CONFIRMATION, API_EMAIL_RESET_PASSWORD, SERVER_API_URL } from "../../config"

export const confirmCustomerEmailRequest = async (token) => {
    const response = await axios.get(`${SERVER_API_URL}${API_EMAIL_CONFIRMATION}`,{
        headers:{Authorization:token}
    })
    return response
}
export const resetPasswordEmailRequest = async (email, password) => {
    const response = await axios.post(`${SERVER_API_URL}${API_EMAIL_RESET_PASSWORD}`, {
        email: email,
        password: password
    })
    return response
}