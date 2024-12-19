import { ReactComponent as DeleteIcon } from "../../../../res/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AdminPopupName = ({variantValues, handleInputChange}) => {
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
                    <label className="btn defaultBtn" for="variantImg" style={{width: "200px"}}>Выберите файл</label>
                    <input type="file" name="img" id="variantImg" accept="image/*" onChange={handleInputChange}></input>
                    <a className="btn deleteBtn"><DeleteIcon className="deleteBtnSvg"/></a>
                    <p>Здесь имя</p>
                </div>
            </div>

        </div>
    </>)
}