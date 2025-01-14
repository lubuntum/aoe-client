import axios from "axios"
import { API_ADMIN_ADD_BALANCE_TO_CUSTOMER, API_ADMIN_GET_CUSTOMER_ID_BY_EMAIL, SERVER_API_URL } from "../../config"

export const addBalanceToCustomer = async (customerId, amount, sessionKey) => {
    const param = new URLSearchParams()
    param.append("customerId", customerId)
    param.append("amount", amount)
    const response = await axios.post(`${SERVER_API_URL}${API_ADMIN_ADD_BALANCE_TO_CUSTOMER}`, param, 
        {
            headers: {"Authorization" : sessionKey}
        }
    )
    return response
}
export const getCustomerIdByEmail = async (email, sessionKey ) => {
    const response = await axios.get(`${SERVER_API_URL}${API_ADMIN_GET_CUSTOMER_ID_BY_EMAIL}`, 
        {
            headers : {"Authorization": sessionKey},
            params : {email : email}
    })
    return response
}