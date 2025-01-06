import warningTape from "../../../res/images/admin_prompt_hint_warning_tape.png"

export const AdminPromptHint = ({type}) => {
    return (<>
        <div className="adminHintContainer">
            <div className="adminHintTitle">
                <p>Подсказка промпта, для задания типа {type}</p>
                <p>В промпте необходимо указать:</p>
            </div>

            <div className="adminHintWrapper">
                <div className="adminTextHintContainer">
                    <div className="adminHintNumber"><p>1</p></div>
                    <p>Здесь подсказка для "Начало задания"</p>
                </div>

                <div className="adminTextHintContainer">
                    <div className="adminHintNumber"><p>2</p></div>
                    <p>Здесь подсказка для "Начало ответа"</p>
                </div>

                <div className="adminTextHintContainer">
                    <div className="adminHintNumber"><p>3</p></div>
                    <p>Здесь подсказка для "Начало ответа"</p>
                </div>

                <div className="adminTextHintContainer">
                    <div className="adminHintNumber"><p>4</p></div>
                    <p>Здесь подсказка для "Начало ответа"</p>
                </div>

                <div className="adminTextHintContainer">
                    <div className="adminHintNumber"><p>5</p></div>
                    <p>Здесь подсказка для "Начало ответа"</p>
                </div>

                <div className="adminTextHintContainer">
                    <div className="adminHintNumber"><p>6</p></div>
                    <p>Здесь подсказка для "Начало ответа"</p>
                </div>

                <div className="adminTextHintContainer">
                    <div className="adminHintNumber"><p>7</p></div>
                    <p>Здесь подсказка для "Начало ответа"</p>
                </div>
            </div>

            <div className="adminHintWarningTape" style={{backgroundImage: `url(${warningTape})`,
                                                          backgroundSize: "cover",
                                                          backgroundRepeat: "no-repeat",
                                                          backgroundPosition: "center"}}></div>
        </div>
    </>)
}