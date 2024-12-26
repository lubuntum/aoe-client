import axios from "axios"
import { API_ADMIN_VALIDATE, SERVER_API_URL } from "../../../config"

export const validateAdmin = async (token) => {
    const response = await axios.get(`${SERVER_API_URL}${API_ADMIN_VALIDATE}`, {
        headers:{
           "Authorization" : token
        }
    })
    return response
}