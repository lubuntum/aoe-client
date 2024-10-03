import "./css/sub_data.css"

export const SubData = () => {
    return (<>
        <div className="subContainerWrapper gridItem2">
            <p>Подписка</p>
            
            <div className="subDate">
                <p>Действует до: <span>26.08.2024</span></p>
                <p><span>26</span>д.</p>
            </div>
            
            <div className="progressBar">
                <div className="subProgressBar">
                    <div className="actualyProgressBar" style={{width: "75%"}}></div>
                </div>
            </div>

            <a className="btn" onClick={() => {}}>Продлить</a>
        </div>
    </>)
}