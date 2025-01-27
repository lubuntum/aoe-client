import { useEffect, useState } from "react"
import { Button } from "../../reusible_components/Button"
import "../css/admin_page_partners.css"

export const AdminApprovedPartners = ({partners, updatePartners}) => {
    const [approvedPartners, setApprovedPartners] = useState([])
        useEffect(()=>{
            console.log(partners)
            setApprovedPartners(partners.filter((p) => p.isApproved === true))
        }, [partners])

        const payToPartner = async (partner) => {
            if (partner.recieved === null || partner.recieved === undefined){
                console.log("Please enter some recieved sum for partner")
                return
            }
            console.log(partner.recieved)
            const response = null
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
                                    <td><input className="partner-money" type="number" step="0.01" min="0" placeholder="0.00₽" onChange={(e)=>{p.recieved = e.target.value; console.log(p)}} /></td>
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