import "axios"
import axios from "axios"
import { API_ADMIN_GET_ACTIVITY_STATISTICS, SERVER_API_URL } from "../../config"
export const getActivityStatistics = async (token) => {
    const request = await axios.get(`${SERVER_API_URL}${API_ADMIN_GET_ACTIVITY_STATISTICS}`, {
        headers:{Authorization: token}
    })
    return request
}