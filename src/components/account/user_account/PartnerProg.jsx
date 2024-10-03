import "./css/partner_prog.css"

export const PartnerProg = () => {
    return (<>
        <div className="partnerContainerWrapper gridItem3">
            <p>Промокод</p>

            <div className="inputContainer">
                <input className="customInput" type="text" placeholder="Введите промокод" required></input>
            </div>

            <a className="btn" onClick={() => {}}>Применить</a>
        </div>
    </>)
}