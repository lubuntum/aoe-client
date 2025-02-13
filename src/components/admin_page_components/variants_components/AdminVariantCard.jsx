import { useEffect, useState } from "react"
import { SERVER_API_URL } from "../../../config"
import { deleteVariantData, updateVariantVisibility } from "../../../modules/api_modules/variantAPI"

import { setNumberFormat } from "../../../modules/number_formation_modules/setNumberFormat"

import { Button } from "../../reusible_components/Button" 
import { Loader } from "../../reusible_components/Loader"

import { ReactComponent as VisibilityOffIcon } from "../../../res/icons/visibility_off_24dp_gi.svg"
import { ReactComponent as VisibilityOnIcon } from "../../../res/icons/visibility_24dp_gi.svg"
import { ReactComponent as DeleteIcon } from "../../../res/icons/delete_24dp_gi.svg"
import { ReactComponent as ExpandIcon } from "../../../res/icons/quick_reference_all_24dp_gi.svg"
const STATUS = {
    IDLE: "IDLE",
    IS_LOADING: "IS_LOADING",
    HAS_ERROR: "HAS_ERROR",
    HAS_SUCCEED: "HAS_SUCCEED"
}
export const AdminVariantCard = ({index, variant, setVariants, downloadVariants}) => {
    const [status, setStatus] = useState(STATUS.IDLE)
    const changeVariantVisibility = async (variantId, visibility) => {
        const response = await updateVariantVisibility(variantId, visibility, localStorage.getItem("token"));
        const updatedVariant = response.data
        console.log(response.data)
        setVariants((prevVariants) => 
            prevVariants.map((variant) => 
                variant.id === updatedVariant.id ? updatedVariant : variant
            )
        )
    }

    const [imageExists, setImageExists] = useState(true)
    const imagePath = `${SERVER_API_URL}/${variant.imagePath}`
    const checkImageExist = (imagePath) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = imagePath
            img.onload = () => resolve(true)
            img.onerror = () => resolve(false)
        })
    }
    useEffect(() => {
        checkImageExist(imagePath).then(exists => {setImageExists(exists)})
    }, [imagePath])

    const handleDeleteVariant = async (variantId) => {
        try{
            const response = await deleteVariantData(variantId)
            await downloadVariants()
        } catch(err) {
            setStatus(STATUS.HAS_ERROR)
            setTimeout(()=>{
                setStatus(STATUS.IDLE)
            }, 5 * 1000)
        }
    }

    return (<>
        <div className="variantCardContainer">
            <div className="variantCardImage">
                {imageExists ? 
                    <img src={imagePath} alt=""/> :
                    <><Loader/><p>Finding Image</p></>}
            </div>

            <div className="variantCardOptionsWrapper">
                <div className="variantCardContent">
                    <div className="variantCardTitle">
                    {status === STATUS.HAS_ERROR ?
                    
                    <p>Возможно кто-то прошел вариант</p> :
                    <p><span>{setNumberFormat(index + 1)}</span> {variant.theme}</p>
                    }
                        
                    </div>
                    <div className="variantCardButtons">
                        <div className="variantCardOptionsButtons">
                            <Button buttonType={"alt"}
                                    buttonPadding={"0 20px"}
                                    buttonWidth={"100%"}
                                    buttonHeight={""}
                                    buttonIcon={<ExpandIcon className="svgIcon"/>}
                                    buttonText={"Детально"}
                                    buttonFunc={()=>{}}/>
                            {variant.isVisible ? 
                                <Button buttonType={"bad"}
                                        buttonPadding={"0 20px"}
                                        buttonWidth={"100%"}
                                        buttonHeight={""}
                                        buttonIcon={<VisibilityOffIcon className="svgIcon"/>}
                                        buttonText={"Скрыть"}
                                        buttonFunc={()=>{changeVariantVisibility(variant.id, !variant.isVisible)}}/> :
                                <Button buttonType={"good"}
                                        buttonPadding={"0 20px"}
                                        buttonWidth={"100%"}
                                        buttonHeight={""}
                                        buttonIcon={<VisibilityOnIcon className="svgIcon"/>}
                                        buttonText={"Показать"}
                                        buttonFunc={()=>{changeVariantVisibility(variant.id, !variant.isVisible)}}/>}
                        </div>
                    </div>
                </div>
                {variant.isVisible &&
                <div className="variantIsVisibleContainer">
                        <VisibilityOnIcon className="svgIcon"/>
                </div>}
                <div className="variantDeleteContainer">
                    <Button className="btn" 
                            buttonIcon={<DeleteIcon className="svgIcon"/>}
                            buttonWidth={"100%"}
                            buttonType="bad"
                            buttonFunc={()=>{handleDeleteVariant(variant.id)}}>
                    </Button>
                </div>
                
            </div>
        </div>
    </>)
}
