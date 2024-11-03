import '../css/micro_perfomance.css'
import '../css/micro_perfomance_check.css'
import '../css/micro_perfomance_media.css'

import { MicroPerfomanceTitle } from './MicroPerfomanceTitle'
import { MicroPerfomanceCheck } from "./MicroPerfomanceCheck"

export const MicroPerfomance = () => {
    return (<>
        <div className="microCheckWrapper">
            <MicroPerfomanceTitle/>
            <MicroPerfomanceCheck/>
        </div>
    </>)
}