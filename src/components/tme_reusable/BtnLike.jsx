import "./css/btn_style.css"

export const BtnLike = ({btnIcon, btnFunc, btnDis}) => {
    const handleClick = (event) => {
        if (btnFunc && !btnDis) {
            btnFunc()
        }
    }

    return (<>
        <button className={`btn btn_like`} onClick={handleClick} disabled={btnDis}>
            {btnIcon}
        </button>
    </>)
}