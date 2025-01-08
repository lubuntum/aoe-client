import { FirstTaskContent } from "../reusible_components/FirstTaskContent"
import { SecondTaskContent } from "../reusible_components/SecondTaskContent"
import { ThirdTaskContent } from "../reusible_components/ThirdTaskContent"
import { FourthTaskContent } from "../reusible_components/FourthTaskContent"

export const ComplitionResultsWrapper = ({task}) => {
    const complitionResultsWrapperComponents = {
        1:FirstTaskContent,
        2:SecondTaskContent,
        3:ThirdTaskContent,
        4:FourthTaskContent
    }

    let ResultsContent = complitionResultsWrapperComponents[task.taskType]

    return (<>
        <div className="complitionResultsWrapper">
            {ResultsContent ? <ResultsContent task={task}/> : <p>Aboba</p>}
        </div>
    </>)
}