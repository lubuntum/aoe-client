import { Textarea } from "../../reusible_components/Textarea"
import { InputField } from "../../reusible_components/InputField"
import { InputFile } from "../../reusible_components/InputFile"

export const AdminAddVariantThirdTask = ({taskValues, onChange}) => {
    const handleInputChange = (name, value) => {
        onChange({
            ...taskValues,
            [name]: value
        })
    }

    const handleQuestionChange = (index, value) => {
        const updatedQuestion = [...taskValues.questions]
        updatedQuestion[index] = value
        onChange({
            ...taskValues,
            questions: updatedQuestion
        })
    }

    const handleSpeakerChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            onChange({
                ...taskValues,
                speakerAudio: file
            })
        }
    }

    const handleAudioChange = (index, value) => {
        const updatedAudioFiles = [...taskValues.audio]
        updatedAudioFiles[index] = value
        onChange({
            ...taskValues,
            audio: updatedAudioFiles
        })
    }

    return (
        <div className="addVariantTaskContainer">
            <div className="addVariantTaskWrapper">
                <p>Задание 3</p>
                <p>Гайд задания</p>
                <Textarea key={"addVariantTextarea5"}
                          textareaValue={taskValues.taskGuide}
                          textareaPlaceholder={"---"}
                          textareaHeight={"80px"}
                          textareaOnChange={(e)=>handleInputChange("taskGuide", e.target.value)}/>

                <p>Текст задания (Для спикера)</p>
                <Textarea key={"addVariantTextarea6"}
                          textareaValue={taskValues.speaker}
                          textareaPlaceholder={"---"}
                          textareaHeight={"80px"}
                          textareaOnChange={(e)=>handleInputChange("speaker", e.target.value)}/>
                          
                <InputFile inputFileName={taskValues.speakerAudio ? taskValues.speakerAudio.name : "Выберите файл озвучки"}
                           inputFileWidth={"300px"}
                           inputFileOnChange={handleSpeakerChange}
                           inputFileFor={"variantThirdTaskAudio0"}/>

                <div className="addVariantQuestionWrapper">
                    {taskValues.questions.map((question, index) => (
                        <div className="addVariantQuestionItem">
                            <p>{index + 1} вопрос (Для спикера)</p>
                            <div className="addVariantQuestionContainer">
                                <InputField key={`addVariantInput${index + 6}`}
                                            inputType={"text"}
                                            inputValue={question}
                                            inputPlaceholder={"---"}
                                            inputOnChange={(e)=>handleQuestionChange(index, e.target.value)}/>

                                <InputFile inputFileName={taskValues.audio[index] ? taskValues.audio[index].name : "Выберите файл озвучки"}
                                           inputFileWidth={"300px"}
                                           inputFileOnChange={(e) => handleAudioChange(index, e.target.files[0])}
                                           inputFileFor={`variantThirdTaskAudio${index + 1}`}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}