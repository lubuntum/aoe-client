import { useEffect, useRef, useState } from "react"
import { getVariantById } from "../../../../modules/api_modules/variantAPI"

export const AdminEditVariantPage = () => {
    const [status, setStatus] = useState()
    const variantIdRef = useRef()
    useEffect(()=>{
        const param = new URLSearchParams(window.location.search)
        variantIdRef.current = param.get("variantId")
        getVariantByIdForEdit()
    }, [])
    const getVariantByIdForEdit = async () => {
        try {
            const response = await getVariantById(variantIdRef.current)
            console.log(response.data)
        } catch(e) {
            console.log(e)
        }
    }
    return (<>
        <p>Edit variant</p>
    </>)
}