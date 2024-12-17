import axios from "axios";
import { API_SEND_EXAM_DATA, API_SEND_TASK_RESULT_DATA, API_SEND_USER_TASK_DATA, SERVER_API_URL, USER_EMAIL, USER_NAME } from "../../../config";
import { getCurrentDate } from "../../date/currentDate";
export const createExamRequest = async (variantId, sessionKey) => {
    const response = await axios.post(`${SERVER_API_URL}${API_SEND_EXAM_DATA}`,
        {"variantId":variantId, "examCompleteDate":getCurrentDate()},
        {headers: {Authorization: sessionKey, "Content-Type" : "application/json"}} )
    return response 
}
/**
 * 
 * @param {*} examId optional, if persist save taskResult for exam
 * @param {*} taskResult data with audio blob and etc
 */
export const saveUserTaskRequest = async (examId = null, taskId, audioBlob, sessionKey) => {
    const userEmail = localStorage.getItem(USER_EMAIL)
    const userTask = {"taskId":taskId, "examId":examId, "completeDate": getCurrentDate()}
    const form = new FormData()
    form.append("file", audioBlob, `${userEmail}_${taskId}_${Date.now()}.wav`);
    form.append("customerTask", new Blob([JSON.stringify(userTask)], {type:"application/json"}))
    const response = await axios.post(`${SERVER_API_URL}${API_SEND_USER_TASK_DATA}`,
        form, {headers: {Authorization:sessionKey ,"Content-Type":"multipart/form-data"}, 
        maxContentLength:"infinity", maxBodyLength:"infinity"})
    return response;
}

