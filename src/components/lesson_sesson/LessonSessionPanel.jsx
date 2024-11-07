import { useRef } from "react"
import useMediaRecorder from "../../hooks/useMediaRecorder"
import { useNavigate } from "react-router-dom"
import routes from "../../routes"
import { stages } from "./LessonSessionPage"
import { createExamRequest, saveTaskResultRequest, saveUserTaskRequest } from "../../modules/api/voice/LessonSessionAPI"
export const LessonSessionPanel = ({currentTask, handleNextTask, 
                                    examStage, variantId}) => {
    const navigation = useNavigate()
    const audioResultsRef = useRef([])
    const {audioBlobRef, mediaBlobUrl, isRecording, startRecording, stopRecording, reset} = useMediaRecorder(false)
    const nextTask = async () => {
        if(audioBlobRef.current === null || isRecording) return;
        stopRecording()//На всякий, если пользователь не остановил запись
        audioResultsRef.current.push({"audio": audioBlobRef.current, "taskId": currentTask.id})
        reset()//reset micro recorder
        handleNextTask()
    }
    const endExamSession = async () => {
        if(audioBlobRef === null || isRecording) return;
        audioResultsRef.current.push({"audio": audioBlobRef.current, "taskId": currentTask.id})

        const sessionKey = localStorage.getItem("token")
        const exam = await createExam(sessionKey)
        await saveTasksResults(sessionKey, exam)
        navigation(routes.TASK)
    }
    const createExam = async (sessionKey) => {
        const response = await createExamRequest(variantId, sessionKey)
        return await response.data
    }
    const saveTasksResults = async (sessionKey, exam) => {
        for (const audioBlobData of audioResultsRef.current) {
            const response = await saveUserTaskRequest(exam.id, audioBlobData.taskId, audioBlobData.audio, sessionKey)
            //if (!response.ok) throw new Error(`Error uploading ${audioBlob}`)
        }
    }
    
    return (
    <>
        <div style={{display:'flex', justifyContent:'center', gap: '15px'}}>
            {isRecording 
                ? <a onClick={()=> {stopRecording()}} className="btn" style={{width:'auto',padding:'0px 15px', backgroundColor:'red'}} >Стоп</a>
                : <a onClick={()=> {startRecording()}} className="btn" style={{width:'auto',padding:'0px 15px'}} >Ответить</a>}
            {currentTask.taskType !== 4 
                ? <a onClick={()=> {nextTask()}} className="btn" style={{width:'auto',padding:'0px 15px'}} >Далее</a>
                : <a onClick={()=> {endExamSession()}} className="btn" style={{width:'auto',padding:'0px 15px', backgroundColor:'green'}} >Завершить</a>}
            
            {mediaBlobUrl &&
                    <audio controls src={mediaBlobUrl} >
                        Ваш браузер не поддерживает audio тег
                    </audio>}
        </div>
    </>)

}