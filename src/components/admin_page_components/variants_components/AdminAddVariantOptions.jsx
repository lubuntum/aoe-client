import { Button } from "../../reusible_components/Button"

export const AdminAddVariantOptions = ({setCurrentComponent, sendData, tasksValidate, variantValidate, status, variant = null}) => {
    const allTaskValid = tasksValidate.every(value => value === true)

    return (
        <div className="addVariantOptionContainer">
            <div className="addVariantOptionsSwitch">
                {Array.from({length: 4}, (_, index) => (
                    <Button key={`addVariantOptionsButton${index}`}
                            buttonType={`${tasksValidate[index] ? "good" : ""}`}
                            buttonText={`Задание ${index + 1}`}
                            buttonPadding={"0 20px"}
                            buttonWidth={"150px"}
                            buttonFunc={()=>{setCurrentComponent(index + 1)}}/>
                ))}
            </div>
            <div className="addVariantOptionsComplete">
                <div className="addVariantOptionsStatus">
                    {status && status}
                </div>
                {(variantValidate && allTaskValid) ? 
                <Button key={"addVariantOptionsButton4"}
                        buttonText={`${variant ? "Изменить" : "Добавить"}`}
                        buttonPadding={"0 20px"}
                        buttonWidth={"150px"}
                        buttonFunc={sendData}/> : 
                <Button key={"addVariantOptionsButton5"}
                        buttonType={"block"}
                        buttonText={`${variant ? "Изменить" : "Добавить"}`}
                        buttonPadding={"0 20px"}
                        buttonWidth={"150px"}/>}
            </div>
        </div>
    )
}