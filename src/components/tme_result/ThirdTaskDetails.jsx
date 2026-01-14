export const ThirdTaskDetails = ({ key, task, audio }) => {
    return (<>
        <div key={key} className="task_details_container accordion">
            <div className="task_details_content">
                <div className="task_details_guide">
                    <span>GUIDE:</span> {task?.taskContent?.taskGuide || "No guide available"}
                </div>

                <div className="task_details_divider"></div>

                <div className="task_details_list">
                    {task?.taskContent?.questions.map((item, i) => (<div>{i+1}. {item}</div>))}
                </div>

                {audio &&
                <div className="task_details_audio">
                    <audio controls src={audio} preload="metadata">
                        Ваш браузер не поддерживает воспроизведение аудиофайла
                    </audio>
                </div>}
            </div>  
        </div>
    </>)
}