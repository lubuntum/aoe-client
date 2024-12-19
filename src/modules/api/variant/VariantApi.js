import axios from "axios"
import { API_ADMIN_SEND_VARIANT, API_ADMIN_UPLOAD_VARIANT, API_VARIANT_TASKS_DATA, API_VARIANTS_DATA, SERVER_API_URL } from "../../../config";

export const getVariantsData = async () => {
    const response = await axios.get(`${SERVER_API_URL}${API_VARIANTS_DATA}`);
    return response;
}

export const getTasksByVariantId = async (variantId) => {
    const url = API_VARIANT_TASKS_DATA.replace("%d", variantId)
    const response = await axios.get(`${SERVER_API_URL}${url}`);
    response.data.forEach(task => {
        task.taskContent = JSON.parse(task.taskContent)
    })
    return response;
}

export const sendVariantData = async (variant) => {
    const formData = new FormData()
    formData.append('variantImg', variant.variantImg)
    formData.append('variantName', variant.variantName)
    //formData.append('creationDate', )
    const response = await axios.post(`${SERVER_API_URL}${API_ADMIN_UPLOAD_VARIANT}`,
         formData, {headers : {'Content-Type': 'multipart/form-data'}} )
    return response.data
}

