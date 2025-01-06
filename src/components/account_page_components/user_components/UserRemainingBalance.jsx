import { useNavigate } from "react-router-dom"
import routes from "../../../routes"
import { Button } from "../../reusible_components/Button"

export const UserRemainingBalance = ({customer}) => {
    const navigate = useNavigate()

    let remainigBalance = customer.attemptsExpert
    
    return (<>
        <div className="userRemainingBalanceContainer">
            <p>Баланс</p>
            
            <p>₽ {remainigBalance}</p>

            <Button buttonType={"alt"}
                    buttonPadding={"0 20px"}
                    buttonWidth={""}
                    buttonHeight={""}
                    buttonIcon={""}
                    buttonText={"Пополнить"}
                    buttonFunc={()=>{navigate(routes.TARIFF)}}/>
        </div>
    </>)
}