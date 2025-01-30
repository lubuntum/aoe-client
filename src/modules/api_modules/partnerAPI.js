import axios from "axios"
import { API_PARTNER_GET_ALL, API_PARTNER_PARTNERSHIP_PROCEDURE, API_PARTNER_PAY_TO_PARTNER_AMOUNT, API_PARTNERSHIP_APPLY_PROMOCODE, SERVER_API_URL } from "../../config"

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
export const payToPartnerAmount = async (token, partnerId, amount) => {
    const param = new URLSearchParams()
    param.append("partnerId", partnerId)
    param.append("amount", amount)
    const response = await axios.post(`${SERVER_API_URL}${API_PARTNER_PAY_TO_PARTNER_AMOUNT}`, param,{
        headers:{"Authorization" : token}
    })
    return response
}

export const applyPromocodeForCustomer = async (token, promocode) => {
    const param = new URLSearchParams()
    param.append("promocode", promocode)
    const response = axios.post(`${SERVER_API_URL}${API_PARTNERSHIP_APPLY_PROMOCODE}`, param, {
        headers:{"Authorization": token}
    })
    return response
}