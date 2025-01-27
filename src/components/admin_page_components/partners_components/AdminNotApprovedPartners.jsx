import { useEffect, useState } from "react"
import { partnershipProcedure } from "../../../modules/api_modules/partnerAPI"
import { Button } from "../../reusible_components/Button"

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
        <>
        {(!notApprovedPartners || notApprovedPartners.length === 0) ? <h3 style={{textAlign:"center"}}>Нет заявок</h3> :
            <table>
                <thead>
                    <tr>
                        {notApprovedPartners && 
                        (<> <th style={{textAlign:"start"}}>Имя</th>
                            <th style={{textAlign:"start"}}>Фамилия</th>
                            <th style={{textAlign:"start"}}>Почта</th>
                            <th style={{textAlign:"start"}}>Телефон</th>
                            <th style={{textAlign:"start"}}>Тип</th>
                            <th style={{textAlign:"start"}}>Дата заявки</th>
                        </> )}
                    </tr>
                </thead>
                <tbody>
                    {notApprovedPartners && 
                        notApprovedPartners.map(p => (
                            (<tr key={p.id}>
                                <td style={{padding:"15px 0px"}}>{p.name}</td>
                                <td style={{padding:"15px 0px"}}>{p.secondName}</td>
                                <td style={{padding:"15px 0px"}}>{p.email}</td>
                                <td style={{padding:"15px 0px"}}>{p.phoneNumber ? p.phoneNumber : "Не найдено"}</td>
                                <td style={{padding:"15px 0px"}}>{p.type}</td>
                                <td style={{padding:"15px 0px"}}>{p.registrationDate}</td>
                                <td style={{padding:"15px 0px"}}> 
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
        </>
    )
}