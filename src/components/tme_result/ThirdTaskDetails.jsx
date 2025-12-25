export const ThirdTaskDetails = ({ task }) => {
    return (<>
        <div className="task_details_container accordion">
            <div className="task_details_content">
                <div className="task_details_guide">
                    <span>GUIDE:</span> {task?.taskContent?.taskGuide || "No guide available"}
                </div>

                <div className="task_details_divider"></div>

                <div className="task_details_list">
                    {task?.taskContent?.questions.map((item, i) => (<div>{i+1}. {item}</div>))}
                </div>
            </div>  
        </div>
    </>)
}