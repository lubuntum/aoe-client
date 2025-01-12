import "../../App.css"

import { HeaderMain } from '../header_components/HeaderMain'

export const MainPage = () => {
    return (<>
        <div className='sectionWrapper'>
            <div className='contentWrapper'>
                <HeaderMain/>
            </div>
        </div>
    </>)
}