import { Button } from "../../reusible_components/Button"

export const AdminAddVariantOptions = ({setCurrentComponent, printFunc, tasksValidate, variantValidate, status}) => {
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
                    {status}
                </div>
                {(variantValidate && allTaskValid) ? 
                <Button key={"addVariantOptionsButton4"}
                        buttonText={"Добавить"}
                        buttonPadding={"0 20px"}
                        buttonWidth={"150px"}
                        buttonFunc={printFunc}/> : 
                <Button key={"addVariantOptionsButton5"}
                        buttonType={"block"}
                        buttonText={"Добавить"}
                        buttonPadding={"0 20px"}
                        buttonWidth={"150px"}/>}
            </div>
        </div>
    )
}