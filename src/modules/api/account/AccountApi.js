import axios from "axios";
import { SERVER_API_URL,  API_CUSTOMER_DATA} from "../../../config";

export const getCustomerData = async (token) => {
    const response =  await axios.get(`${SERVER_API_URL}${API_CUSTOMER_DATA}`,  {
        headers: {
            "Authorization": token
        }
    });
    return response
}