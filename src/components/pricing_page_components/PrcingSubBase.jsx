import { useNavigate } from "react-router-dom"
import { Button } from "../reusible_components/Button"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import routes from "../../routes"

export const PricingSubBase = ({className, pricingSubDesc}) => {
    const navigate = useNavigate()
    const { isAuth } = useAuth()
    console.log(isAuth)
    
    return (
        <div className={`pricingSubContainer ${className}`}>
            <div className="pricingSubTitle">
                <p>Базовый план</p>
                <p>Активен</p>
            </div>
            <div className="divider"></div>
            <div className="pricingSubWrapper">
                <div className="pricingSubDesc">
                    {pricingSubDesc.map((desc, index) => (
                        <div className="pricingSubDescItem">
                            <div className="verticalDivider"></div>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
                <div className="prcingSubButton">
                    {!isAuth ?
                        <Button key={"pricingSubButton0"}
                                buttonType={"outline"}
                                buttonWidth={"100%"}
                                buttonText={"Регистрация"}
                                buttonFunc={()=>{navigate(routes.AUTORIZATION)}}/> :
                        <div className="pricingSubButtonEmpty"></div>}
                </div>
            </div>
        </div>
    )
}