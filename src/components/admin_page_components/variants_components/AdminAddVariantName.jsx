import { useState } from "react"
import { InputField } from "../../reusible_components/InputField"
import { InputFile } from "../../reusible_components/InputFile"

export const AdminAddVariantName = ({variantValues, onChange}) => {
    const handleInputChange = (name, value) => {
        onChange({
            ...variantValues,
            [name]: value
        })
    }

    const handleImgChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            onChange({
                ...variantValues,
                variantImg: file
            })
        }
    }

    return (
        <div className="addVariantNameContainer">
            <p>Наименование и изображение для варианта</p>
            <div className="addVariantNameWrapper">
                <InputField key={"addVariantInput0"}
                            inputType={"text"}
                            inputValue={variantValues.variantName}
                            inputPlaceholder={"Наименование варианта"}
                            inputOnChange={(e)=>handleInputChange("variantName", e.target.value)}/>

                <InputFile key={"addVariantInputFile0"}
                           inputFileName={variantValues.variantImg ? variantValues.variantImg.name : "Выберите изображение"}
                           inputFileWidth={"300px"}
                           inputFileOnChange={handleImgChange}
                           inputFileFor={"variantImg"}/>
            </div>
        </div>
    )
}