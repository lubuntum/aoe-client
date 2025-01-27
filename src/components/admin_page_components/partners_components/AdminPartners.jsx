import { useEffect, useState } from "react"
import { getAllPartners } from "../../../modules/api_modules/partnerAPI"
import { AdminNotApprovedPartners } from "./AdminNotApprovedPartners"
import { AdminApprovedPartners } from "./AdminApprovedPartners"

export const AdminPartners = () => {
    const [partners, setPartners] = useState([])
    useEffect(()=>{
        downloadAllPartners()
    }, [])
    const downloadAllPartners = async () => {
        const response = await getAllPartners(localStorage.getItem("token"))
        setPartners(response.data)
    }
    return (<>
        <AdminNotApprovedPartners partners={partners} updatePartners = {downloadAllPartners} />
        <AdminApprovedPartners partners={partners} updatePartners = {downloadAllPartners} />
    </>)
}