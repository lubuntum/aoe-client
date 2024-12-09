import { FirstTaskContent } from "../../../item_task_content/FirstTaskContent"
import { SecondTaskContent } from "../../../item_task_content/SecondTaskContent"
import { ThirdTaskContent } from "../../../item_task_content/ThirdTaskContent"
import { FourthTaskContent } from "../../../item_task_content/FourthTaskContent"

import { useState } from "react"
import { useEffect } from "react"

export const ExamViewerWrapper = ({variant}) => {
    const TaskContentComponents = {
        1:FirstTaskContent,
        2:SecondTaskContent,
        3:ThirdTaskContent,
        4:FourthTaskContent
    }

    return (<>
        <div className="taskViewerWrapper gridItem8">
            {variant && variant.variantTasks.map((t, index) => {
                const TaskComponent = TaskContentComponents[t.taskType]
                return TaskComponent ? (
                <div key={t.id}>
                    <p className="taskIterator">{`Задание ${index + 1}`}</p>
                    <TaskComponent task={t}/>
                </div>) : null
            })}
        </div>
    </>)
}