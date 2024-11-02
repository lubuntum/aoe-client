import { TaskContentViewer } from "../../account/variants_results/content_viewer/TaskContentViewer"
import { TaskSessionPanel } from "./TaskSessionPanel"
import { stages } from "../LessonSessionPage"
import { useState } from "react"
import { useLessonSpeaker } from "../../../hooks/speech/useLessonSpeaker"

export const SecondTaskSession = ({task, stage, setStage, handleNextTask}) => {
    const [topicNumber, setTopicNumber] = useState(0)
    const {speak} = useLessonSpeaker()
    const [studentAnswering, setStudentAnswering] = useState(false)
    const handleNextTopicNumber = () => {
        //console.log(`topicNumber => ${topicNumber}, len => ${task.taskContent.topics.length}`)
        if (topicNumber+1 >= task.taskContent.topics.length) {
            handleNextTask()
            return
        }
        setStudentAnswering(false)
        setTopicNumber(topicNumber + 1)
    }
    if (stage === stages.speak) task.topicNumber = topicNumber;
    if (stage === stages.speak && !studentAnswering){
        speak(`Question ${topicNumber+1}`,()=>{setStudentAnswering(true)})
    }
    return (
        <>
            <TaskContentViewer task={task}/>
            {stage === stages.reading &&
                <TaskSessionPanel btnText={"Skip"} nextAction={()=> {setStage(stages.prepare_speak)}} sec={90} />
            }
            {(stage === stages.speak && !studentAnswering) && 
                <TaskSessionPanel btnText={"Next"} nextAction={()=> {}} sec={0} />
            }
            {(stage === stages.speak && studentAnswering) &&
                <TaskSessionPanel key={topicNumber} btnText={"Next"} nextAction={()=> {handleNextTopicNumber()}} sec={5} />
            }
        </>
    )
}