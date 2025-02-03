import { useEffect, useState } from "react"
import { partnershipProcedure } from "../../../modules/api_modules/partnerAPI"
import { Button } from "../../reusible_components/Button"
import "../css/admin_page_partners.css"

export const AdminNotApprovedPartners = ({partners, updatePartners}) => {
    const [notApprovedPartners, setNotApprovedPartners] = useState([])
    useEffect(()=>{
        setNotApprovedPartners(partners.filter((p) => p.isApproved === false))
    }, [partners])

    const startPartnershipProcedure = async (partner, isApprovedByAdmin) => {
        try{
            partner.isApproved = isApprovedByAdmin
            const response = await partnershipProcedure(localStorage.getItem("token"), partner)
            updatePartners()
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className="table-wrapper">
        {(!notApprovedPartners || notApprovedPartners.length === 0) ? <h3 style={{textAlign:"center"}}>Нет заявок</h3> :
            <table className="table">
                <thead>
                    <tr>
                        {notApprovedPartners && 
                        (<> <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Отчество</th>
                            <th>Почта</th>
                            <th>Телефон</th>
                            <th>Тип</th>
                            <th>Дата заявки</th>
                        </> )}
                    </tr>
                </thead>
                <tbody>
                    {notApprovedPartners && 
                        notApprovedPartners.map(p => (
                            (<tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.secondName}</td>
                                <td>{p.patronymic}</td>
                                <td>{p.email}</td>
                                <td>{p.phoneNumber ? p.phoneNumber : "Не найдено"}</td>
                                <td>{p.type}</td>
                                <td>{p.registrationDate}</td>
                                <td> 
                                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-evenly"}}>
                                        <Button buttonText={"Одобрить"} buttonPadding="5px 15px" buttonType="good" buttonFunc={()=> startPartnershipProcedure(p, true)}/> 
                                        <Button buttonText={"Отказать"} buttonPadding="5px 15px" buttonType="bad" buttonFunc={()=> startPartnershipProcedure(p, false)}/>
                                    </div>
                                    
                                    </td>
                                
                            </tr>)
                        ))
                    }
                </tbody>
            </table>
        }
        </div>
    )
}