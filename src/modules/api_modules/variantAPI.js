import axios from "axios"
import { API_ADMIN_DELETE_VARIANT, API_ADMIN_EDIT_VARIANT, API_ADMIN_EDIT_VARIANT_TASKS, API_ADMIN_SEND_VARIANT, API_ADMIN_UPLOAD_TASKS, API_ADMIN_UPLOAD_VARIANT, API_ADMIN_VARIANT_VISIBILITY, API_ADMIN_VARIANTS, API_AVAILABLE_VARIANTS, API_AVAILABLE_VARIANTS_BY_PAGE, API_GET_VARIANT, API_GET_VARIANTS, API_VARIANT, API_VARIANT_TASKS_DATA, API_VARIANTS_AVAILABLE_COUNT, API_VARIANTS_DATA, SERVER_API_URL, USER_DATA_KEY } from "../../config";
import { getCurrentDate } from "../date_modules/currentDate";

export const getVisibleVariants = async () => {
    
    const response = await axios.get(`${SERVER_API_URL}${API_VARIANTS_DATA}`);
    return response;
    
}
export const getAllVariants = async (token) => {
    const response = await axios.get(`${SERVER_API_URL}${API_ADMIN_VARIANTS}`, {
        headers : {"Authorization" : token}
    })
    return response;
}
export const getAvailableVariants = async (token) => {
    const response = await axios.get(`${SERVER_API_URL}${API_AVAILABLE_VARIANTS}`, {
        headers: {"Authorization" : token}
    })
    return response
}
export const getVariants = async () => {
    return await axios.get(`${SERVER_API_URL}${API_GET_VARIANTS}`)
}
export const getAvailableVariantsByPage = async (pageNumber, size) => {
    const response = await axios.get(`${SERVER_API_URL}${API_AVAILABLE_VARIANTS_BY_PAGE}`, {
        params:{
            pageNumber: pageNumber, 
            size: size
        }
    })
    return response
}
export const getAvailableVariantsCount = async () => {
    const response = await axios.get(`${SERVER_API_URL}${API_VARIANTS_AVAILABLE_COUNT}`)
    return response 
}
export const getTasksByVariantId = async (variantId) => {
    const url = API_VARIANT_TASKS_DATA.replace("%d", variantId)
    const response = await axios.get(`${SERVER_API_URL}${url}`);
    response.data.forEach(task => {
        task.taskContent = JSON.parse(task.taskContent)
    })
    return response;
}
export const getVariantById = async (variantId) => {
    const url = API_VARIANT.replace("%d", variantId)
    console.log(`${SERVER_API_URL}${url}`)
    const response = await axios.get(`${SERVER_API_URL}${url}`);
    response.data.variantTasks.forEach(task => {
        task.taskContent = JSON.parse(task.taskContent)
    })
    return response
}
export const updateVariantVisibility = async (variantId, visibility, token) => {
    const param = new URLSearchParams()
    param.append("visibility", visibility)
    const response = axios.post(`${SERVER_API_URL}${API_ADMIN_VARIANT_VISIBILITY}/${variantId}`,param ,{
        headers:{"Authorization" : token}
    })
    return response;
}

export const sendVariantData = async (variant) => {
    const formData = new FormData()
    formData.append('variantImg', variant.variantImg)
    formData.append('variantTheme', variant.variantName)
    formData.append('creationDate', getCurrentDate())
    
    const response = await axios.post(`${SERVER_API_URL}${API_ADMIN_UPLOAD_VARIANT}`,
         formData, {headers : {Authorization : localStorage.getItem("token"),"Content-Type": 'multipart/form-data'}})
    return response
}
export const editVariant = async (variant) => {
    console.log(variant)
    const formData = new FormData()
    formData.append('variantImg', variant.variantImg)
    formData.append('variantTheme', variant.variantName)
    const url = API_ADMIN_EDIT_VARIANT.replace("%d", variant.id)
    console.log(`${SERVER_API_URL}${url}`)
    const response = await axios.post(`${SERVER_API_URL}${url}`, formData, 
        {headers: {Authorization: localStorage.getItem("token")}}
    )
    return response
}
export const editVarianTasks = async (tasks, secondTaskImg, fourthTaskImg1, fourthTaskImg2, speakerRecord, questionsRecords, variantId) => {
    const formData = new FormData()
    formData.append("tasks", JSON.stringify(tasks))
    formData.append("img", secondTaskImg)
    formData.append("firstImg", fourthTaskImg1)
    formData.append("secondImg", fourthTaskImg2)
    formData.append("speakerRecord", speakerRecord)
    for(let i = 0; i < questionsRecords.length; i++)
        formData.append("questionsRecords", questionsRecords[i])
    const url = API_ADMIN_EDIT_VARIANT_TASKS.replace("%d", variantId)
    const response = await axios.post(`${SERVER_API_URL}${url}`,
        formData, {headers : {Authorization : localStorage.getItem("token"),"Content-Type": 'multipart/form-data'}}
    )
    return response
}
export const deleteVariantData = async (variantId) => {
    const response = await axios.delete(`${SERVER_API_URL}${API_ADMIN_DELETE_VARIANT}/${variantId}`, 
        {headers : {Authorization : localStorage.getItem("token")}})
    return response
}
export const sendTasksForVariant = async (tasks, secondTaskImg, fourthTaskImg1, fourthTaskImg2, speakerRecord, questionsRecords, variantId) => {
    const formData = new FormData()
    formData.append("tasks", JSON.stringify(tasks))
    formData.append("img", secondTaskImg)
    formData.append("firstImg", fourthTaskImg1)
    formData.append("secondImg", fourthTaskImg2)
    formData.append("speakerRecord", speakerRecord)
    for(let i = 0; i < questionsRecords.length; i++)
        formData.append("questionsRecords", questionsRecords[i])
        
    formData.append("variantId", variantId)

    const response = await axios.post(`${SERVER_API_URL}${API_ADMIN_UPLOAD_TASKS}`,
        formData, {headers : {Authorization : localStorage.getItem("token"),"Content-Type": 'multipart/form-data'}}
    )
    return response
}

