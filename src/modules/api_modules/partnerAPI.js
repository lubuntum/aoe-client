import axios from "axios"
import { API_PARTNER_GET_ALL, API_PARTNER_PARTNERSHIP_PROCEDURE, SERVER_API_URL } from "../../config"

export const getAllPartners = async (token) => {
    const response = await axios.get(`${SERVER_API_URL}${API_PARTNER_GET_ALL}`, {
        headers:{"Authorization":token}
    })
    return response
}
export const partnershipProcedure = async (token, partner) => {
    const response = await axios.post(`${SERVER_API_URL}${API_PARTNER_PARTNERSHIP_PROCEDURE}`, partner,{
        headers:{"Authorization" : token}
    })
    return response
}