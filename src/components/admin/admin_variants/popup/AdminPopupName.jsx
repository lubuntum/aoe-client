import { useState } from "react"
import { ReactComponent as DeleteIcon } from "../../../../res/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AdminPopupName = ({variantValues, handleInputChange}) => {
    const [imgName, setImageName] = useState("Выберите превью для изображения")
    const addVariantImg = (e) => {
        if (e.target.files.length === 0) return
        setImageName(e.target.files[0].name)
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
                    <label className="btn defaultBtn" for="variantImg" style={{width: "340px"}}>{imgName}</label>
                    <input type="file" name="img" id="variantImg" accept="image/*" onChange={addVariantImg}></input>
                    
                </div>
            </div>

        </div>
    </>)
}