export const FirstTaskDetails = ({ task }) => {
    return (<>
        <div className="task_details_container accordion">
            <div className="task_details_content">
                <div className="task_details_guide">
                    <span>GUIDE:</span> {task?.taskContent?.taskGuide || "No guide available"}
                </div>

                <div className="task_details_divider"></div>

                <div className="task_details_text">
                    {task?.taskContent?.taskText || "No text available"}
                </div>
            </div>
        </div>
    </>)
}