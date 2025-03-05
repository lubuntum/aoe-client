import { Textarea } from "../../reusible_components/Textarea"
import { InputField } from "../../reusible_components/InputField"
import { InputFile } from "../../reusible_components/InputFile"

export const AdminAddVariantFourthTask = ({taskValues, onChange}) => {
    const handleInputChange = (name, value) => {
        onChange({
            ...taskValues,
            [name]: value
        })
    }

    const handleSubTasksChange = (index, value) => {
        const updatedSubTasks = [...taskValues.subTasks]
        updatedSubTasks[index] = value
        onChange({
            ...taskValues,
            subTasks: updatedSubTasks
        })
    }

    const handleFirstImgChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            onChange({
                ...taskValues,
                firstImg: file
            })
        }
    }

    const handleSecondImgChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            onChange({
                ...taskValues,
                secondImg: file
            })
        }
    }
    const showImageInfo = (data) => {
        return !data ? "Выберите изображение" : data.name ? data.name : data
    }
    return (
        <div className="addVariantTaskContainer">
            <div className="addVariantTaskWrapper">
                <p>Задание 4</p>
                <p>Гайд задания</p>
                <Textarea key={"addVariantTextarea7"}
                          textareaValue={taskValues.taskGuide}
                          textareaPlaceholder={"---"}
                          textareaHeight={"80px"}
                          textareaOnChange={(e)=>handleInputChange("taskGuide", e.target.value)}/>

                <p>Пояснение к заданию (установлено по умолчанию)</p>
                <Textarea key={"addVariantTextarea8"}
                          textareaValue={taskValues.desc}
                          textareaPlaceholder={"---"}
                          textareaHeight={"80px"}
                          textareaOnChange={(e)=>handleInputChange("desc", e.target.value)}/>

                <p>Текст задания (установлено по умолчанию)</p>
                <Textarea key={"addVariantTextarea9"}
                          textareaValue={taskValues.text}
                          textareaPlaceholder={"---"}
                          textareaHeight={"80px"}
                          textareaOnChange={(e)=>handleInputChange("text", e.target.value)}/>

                <div className="addVariantQuestionWrapper">
                    {taskValues.subTasks.map((subTask, index) => (
                        <div className="addVariantQuestionItem">
                            <p>{index + 1} вопрос</p>
                            <InputField key={`addVariantInput${index + 11}`}
                                        inputType={"text"}
                                        inputValue={subTask}
                                        inputPlaceholder={"---"}
                                        inputOnChange={(e)=>handleSubTasksChange(index, e.target.value)}/>
                        </div>
                    ))}

                </div>

                <div className="addVariantImgWrapper">
                    <p>Изображения к заданию</p>
                    <div className="addVariantImgContainer">
                        <InputFile inputFileName={showImageInfo(taskValues.firstImg)}
                                   inputFileWidth={"320px"}
                                   inputFileOnChange={handleFirstImgChange}
                                   inputFileFor={"variantFourthTaskFirstimg"}
                                   accept={"image/*"}/>

                        <InputFile inputFileName={showImageInfo(taskValues.secondImg)}
                                   inputFileWidth={"320px"}
                                   inputFileOnChange={handleSecondImgChange}
                                   inputFileFor={"variantFourthTaskSecondimg"}
                                   accept={"image/*"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}