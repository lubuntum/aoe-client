
export const AdminPopupName = ({variantValues, handleInputChange}) => {
    const addVariantImg = (e) => {
        if (e.target.files.length === 0) return
        handleInputChange(e)
    }
    /*
    Removed
    <a className="btn deleteBtn" style={{visibility:"hidden"}}><DeleteIcon className="deleteBtnSvg"/></a>
    <p style={{visibility:"hidden"}} >{imgName}</p>
    */
    return (<>
        <div className="adminNameContainer">
            <p>Добавить новый вариант</p>
            <div className="adminNameWrapper">
                <div className="defInpContainer" style={{width: "100%"}}>
                    <input className="defInp" 
                            type="text" 
                            placeholder="Наименование варианта" 
                            id="variantName"
                            value={variantValues.variantName}
                            onChange={handleInputChange}
                            required>   
                    </input>
                </div>
                <div className="defInpFileContainer">
                    <label className="btn defaultBtn" for="variantImg" style={{width: "300px"}}>
                        <span style={{width: "100%", overflow: "hidden", whiteSpace: 'nowrap', textOverflow: "ellipsis", padding: "0 20px"}}>{variantValues.variantImg ? variantValues.variantImg.name : "Выберите превью для изображения"}</span>
                    </label>
                    <input type="file" name="img" id="variantImg" accept="image/*" onChange={addVariantImg}></input>
                </div>
            </div>

        </div>
    </>)
}