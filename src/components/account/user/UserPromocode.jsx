export const UserPromocode = () => {
    return (<>
        <div className="userPromocodeContainer gridItem3">
            <p>Промокод</p>

            <div className="defInpContainer">
                <input className="defInp" 
                       style={{width: "100%"}} 
                       type="text" 
                       placeholder="Введите промокод" 
                       required></input>
            </div>

            <a className="btn defaultBtn" style={{width: "100%"}} onClick={() => {}}>Применить</a>
        </div>
    </>)
}