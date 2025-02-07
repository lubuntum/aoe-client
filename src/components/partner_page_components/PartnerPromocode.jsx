import { Button } from "../reusible_components/Button"

import { ReactComponent as CopyIcon } from "../../res/icons/content_copy_24dp_gi.svg"
import { useState } from "react"

export const PartnerPromocode = ({className}) => {
    const [promocode, setPromocode] = useState("TME_ADAQDA21CZ")

    const handleCopyClick = () => {
        navigator.clipboard.writeText(promocode).then(() => {
            console.log("Copied!")
        }).catch(err => {
            console.error("Failed to copy", err)
        })
    }

    return (
        <div className={`partnerPromocodeContainer ${className}`}>
            <div className="partnerPromocodeScroll">
                <div className="partnerPromocodeContainerItem">
                    <div className="promocodeName">
                        <Button key={"promocodeButton0"}
                                buttonText={promocode}
                                buttonType={"link"}
                                buttonIcon={<CopyIcon className="svgIcon"/>}
                                buttonWidth={"100%"}
                                buttonHeight={"100%"}
                                isCopyButton={true}
                                buttonFunc={handleCopyClick}/>
                        
                    </div>
                    <div className="promocodeDetails">
                        <p>Программа №1</p>
                        <p>Процент от проверок: <span>10%</span></p>
                        <p>Скидка пользователям: <span>0%</span></p>
                        <p>Дата создания: 03.02.2025</p>
                    </div>
                    <div className="promocodeSum">
                        <p>Итог ₽: <span>62532.26</span></p>
                    </div>
                </div>

                <div className="partnerPromocodeContainerItem">
                    <div className="promocodeName">
                        <Button key={"promocodeButton0"}
                                buttonText={promocode}
                                buttonType={"link"}
                                buttonIcon={<CopyIcon className="svgIcon"/>}
                                buttonWidth={"100%"}
                                buttonHeight={"100%"}
                                isCopyButton={true}
                                buttonFunc={handleCopyClick}/>
                        
                    </div>
                    <div className="promocodeDetails">
                        <p>Программа №1</p>
                        <p>Процент от проверок: <span>10%</span></p>
                        <p>Скидка пользователям: <span>0%</span></p>
                        <p>Дата создания: 03.02.2025</p>
                    </div>
                    <div className="promocodeSum">
                        <p>Итог ₽: <span>62532.26</span></p>
                    </div>
                </div>

                <div className="partnerPromocodeContainerItem">
                    <div className="promocodeName">
                        <Button key={"promocodeButton0"}
                                buttonText={promocode}
                                buttonType={"link"}
                                buttonIcon={<CopyIcon className="svgIcon"/>}
                                buttonWidth={"100%"}
                                buttonHeight={"100%"}
                                isCopyButton={true}
                                buttonFunc={handleCopyClick}/>
                        
                    </div>
                    <div className="promocodeDetails">
                        <p>Программа №1</p>
                        <p>Процент от проверок: <span>10%</span></p>
                        <p>Скидка пользователям: <span>0%</span></p>
                        <p>Дата создания: 03.02.2025</p>
                    </div>
                    <div className="promocodeSum">
                        <p>Итог ₽: <span>62532.26</span></p>
                    </div>
                </div>

                <div className="partnerPromocodeContainerItem">
                    <div className="promocodeName">
                        <Button key={"promocodeButton0"}
                                buttonText={promocode}
                                buttonType={"link"}
                                buttonIcon={<CopyIcon className="svgIcon"/>}
                                buttonWidth={"100%"}
                                buttonHeight={"100%"}
                                isCopyButton={true}
                                buttonFunc={handleCopyClick}/>
                        
                    </div>
                    <div className="promocodeDetails">
                        <p>Программа №1</p>
                        <p>Процент от проверок: <span>10%</span></p>
                        <p>Скидка пользователям: <span>0%</span></p>
                        <p>Дата создания: 03.02.2025</p>
                    </div>
                    <div className="promocodeSum">
                        <p>Итог ₽: <span>62532.26</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}