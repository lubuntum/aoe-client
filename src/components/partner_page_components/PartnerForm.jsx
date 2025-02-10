import { useRef, useState } from "react"
import { Button } from "../reusible_components/Button"
import { DropdownList } from "../reusible_components/DropdownList"
import { InputField } from "../reusible_components/InputField"
import { updatePartnerData } from "../../modules/api_modules/partnerAPI"

export const PartnerForm = ({className, partner, setPartner, partnerTypeText}) => {
    const [isUpdated, setIsUpdated] = useState(null)
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
        
        handlePartnerChange("partnerNumber", formatted)
    }
    const handlePartnerChange =  (field, value) => {
        console.log(partner)
        setPartner(prev => ({
            ...prev,
            [field]:value
        }))
    }
    const handlePartnerType = (value) => {
        handlePartnerChange("type", value)
    }
    const loadPartnerData = async () => {
        try {
            const response = await updatePartnerData(localStorage.getItem("token"), partner)
            setIsUpdated(response.data)
            setTimeout(()=>{setIsUpdated(null)}, 1.5 * 1000)
        } catch(e) {
            setIsUpdated(false)
        }
    }
    

    return (
            <div className={`partnerFormContainer ${className}`}>
            {isUpdated === false && <span style={{color:"red"}}>{"Возникла ошибка"}</span>}
            {partner && 
            <>
                {partnerTypeText && 
                    <div className="partnerFormContainerItem">
                        <p>Тип организации</p>
                        <DropdownList key={"accountPartnerForm0"}
                                    options={partnerTypeText && partnerTypeText}
                                    onSelect={(type, index)=>{handlePartnerType(type)}}
                                    defaultOption={partner.type}/>
                    </div>
                }

                <div className="partnerFormContainerItem">
                    <p>Наименование организации</p>
                    <InputField key={"accountPartnerForm1"}
                                inputType={"text"}
                                inputValue={partner?.partnerName ? partner.partnerName : ""}
                                inputPlaceholder={"Наименование организации"}
                                inputOnChange={(e)=>{handlePartnerChange("partnerName", e.target.value)}}/>
                </div>

                <div className="partnerFormContainerItem">
                    <p>Номер телефона</p>
                    <InputField key={"accountPartnerForm2"}
                                inputType={"text"}
                                inputValue={partner?.partnerNumber ? partner.partnerNumber : "+7"}
                                inputPlaceholder={"Номер телефона"}
                                inputOnChange={(e)=>{handleFormatPhoneNumber(e)}}/>
                </div>

                <div className="partnerFormContainerItem">
                    <p>ИНН</p>
                    <InputField key={"accountPartnerForm3"}
                                inputType={"text"}
                                inputValue={partner?.inn ? partner.inn : ""}
                                inputPlaceholder={"ИНН"}
                                inputOnChange={(e)=>{handlePartnerChange("inn", e.target.value)}}/>
                </div>

                <div className="partnerFormContainerItem">
                    <p>КПП</p>
                    <InputField key={"accountPartnerForm4"}
                                inputType={"text"}
                                inputValue={partner?.kpp ? partner.kpp : ""}
                                inputPlaceholder={"КПП"}
                                inputOnChange={(e)=>{handlePartnerChange("kpp", e.target.value)}}/>
                </div>

                <div className="partnerFormContainerItem">
                    <p>БИК Банка</p>
                    <InputField key={"accountPartnerForm5"}
                                inputType={"text"}
                                inputValue={partner?.bik ? partner.bik : ""}
                                inputPlaceholder={"БИК Банка"}
                                inputOnChange={(e)=>{handlePartnerChange("bik", e.target.value)}}/>
                </div>

                <div className="partnerFormContainerItem">
                    <p>Расчетный счет</p>
                    <InputField key={"accountPartnerForm6"}
                                inputType={"text"}
                                inputValue={partner?.rs ? partner.rs : ""}
                                inputPlaceholder={"Расчетный счет"}
                                inputOnChange={(e)=>{handlePartnerChange("rs", e.target.value)}}/>
                </div>

                <Button key={"accountPartnerForm7"}
                        buttonWidth={"100%"}
                        buttonText={isUpdated === true ? "Сохранено" : "Сохранить"}
                        buttonType={isUpdated === true ? "good" : ""}
                        buttonFunc={loadPartnerData}
                        />
                </>}
            </div>   
    )
}