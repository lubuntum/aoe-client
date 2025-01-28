import { useEffect, useState } from "react"
import { Button } from "../../reusible_components/Button"
import "../css/admin_page_partners.css"
import { payToPartnerAmount } from "../../../modules/api_modules/partnerAPI"
import { checkMoneyFormat } from "../../utils/moneyFormat"

export const AdminApprovedPartners = ({partners, updatePartners}) => {
    const [approvedPartners, setApprovedPartners] = useState([])
    const [inputValues, setInputValues] = useState({})
        useEffect(()=>{
            const approved = partners.filter((p) => p.isApproved === true)
            setApprovedPartners(approved)

            const initialInputValues = {}
            approved.forEach(p => {
                initialInputValues[p.id] = ''
            })
            setInputValues(initialInputValues)
        }, [partners])

        const handleInputChange = (id, value) => {
            setInputValues(prev => ({
                ...prev,
                [id]: value
            }))
        }

        const payToPartner = async (partner) => {
            if (inputValues[partner.id] === null || inputValues[partner.id] === undefined){
                console.log("Please enter some amount sum for partner")
                return
            }
            if (!checkMoneyFormat(inputValues[partner.id])) {
                console.log("Wrong money format")
                return 
            }
            try{
                const response = await payToPartnerAmount(localStorage.getItem("token"), partner.id, inputValues[partner.id])
                await updatePartners()
                setInputValues(prev => ({
                    ...prev,
                    [partner.id]: ''
                }))
            } catch(e) {
                console.log(e)
            }
        }


        return (
            <div className="table-wrapper">
            {(!approvedPartners || approvedPartners.length === 0) ? <p style={{textAlign:"center"}}>Нет партнеров</p> :
                <table className="table">
                    <thead>
                        <tr>
                            <> 
                                <th>Организция</th>
                                <th>Имя</th>
                                <th>Фамилия</th>
                                <th>Почта</th>
                                <th>Номер</th>
                                <th>Тип</th>
                                <th>ИНН</th>
                                <th>БИК</th>
                                <th>Корр. счет</th>
                                <th>Расчетный счет</th>
                                <th>Начислить</th>
                                <th>Выручка партнера</th>
                            </> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            approvedPartners.map(p => (
                                (<tr key={p.id}>
                                    <td>{p.partnerName ? p.partnerName : "Не найдено" }</td>
                                    <td>{p.name}</td>
                                    <td>{p.secondName}</td>
                                    <td>{p.email}</td>
                                    <td>{p.phoneNumber ? p.phoneNumber : "Не найдено" }</td>
                                    <td>{p.type}</td>
                                    <td>{p.INN ? p.INN : "Не найдено"}</td>
                                    <td>{p.BIK ? p.BIK : "Не найдено"}</td>
                                    <td>{p.KPP ? p.KPP : "Не найдено"}</td>
                                    <td>{p.RS ? p.RS : "Не найдено"}</td>
                                    <td><input className="partner-money" type="number" step="0.01" min="0" placeholder="0.00₽" 
                                        value={inputValues[p.id] || ''} onChange={(e)=>{handleInputChange(p.id, e.target.value)}} disabled = {p.revenue <= 0} /></td>
                                    <td>{`${p.revenue}₽`}</td>
                                    <td>{p.revenue > 0 ? 
                                        <Button buttonText={"Оплатить"} buttonPadding="5px 15px" buttonType="good" buttonFunc={()=>{payToPartner(p)}}/> : 
                                        <Button buttonText={"Оплачено"} buttonPadding="5px 15px" buttonType="block"/>}</td>
                                </tr>)
                            ))
                        }
                    </tbody>
                </table>
            
                }
            </div>
        )
}