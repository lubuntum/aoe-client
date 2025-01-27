import { useEffect, useState } from "react"
import { Button } from "../../reusible_components/Button"

export const AdminApprovedPartners = ({partners, updatePartners}) => {
    const [approvedPartners, setApprovedPartners] = useState([])
        useEffect(()=>{
            console.log(partners)
            setApprovedPartners(partners.filter((p) => p.isApproved === true))
        }, [partners])

        return (
            <>
            {(!approvedPartners || approvedPartners.length === 0) ? <p style={{textAlign:"center"}}>Нет партнеров</p> :
                <table>
                    <thead>
                        <tr>
                            <> 
                                <th style={{textAlign:"start"}}>Партнер</th>
                                <th style={{textAlign:"start"}}>Имя</th>
                                <th style={{textAlign:"start"}}>Фамилия</th>
                                <th style={{textAlign:"start"}}>Почта</th>
                                <th style={{textAlign:"start"}}>Номер</th>
                                <th style={{textAlign:"start"}}>Тип</th>
                                <th style={{textAlign:"start"}}>Выручка партнера</th>
                            </> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            approvedPartners.map(p => (
                                (<tr key={p.id}>
                                    <td style={{padding:"15px 0px"}}>{p.partnerName ? p.partnerName : "Не найдено" }</td>
                                    <td style={{padding:"15px 0px"}}>{p.name}</td>
                                    <td style={{padding:"15px 0px"}}>{p.secondName}</td>
                                    <td style={{padding:"15px 0px"}}>{p.email}</td>
                                    <td style={{padding:"15px 0px"}}>{p.phoneNumber ? p.phoneNumber : "Не найдено" }</td>
                                    <td style={{padding:"15px 0px"}}>{p.type}</td>
                                    <td style={{padding:"15px 0px"}}>{`${p.revenue}₽`}</td>
                                    <td style={{padding:"15px 0px"}}>{p.revenue > 0 ? 
                                        <Button buttonText={"Оплатить"} buttonPadding="5px 15px" buttonType="good"/> : 
                                        <Button buttonText={"Оплачено"} buttonPadding="5px 15px" buttonType="block"/>}</td>
                                </tr>)
                            ))
                        }
                    </tbody>
                </table>
            
                }
            </>
        )
}