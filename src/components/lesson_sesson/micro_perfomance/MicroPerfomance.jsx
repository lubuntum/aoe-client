import "./css/micro_perfomance.css"
import "./css/micro_perfomance_check.css"
import "./css/micro_perfomance_media.css"

import { MicroPerfomanceCheck } from "./MicroPerfomanceCheck"

import { PageTitle } from "../../reusible_components/PageTitle"

export const MicroPerfomance = ({setMicroCheck}) => {
    return (<>
        <div className="microCheckWrapper">
            <PageTitle pageTitleText={"Проверка микрофона"}/>
            <MicroPerfomanceCheck setMicroCheck = {setMicroCheck}/>
        </div>
    </>)
}