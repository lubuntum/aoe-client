import { useState } from "react"
import { applyPromocodeForCustomer } from "../../../modules/api_modules/partnerAPI"
import { Button } from "../../reusible_components/Button"

export const UserPromocode = ({className}) => {
    const [error, setError] = useState(null)
    const [status, setStatus] = useState(null)
    const [promocode, setPromocode] = useState("")
    const applyPromocode = async () => {
        if (!promocode || promocode === "") {
            setError("Введите промокод")
            return
        }
        try {
            const response = await applyPromocodeForCustomer(localStorage.getItem("token"), promocode)
            
            if (response.data) {
                setStatus("Промокод активирован")
                setError(null)
            } else {
                setError("Промокод не найден")
                setStatus(null)
            }
        } catch(e) {
            setStatus(null)
            setError(e.response.data.error)
        }
    }
    const handleInput = (value) => {
        console.log(value)
        setPromocode(value)
    }
    return (<>
        <div className={`userPromocodeContainer ${className}`}>
            <p>Промокод</p>
            {error && <div style={{color:"red", opacity:0.7, fontSize:12}}>{error}</div>}
            {status && <div style={{color:"green", opacity:0.7, fontSize:12}}>{status}</div>}
            <div className="inputContainer">
                <input type="text"
                       placeholder="Введите промокод" 
                       value={promocode}
                       onChange={(e)=>{handleInput(e.target.value)}}
                       required>
                </input>
            </div>

            <Button buttonType={""}
                    buttonPadding={"0 20px"}
                    buttonWidth={"100%"}
                    buttonHeight={""}
                    buttonIcon={""}
                    buttonText={"Применить"}
                    buttonFunc={()=>{applyPromocode()}}/>
        </div>
    </>)
}