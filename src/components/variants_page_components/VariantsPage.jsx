import './css/variants.css'
import "./css/variants_media.css"

import { useEffect, useState } from 'react'

import { HeaderMain } from "../header_components/HeaderMain"
import { VariantsContent } from './VariantsContent'
import { VariantsEmpty } from "./VariantsEmpty"
import { getAvailableVariants, getAvailableVariantsByPage, getVisibleVariants } from "../../modules/api_modules/variantAPI"
import { FooterMain } from '../footer_components/FooterMain'
import { useAuth } from '../../modules/auth_modules/AuthProvider'
import { checkSubscription } from '../../modules/api_modules/subscriptionAPI'

export const VariantsPage = () => {
    const [variants, setVariants] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(0)
    const [isSub, setIsSub] = useState(false)
    const {isAuth} = useAuth()
    
    useEffect(()=>{
        const fetchData = async () => {
            try {
                //const response = await getAvailableVariants(localStorage.getItem("token") ? localStorage.getItem("token") : "unAuth")
                const response = await getAvailableVariantsByPage(currentPage, 9)
                const token = localStorage.getItem("token")
                if (token){
                    const isSubResponse = await checkSubscription(token ? token : "unAuth")
                    setIsSub(isSubResponse?.data ? isSubResponse.data : false)
                }
                else setIsSub(false)
                response.data.content = response.data.content.sort((a,b)=>{
                    console.log(a)
                    if (a.theme.toLowerCase() < b.theme.toLowerCase()) return -1
                    if (a.theme.toLowerCase() > b.theme.toLowerCase()) return 1
                    return 0
                })
                setVariants(response.data)
            } catch(e) {
                setVariants(null)
            }
        }
        fetchData()
    }, [currentPage])

    return (<>
        <HeaderMain/>
        <div className='sectionWrapper'>
            <div className='contentWrapper'>
                <div className='variantsWrapper'>
                    {variants ? 
                        <VariantsContent variants={variants} setCurrentPage={setCurrentPage} isSub={isSub}/> :
                        <VariantsEmpty/>
                    }
                </div>
            </div>
        </div>
        <FooterMain/>
    </>)
}