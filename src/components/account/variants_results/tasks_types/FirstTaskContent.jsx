export const FirstTaskContent = ({task}) => {
    return (<>
            <p>{task.task_type}{task.task_content.task_text}</p>
        </>
    )
}