import { Textarea } from "../../reusible_components/Textarea"

export const AdminAddVariantFirstTask = ({taskValues, onChange}) => {
    const handleInputChange = (name, value) => {
        onChange({
            ...taskValues,
            [name]: value
        })
    }

    return (
        <div className="addVariantTaskContainer">
            <div className="addVariantTaskWrapper">
                <p>Задание 1</p>
                <p>Гайд задания</p>
                <Textarea key={"addVariantTextarea0"}
                          textareaValue={taskValues.taskGuide}
                          textareaPlaceholder={"---"}
                          textareaHeight={"80px"}
                          textareaOnChange={(e) => handleInputChange("taskGuide", e.target.value)}/>
                          
                <p>Текст задания</p>
                <Textarea key={"addVariantTextarea1"}
                          textareaValue={taskValues.taskText}
                          textareaPlaceholder={"---"}
                          textareaHeight={"300px"}
                          textareaOnChange={(e) => handleInputChange("taskText", e.target.value)}/>
            </div>
        </div>
    )
}