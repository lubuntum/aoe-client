import axios from "axios"
import { API_LOGIN, API_REGISTRATION, API_VALIDATE_CREDENTIAL_BY_KEY, SERVER_API_URL} from "../../config"
//Логин данные для входа и получения токена
export const login = async (username, password) => {
    return axios.post(`${SERVER_API_URL}${API_LOGIN}`, {username, password});
}
//Регистрация (Данные юзера)
export const registration = async(user) => {
    return axios.post(`${SERVER_API_URL}${API_REGISTRATION}`, {user});
}
//Допуск к ресурсу по токену (все ендпоинты имеют доступ по токену кроме login & registration)
export const validate = async(token) => {
    return axios.post(`${SERVER_API_URL}${API_VALIDATE_CREDENTIAL_BY_KEY}`,{},{
        headers:{Authorization:token},
    });
}