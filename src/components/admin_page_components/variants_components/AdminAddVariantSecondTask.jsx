import { Textarea } from "../../reusible_components/Textarea"
import { InputField } from "../../reusible_components/InputField"
import { InputFile } from "../../reusible_components/InputFile"
import { useState } from "react"

export const AdminAddVariantSecondTask = ({taskValues, onChange}) => {
    const handleInputChange = (name, value) => {
        onChange({
            ...taskValues,
            [name]: value
        })
    }

    const handleTopicChange = (index, value) => {
        const updatedTopics = [...taskValues.topics]
        updatedTopics[index] = value
        onChange({
            ...taskValues,
            topics: updatedTopics
        })
    }

    const handleImgChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            onChange({
                ...taskValues,
                img: file
            })
        }
    }
    /**
     * data can have only three states - null, File, path depend on variant state(create, edit etc)
     * */
    const showImageInfo = (data) => {
        return !data ? "Выберите изображение" : data.name ? data.name : data
    }
    return (
        <div className="addVariantTaskContainer">
            <div className="addVariantTaskWrapper">
                <p>Задание 2</p>
                <p>Гайд задания</p>
                <Textarea key={"addVariantTextarea2"}
                          textareaValue={taskValues.taskGuide}
                          textareaPlaceholder={"---"}
                          textareaHeight={"80px"}
                          textareaOnChange={(e)=>handleInputChange("taskGuide", e.target.value)}/>
                          
                <p>Пояснение к заданию (установлено по умолчанию)</p>
                <Textarea key={"addVariantTextarea3"}
                          textareaValue={taskValues.desc}
                          textareaPlaceholder={"---"}
                          textareaHeight={"80px"}
                          textareaOnChange={(e)=>handleInputChange("desc", e.target.value)}/>

                <p>Текст задания</p>
                <Textarea key={"addVariantTextarea4"}
                          textareaValue={taskValues.text}
                          textareaPlaceholder={"---"}
                          textareaHeight={"80px"}
                          textareaOnChange={(e)=>handleInputChange("text", e.target.value)}/>

                <div className="addVariantTopicsWrapper">
                    {taskValues.topics.map((topic, index) => (
                        <div className="addVariantTopicItem">
                            <p>{index + 1} вопрос</p>
                            <InputField key={`addVariantInput${index}`}
                                        inputType={"text"}
                                        inputValue={topic}
                                        inputPlaceholder={"---"}
                                        inputOnChange={(e)=>handleTopicChange(index, e.target.value)}/>
                        </div>
                    ))}
                </div>

                <div className="addVariantImgWrapper">
                    <p>Изображение к заданию</p>
                    <div className="addVariantImgContainer">
                        <InputFile key={"addVariantInputFile0"}
                                   inputFileName={showImageInfo(taskValues.img)}
                                   inputFileWidth={"300px"}
                                   inputFileOnChange={handleImgChange}
                                   inputFileFor={"variantSecondTaskImg"}
                                   accept={"image/*"}/>

                        <InputField key={"addVariantInput5"}
                                    inputType={"text"}
                                    inputValue={taskValues.imgTitle}
                                    inputPlaceholder={"Подпись к изобаржению"}
                                    inputOnChange={(e)=>handleInputChange("imgTitle", e.target.value)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}