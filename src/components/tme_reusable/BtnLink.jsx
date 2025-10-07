import "./btn_style.css"

export const BtnLink = ({btnText, btnFunc, btnDis}) => {
    const handleClick = (event) => {
        if (btnFunc && !btnDis) {
            btnFunc()
        }
    }

    return (<>
        <button className={`btn btn_link`} onClick={handleClick} disabled={btnDis}>
            {btnText}
        </button>
    </>)
}