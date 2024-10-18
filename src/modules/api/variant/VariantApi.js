import axios from "axios"
import { API_VARIANTS_DATA, SERVER_API_URL } from "../../../config";

export const getVariantsData = async () => {
    const response = await axios.get(`${SERVER_API_URL}${API_VARIANTS_DATA}`);
    return response;
}