import { SERVER_API_URL } from "../../config"

export const SecondTaskDetails = ({ task }) => {
    return (<>
        <div className="task_details_container accordion">
            <div className="task_details_content">
                <div className="task_details_guide">
                    <span>GUIDE:</span> {task?.taskContent?.taskGuide || "No guide available"} ({task?.taskContent?.taskText[1] || "No description available"})
                </div>

                <div className="task_details_divider"></div>

                <div className="task_details_text">
                    {task?.taskContent?.taskText[0] || "No text available"}
                </div>

                <div className="task_details_list">
                    {task?.taskContent?.topics.map((item, i) => (<div>{i+1}. {item}</div>))}
                </div>

                <div className="task_details_img_container">
                    <div className="task_img">
                        <div className="task_img_title">
                            {task?.taskContent?.imgTitle || "No image title available"}
                        </div>

                        <div className="task_image">
                            <img src={`${SERVER_API_URL}/${task?.taskContent?.img}`} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}