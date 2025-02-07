import { useState } from "react"
import { Button } from "../reusible_components/Button"
import { DropdownList } from "../reusible_components/DropdownList"
import { InputField } from "../reusible_components/InputField"

export const PartnerForm = ({className}) => {

    const [phoneNumber, setPhoneNumber] = useState(null)
    
    const handleFormatPhoneNumber = (e) => {
        const numbers = e.target.value.replace(/\D/g, '').substring(0, 11)
        let formatted = ""
        if (numbers.length === 0) return ""
        
        formatted += "+"
        
        formatted += numbers.charAt(0) === "7" ? "7" : numbers.charAt(0)

        if (e.target.value === formatted) return ""
        formatted += " "
        
        if (numbers.length > 1) {
            formatted += "(" + numbers.substring(1, 4)
        }
        if (numbers.length > 4) {
            formatted += ") " + numbers.substring(4, 7)
        }
        if (numbers.length > 7) {
            formatted += " " + numbers.substring(7, 9)
        }
        if (numbers.length > 9) {
            formatted += "-" + numbers.substring(9, 11)
        }
        return formatted
    }

    return (
        <div className={`partnerFormContainer ${className}`}>
            <div className="partnerFormContainerItem">
                <p>Тип организации</p>
                <DropdownList key={"accountPartnerForm0"}
                              options={[1,2,3]}
                              onSelect={()=>{}}/>
            </div>

            <div className="partnerFormContainerItem">
                <p>Наименование организации</p>
                <InputField key={"accountPartnerForm1"}
                            inputType={"text"}
                            inputValue={""}
                            inputPlaceholder={"Наименование организации"}
                            inputOnChange={()=>{}}/>
            </div>

            <div className="partnerFormContainerItem">
                <p>Номер телефона</p>
                <InputField key={"accountPartnerForm2"}
                            inputType={"text"}
                            inputValue={phoneNumber}
                            inputPlaceholder={"Номер телефона"}
                            inputOnChange={(e)=>{const formatted = handleFormatPhoneNumber(e)
                                                setPhoneNumber(formatted)}}/>
            </div>

            <div className="partnerFormContainerItem">
                <p>ИНН</p>
                <InputField key={"accountPartnerForm3"}
                            inputType={"text"}
                            inputValue={""}
                            inputPlaceholder={"ИНН"}
                            inputOnChange={()=>{}}/>
            </div>

            <div className="partnerFormContainerItem">
                <p>КПП</p>
                <InputField key={"accountPartnerForm4"}
                            inputType={"text"}
                            inputValue={""}
                            inputPlaceholder={"КПП"}
                            inputOnChange={()=>{}}/>
            </div>

            <div className="partnerFormContainerItem">
                <p>БИК Банка</p>
                <InputField key={"accountPartnerForm5"}
                            inputType={"text"}
                            inputValue={""}
                            inputPlaceholder={"БИК Банка"}
                            inputOnChange={()=>{}}/>
            </div>

            <div className="partnerFormContainerItem">
                <p>Расчетный счет</p>
                <InputField key={"accountPartnerForm6"}
                            inputType={"text"}
                            inputValue={""}
                            inputPlaceholder={"Расчетный счет"}
                            inputOnChange={()=>{}}/>
            </div>

            <Button key={"accountPartnerForm7"}
                    buttonWidth={"100%"}
                    buttonText={"Сохранить"}
                    buttonFunc={()=>{}}/>
        </div>
    )
}