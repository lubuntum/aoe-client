export const UserPromocode = () => {
    return (<>
        <div className="userPromocodeContainer gridItem3">
            <p>Промокод</p>

            <div className="inputContainer">
                <input className="customInput" type="text" placeholder="Введите промокод" required></input>
            </div>

            <a className="btn" onClick={() => {}}>Применить</a>
        </div>
    </>)
}