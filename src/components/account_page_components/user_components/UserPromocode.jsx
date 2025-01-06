import { Button } from "../../reusible_components/Button"

export const UserPromocode = ({className}) => {
    return (<>
        <div className={`userPromocodeContainer ${className}`}>
            <p>Промокод</p>

            <div className="inputContainer">
                <input type="text"
                       placeholder="Введите промокод" 
                       required>
                </input>
            </div>

            <Button buttonType={""}
                    buttonPadding={"0 20px"}
                    buttonWidth={"100%"}
                    buttonHeight={""}
                    buttonIcon={""}
                    buttonText={"Применить"}
                    buttonFunc={()=>{}}/>
        </div>
    </>)
}