import "./btn_style.css"

export const BtnIcon = ({btnIcon, btnFunc, btnDis}) => {
    const handleClick = (event) => {
        if (btnFunc && !btnDis) {
            btnFunc()
        }
    }

    return (<>
        <button className={`btn btn_icon`} onClick={handleClick} disabled={btnDis}>
            {btnIcon}
        </button>
    </>)
}