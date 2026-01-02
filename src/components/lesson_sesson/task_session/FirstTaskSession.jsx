/**По факту тут не важно какая stage reading || speaking
 * поскольку логика только в отображении всего задания и записи голоса.
 * task structure : 
 * 
 * @param {*} task 
 * task.taskType (int 1-4)
 * task.taskContent (str obj)
 * @returns 
 */
import useLessonMediaRecorder from "../../../hooks/useLessonMediaRecorder"

import { stages } from "../lesson_session_page/LessonSessionPage"
import { TaskSessionPanel } from "./TaskBottomPanel"
import { TasksContentWrapper } from "./TasksContentWrapper"

import { useCustomSpeechRecognition } from "../../../hooks/useCustomSpeechRecognition"

export const FirstTaskSession = ({task, stage, setStage, handleNextTask}) => { //blobRef + mЫicro hook
    const {audioBlobRef, startRecording, stopRecording} = useLessonMediaRecorder(true)
    const {startListening, stopListening, finalTranscript} = useCustomSpeechRecognition()
    const handleNextTaskWithSaveAudio =  async () => {
        await stopRecording()
        const audioBlob = audioBlobRef.current;
        //await stopListening();
        handleNextTask({"audio": audioBlobRef.current, "taskId": task.id})
    }

    if (stage === stages.speak) {
        const startSpeakingPrep = async () => {
            await startRecording()
            //await startListening()
        }
        startSpeakingPrep()
    }

    return (<>
        {(stage === stages.reading || stage === stages.speak) && <TasksContentWrapper task={task}/>}
        {stage === stages.reading && 
            <TaskSessionPanel btnText={"Skip"} nextAction={()=> {setStage(stages.prepare_speak)}} sec={""} stage={stage}/>}
        {stage === stages.speak && 
            <TaskSessionPanel btnText={"Next"} nextAction={()=> {handleNextTaskWithSaveAudio()}} sec={""} stage={stage}/>}
    </>)
}