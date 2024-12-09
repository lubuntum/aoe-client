import '../App.css'

import { Header } from './header/Header';

const HomePage = () => {
    console.log("HOME")
    return (<>
        <div className='sectionWrapper'>
            <div className='contentWrapper'>
                <Header/>
            </div>
        </div>
    </>)
}

export default HomePage