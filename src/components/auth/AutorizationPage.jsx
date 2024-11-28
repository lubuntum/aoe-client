import { Login } from "./Login"
import { Registration } from "./Registration"
import { AutorizationBanner } from "./AutorizationBanner"
import { Error } from "./Error"

export const AutorizationPage = () => {
    return (<>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="autorizationWrapper">
                    <AutorizationBanner/>
                    <Registration/>
                    <Login/>
                </div>
                <Error/>
            </div>
        </div>
    </>)
}