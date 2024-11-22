import "./css/task_viewer.css"
import "./css/task_viewer_wrapper.css"
import "./css/task_viewer_media.css"

import { FirstTaskContent } from "../../../item_task_content/FirstTaskContent"
import { SecondTaskContent } from "../../../item_task_content/SecondTaskContent"
import { ThirdTaskContent } from "../../../item_task_content/ThirdTaskContent"
import { FourthTaskContent } from "../../../item_task_content/FourthTaskContent"

import { useState } from "react"
import { useEffect } from "react"

export const TaskViewerWrapper = ({task}) => {
    const taskContentComponents = {
        1:FirstTaskContent,
        2:SecondTaskContent,
        3:ThirdTaskContent,
        4:FourthTaskContent
    }

    let idleComponent = undefined
    let TaskContent = undefined
    if(task === undefined) {
        idleComponent = <div className="taskViewerEmpty gridItem8"><p>Задача не выбрана</p></div>
    }
    else 
        TaskContent = taskContentComponents[task.taskType]

    const [scrollEnabled, setScrollEnabled] = useState(false)
    let timeoutId = null

    const handleMouseEnter = () => {
        timeoutId = setTimeout(() => {
            setScrollEnabled(true)
        }, 500)
    }

    const handleMouseLeave = () => {
        clearTimeout(timeoutId)
        setScrollEnabled(false)
    }

    const handleTouchStart = () => {
        timeoutId = setTimeout(() => {
            setScrollEnabled(true)
        }, 500)
    }

    const handleTouchEnd =() => {
        clearTimeout(timeoutId)
        setScrollEnabled(false)
    }

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId)
        }
    }, [])

    return (<>
        {idleComponent && idleComponent}
        {idleComponent === undefined && 
            <div className="taskViewerWrapper gridItem8"
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
                 onTouchStart={handleTouchStart}
                 onTouchEnd={handleTouchEnd}
                 style={{overflow: scrollEnabled ? 'auto' : 'hidden'}}>
                {TaskContent ? <TaskContent task = {task}/> : <p>Unknown task type</p>}
            </div>}
    </>)
}