import "./btn_style.css"

export const Btn = ({btnText, btnFunc, btnDis}) => {
    const handleClick = (event) => {
        if (btnFunc && !btnDis) {
            btnFunc()
        }
    }

    return (<>
        <button className={`btn ${btnDis ? "btn_dis" : "btn_primary"}`} onClick={handleClick} disabled={btnDis}>
            {btnText}
        </button>
    </>)
}