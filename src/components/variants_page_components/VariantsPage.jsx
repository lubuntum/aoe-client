import './css/variants.css'

import { useEffect, useState } from 'react'

import { HeaderMain } from "../header_components/HeaderMain"
import { VariantsContent } from './VariantsContent'
import { VariantsEmpty } from "./VariantsEmpty"
import { getVisibleVariants } from "../../modules/api_modules/variantAPI"
import { FooterMain } from '../footer_components/FooterMain'

export const VariantsPage = () => {
    const [variants, setVariants] = useState(undefined);
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await getVisibleVariants();
                setVariants(response.data);
            } catch(e) {
                setVariants(null)
            }
        }
        fetchData()
    }, [])
    const variantsLength = Array.isArray(variants) ? variants.length : 0

    return (<>
        <HeaderMain/>
        <div className='sectionWrapper'>
            <div className='contentWrapper'>
                <div className='variantsWrapper'>
                    {variantsLength ? 
                        <VariantsContent variants={variants}/> :
                        <VariantsEmpty/>
                    }
                </div>
            </div>
        </div>
        <FooterMain/>
    </>)
}