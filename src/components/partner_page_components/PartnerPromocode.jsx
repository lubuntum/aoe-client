import { Button } from "../reusible_components/Button"

import { ReactComponent as CopyIcon } from "../../res/icons/content_copy_24dp_gi.svg"
import { useState } from "react"

export const PartnerPromocode = ({className, partner}) => {

    const handleCopyClick = (promocode) => {
        navigator.clipboard.writeText(promocode).then(() => {
            console.log("Copied!")
        }).catch(err => {
            console.error("Failed to copy", err)
        })
    }

    return (
        <div className={`partnerPromocodeContainer ${className}`}>
            <div className="partnerPromocodeScroll">
                {(partner && partner.partnerships) && partner.partnerships.map(p => (
                    <div className="partnerPromocodeContainerItem">
                    <div className="promocodeName">
                        <Button key={"promocodeButton0"}
                                buttonText={p.promocode}
                                buttonType={"link"}
                                buttonIcon={<CopyIcon className="svgIcon"/>}
                                buttonWidth={"100%"}
                                buttonHeight={"100%"}
                                isCopyButton={true}
                                buttonFunc={()=>{handleCopyClick(p.promocode)}}/>
                        
                    </div>
                    <div className="promocodeDetails">
                        <p>Программа №1</p>
                        <p>Процент от проверок: <span>{(p.partnerRate*100).toFixed(0)}%</span></p>
                        <p>Скидка пользователям: <span>{(p.discount*100).toFixed(0)}%</span></p>
                        <p>Дата создания: {p.contractDate}</p>
                    </div>
                    <div className="promocodeSum">
                        <p>Итог ₽: <span>{partner.revenue}</span></p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}