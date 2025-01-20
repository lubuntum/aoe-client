import React from "react"

import { PageTitle } from "../../reusible_components/PageTitle"

export const MainPartnerSection = React.memo(() => {
    return (
        <div className="contentWrapper">
            <div className='partnersWrapper'>
                <PageTitle pageTitleText={"Наши #партнеры#"}/>
            </div>
        </div>
    )
})