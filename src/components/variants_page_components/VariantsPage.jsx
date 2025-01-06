import './css/variants_page.css'
import './css/variants_content.css'
import './css/variant_card.css'

import { useEffect, useState } from 'react'

import { HeaderMain } from "../header_components/HeaderMain"
import { VariantsContent } from './VariantsContent'
import { getVisibleVariants } from "../../modules/api_modules/variantAPI"

export const VariantsPage = () => {
    const [variants, setVariants] = useState(undefined);
    useEffect(()=>{
        const fetchData = async () => {
            const response = await getVisibleVariants();
            setVariants(response.data);
        }
        fetchData()
    },[])

    return (<>
        <div className='sectionWrapper'>
            <div className='contentWrapper'>
                <div className='tasksWrapper'>
                    <HeaderMain/>
                    <VariantsContent variants={variants}/>
                </div>
            </div>
        </div>

    </>)
}