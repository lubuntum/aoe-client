import "./css/content_viewer.css"

export const TaskContentViewer = ({task}) => {
    let idleComponent = undefined
    if(task === undefined) {
        idleComponent = <div className="viewerContainerWrapper"><p>Задача не выбрана</p></div>
    }
    
    return (<>
        {idleComponent && idleComponent}
        {idleComponent === undefined && 
            <div className="viewerContainerWrapper">
                <p>{task.task_content.task_guide}</p>
            </div>}
    </>)
}