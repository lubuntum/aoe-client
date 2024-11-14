import { TaskContentViewer } from "./TaskContentViewer"

export const ExamContentViewer = ({variant, exams}) => {
    console.log(`CURRENT VARIANT ${variant.variantTasks[0]}`)
    return (<>
        <div className="viewerContainerWrapper gridItem8">
            {variant.theme}
            {variant && 
                variant.variantTasks.map(t=>
                    <TaskContentViewer task={t} />
                )}
        </div>
    </>)
}