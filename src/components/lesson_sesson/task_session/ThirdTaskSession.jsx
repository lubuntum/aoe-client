import { useRef, useState } from "react"

import useLessonMediaRecorder from "../../../hooks/useLessonMediaRecorder";

import { stages } from "../lesson_session_page/LessonSessionPage";
import { TaskSessionPanel } from "./TaskBottomPanel";
import { useLessonSpeaker } from "../../../hooks/speech/useLessonSpeaker";
import { TasksContentWrapper } from "./TasksContentWrapper"

import timersConfig from "../../../modules/timer_modules/configScenarioTimers"
import { useSound } from "../../../hooks/sound/useSound";
import notification from "../../../res/wavs/beep.wav"
import { useAudioSpeaker } from "../../../hooks/sound/useAudioSpeaker";
import { speechUrls } from "../../../speechUrls";
import { SERVER_API_URL } from "../../../config";

export const ThirdTaskSession = ({task, stage, setStage, handleNextTask}) => {
    const [questionNumber, setQuestionNumber] = useState(0)
    const [studentAnswering, setStudentAnswering] = useState(false)
    const {audioBlobRef, startRecording, stopRecording} = useLessonMediaRecorder(false)
    const {speak} = useLessonSpeaker()
    const {speakAudio} = useAudioSpeaker()
    const {playAndEvent} = useSound(notification)

    const handleNextQuestion = async () => {
        await stopRecording()
        if (questionNumber+1 >= task.taskContent.questions.length){
            handleNextTask({"audio": audioBlobRef.current, "taskId": task.id})
            return
        }
        setQuestionNumber(prev=>prev+1)
        setStudentAnswering(false)
    }

    const handleStudentAnswer  = () => {
        setStudentAnswering(true)
    }

    const speakerSpeechInto = () => {
        console.log(task)
        try {
            if (!task.taskContent.speakerRecord) throw new Error("speakerRecord not found")
            speakAudio(`${SERVER_API_URL}/${task.taskContent.speakerRecord}`, () => setStage(stages.prepare_speak))
        } catch(err) {
            console.error("Error occurred while speaker: ", err)
            speak(task.taskContent.speaker[0], () => setStage(stages.prepare_speak))
        }
    }
    const speakQuestion = () => {
        try {
            if (!task.taskContent.questionsRecords) throw new Error("questionsRecords not found")
                playAndEvent(()=>speakAudio(`${SERVER_API_URL}/${task.taskContent.questionsRecords[questionNumber]}`, () => {playAndEvent(()=>{handleStudentAnswer()})}))
        } catch (err) {
            console.error("Error occured while speaking question: ", err)
            playAndEvent(() => {speak(task.taskContent.questions[questionNumber], () => {playAndEvent(()=>{handleStudentAnswer()})})})
        }
    }
    //Всегда скрывать вопросы
    if(task !== undefined) task.hideQuestions = true;
    //Если этап чтения, то проговорить задание и перейти на этап подготовки
    if(stage === stages.reading) speakerSpeechInto()
    // Если этап ответа и студент еще не должен отвечать, задать вопрос и дать студентку сказать
    if(stage === stages.speak && !studentAnswering) {
        speakQuestion()
        //playAndEvent(() => {speak(task.taskContent.questions[questionNumber], () => {playAndEvent(()=>{handleStudentAnswer()})})})
        
    }
    // Если этап ответа и студент уже отвечает, начать запись его голоса
    if(stage === stages.speak && studentAnswering) startRecording()
        
    return (<>
            <TasksContentWrapper task={task}/>
            {stage === stages.reading &&(<>
                <TaskSessionPanel btnText={"Skip"} nextAction={()=>{}} sec={timersConfig.THIRD_TASK_READING_TIMER} stage={stage}/></>)}
            {(stage === stages.speak && !studentAnswering) && (<>
                <TaskSessionPanel key={questionNumber} btnText={"Next"} nextAction={()=> {}} sec={timersConfig.THIRD_TASK_CHANGE_QUESTION} stage={stage}/></>)}
            {(stage === stages.speak && studentAnswering) && (<>
                <TaskSessionPanel key={questionNumber} btnText={"Next"} nextAction={()=> {handleNextQuestion()}} sec={timersConfig.THIRD_TASK_SPEAKING_TIMER} stage={stage}/></>)}
    </>)
}