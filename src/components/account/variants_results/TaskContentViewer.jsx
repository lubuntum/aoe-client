import "./css/content_viewer.css"

export const TaskContentViewer = ({task}) => {
    let idleComponent = undefined
    if(task === undefined) {
        idleComponent = <p>Задача не выбрана</p>
    }
    return (<>
        <div className="viewerContainerWrapper">
            {idleComponent && idleComponent}
            {idleComponent === undefined && <p>{task.id}</p>}
        </div>
    </>)
}