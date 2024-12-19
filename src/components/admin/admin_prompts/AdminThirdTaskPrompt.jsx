export const AdminThirdTaskPrompt = ({prompt, setPrompt}) => {
    return (<>
        <div className="adminPromptContainer">
            <p>Промпт для задания 3</p>
            <div className="defInpContainer" style={{width: "100%", height: "calc(100vh - 404px)"}}>
                <textarea className="defTextArea"
                        placeholder="Введите промпт для задания 3"
                        id="taskPrompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required>
                </textarea>
            </div>
        </div>
    </>)
}