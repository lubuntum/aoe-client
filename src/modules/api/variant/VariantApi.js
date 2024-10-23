import axios from "axios"
import { API_VARIANT_TASKS_DATA, API_VARIANTS_DATA, SERVER_API_URL } from "../../../config";

export const getVariantsData = async () => {
    const response = await axios.get(`${SERVER_API_URL}${API_VARIANTS_DATA}`);
    return response;
}

export const getTasksByVariantId = async (variantId) => {
    const url = API_VARIANT_TASKS_DATA.replace("%d", variantId)
    const response = await axios.get(`${SERVER_API_URL}${url}`);
    return response;
}