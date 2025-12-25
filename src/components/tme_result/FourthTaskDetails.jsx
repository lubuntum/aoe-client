import { SERVER_API_URL } from "../../config"

export const FourthTaskDetails = ({ task }) => {
    return (<>
        <div className="task_details_container accordion">
            <div className="task_details_content">
                <div className="task_details_guide">
                    <span>GUIDE:</span> {task?.taskContent?.taskGuide || "No guide available"} ({task?.taskContent?.taskText[1] || "No description available"})
                </div>

                <div className="task_details_divider"></div>

                <div className="task_details_list">
                    <div className="task_details_text">
                        {task?.taskContent?.taskText[0] || "No text available"}
                    </div>

                    {task?.taskContent?.subTasks.map(item => (<div>- {item}</div>))}
                </div>

                <div className="task_details_img_container">
                    <div className="task_image">
                        <img src={`${SERVER_API_URL}/${task?.taskContent?.firstImg}`} alt="" />
                    </div>

                    <div className="task_image">
                        <img src={`${SERVER_API_URL}/${task?.taskContent?.secondImg}`} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>)
}