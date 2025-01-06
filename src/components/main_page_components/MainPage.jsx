import "../../App.css"

import { HeaderMain } from '../header_components/HeaderMain'

export const MainPage = () => {
    console.log("HOME")
    return (<>
        <div className='sectionWrapper'>
            <div className='contentWrapper'>
                <HeaderMain/>
            </div>
        </div>
    </>)
}