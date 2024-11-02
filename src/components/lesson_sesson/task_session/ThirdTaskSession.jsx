import { useRef, useState } from "react"
import { TaskContentViewer } from "../../account/variants_results/content_viewer/TaskContentViewer";
import { stages } from "../LessonSessionPage";
import { TaskSessionPanel } from "./TaskSessionPanel";
import { useLessonSpeaker } from "../../../hooks/speech/useLessonSpeaker";

export const ThirdTaskSession = ({task, stage, setStage, handleNextTask}) => {
    const [questionNumber, setQuestionNumber] = useState(0)
    const [studentAnswering, setStudentAnswering] = useState(false)
    //Хранить записи всех ответов на вопросы(затем в один файл)
    const questionAudioRef = useRef([])
    const {speak} = useLessonSpeaker();
    const handleNextQuestion = () => {
        if (questionNumber+1 >= task.taskContent.questions.length){
            handleNextTask()
            return
        }
        setQuestionNumber(prev=>prev+1)
        setStudentAnswering(false)
        //stop recording if it was
    }
    const handleStudentAnswer  = () => {
        setStudentAnswering(true)
    }
    
    //Всегда скрывать вопросы
    if(task !== undefined) task.hideQuestions = true;
    //Если этап чтения, то проговорить задание и перейти на этап подготовки
    if(stage === stages.reading) speak(task.taskContent.speaker[0], () => setStage(stages.prepare_speak))
    // Если этап ответа и студент еще не должен отвечать, задать вопрос и дать студентку сказать
    if(stage === stages.speak && !studentAnswering) speak(task.taskContent.questions[questionNumber], handleStudentAnswer)
    // Если этап ответа и студент уже отвечает, начать запись его голоса
    //if(stage === stages.speak && studentAnswering) Запись голоса студента
    return (
        <>
            <TaskContentViewer task={task} />
            {stage === stages.reading &&
            (<>
                <TaskSessionPanel btnText={"Skip"} nextAction={()=>{}} sec={0} />
            </>)}

            {(stage === stages.speak && !studentAnswering) && 
            (<>
                <TaskSessionPanel key={questionNumber} btnText={"Next"} nextAction={()=> {}} sec={0} />
            </>)}

            {(stage === stages.speak && studentAnswering) &&
            (<>
                <TaskSessionPanel key={questionNumber} btnText={"Next"} nextAction={()=> {handleNextQuestion()}} sec={5} />
            </>)}
        </>
    )
}