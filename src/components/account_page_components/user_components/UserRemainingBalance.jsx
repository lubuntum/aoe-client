import { useNavigate } from "react-router-dom"
import routes from "../../../routes"
import { Button } from "../../reusible_components/Button"

export const UserRemainingBalance = ({customer}) => {
    const navigate = useNavigate()

    
    return (<>
        <div className="userRemainingBalanceContainer">
            <p>Баланс</p>
            
            <p>{customer.currentBalance ? customer.currentBalance : 0} ₽</p>

            <Button buttonType={"alt"}
                    buttonPadding={"0 20px"}
                    buttonWidth={""}
                    buttonHeight={""}
                    buttonIcon={""}
                    buttonText={"Пополнить"}
                    buttonFunc={()=>{navigate(routes.PRICING)}}/>
        </div>
    </>)
}