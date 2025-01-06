export const ResultsTopbar = ({showContentByTaskClick, currentVariant, showContentByExamClick, className}) => {
    return (<>
        <div className={`resultTopbarContainer ${className}`}>
            <div className="resultTopbarRadioGroup">
                <fieldset id="topbarGroup">
                    {currentVariant.variantTasks.map((task, index) => (
                        <label key={`Topbar${index}`} className="topbarRadioOption" onClick={()=>{showContentByTaskClick(task)}}>
                            <input type="radio" name="topbarGroup"></input>
                            <div className="topbarButton">Задание {index + 1}</div>
                        </label>
                    ))}
                    <label key="TopbarExam1" className="topbarRadioOption" onClick={showContentByExamClick}>
                        <input type="radio" name="topbarGroup"></input>
                        <div className="topbarButton">Экзамен</div>
                    </label>
                </fieldset>
            </div>
        </div>
    </>)
}