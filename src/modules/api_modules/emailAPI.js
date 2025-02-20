import axios from "axios"
import { API_EMAIL_CONFIRMATION, SERVER_API_URL } from "../../config"

export const confirmCustomerEmailRequest = async (token) => {
    const response = await axios.get(`${SERVER_API_URL}${API_EMAIL_CONFIRMATION}`,{
        headers:{Authorization:token}
    })
    return response
}