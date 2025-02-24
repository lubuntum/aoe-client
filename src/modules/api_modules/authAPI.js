import axios from "axios"

import { API_LOGIN, API_REGISTRATION, API_RESET_PASSWORD, API_RESET_PASSWORD_AUTH, API_VALIDATE_CREDENTIAL_BY_KEY, SERVER_API_URL} from "../../config"
//Логин данные для входа и получения токена
export const serverLogin = async (email, password) => {
    return axios.post(`${SERVER_API_URL}${API_LOGIN}`, {email, password});
}
//Регистрация (Данные юзера)
export const registration = async(user) => {
    return axios.post(`${SERVER_API_URL}${API_REGISTRATION}`, user);
}
//Допуск к ресурсу по токену (все ендпоинты имеют доступ по токену кроме login & registration)
export const validate = async(token) => {
    return axios.post(`${SERVER_API_URL}${API_VALIDATE_CREDENTIAL_BY_KEY}`,{},{
        headers:{Authorization:token},
    });
}

export const resetPasswordForCustomer = async (password, token) => {
    console.log(password)
    const response = await axios.post(`${SERVER_API_URL}${API_RESET_PASSWORD}`, 
        {password}, 
        {headers:{Authorization: token}
    })
    return response
}
export const resetPasswordForCustomerAuth = async (originalPassword, password, token) => {
    const response = await axios.post(`${SERVER_API_URL}${API_RESET_PASSWORD_AUTH}`, 
        {password, originalPassword},
        {headers:{Authorization: token}}
    )
    return response
}