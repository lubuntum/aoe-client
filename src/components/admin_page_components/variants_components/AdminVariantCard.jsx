import { useEffect, useState } from "react"
import { SERVER_API_URL } from "../../../config"
import { deleteVariantData, updateVariantVisibility } from "../../../modules/api_modules/variantAPI"

import { setNumberFormat } from "../../../modules/number_formation_modules/setNumberFormat"

import { Button } from "../../reusible_components/Button" 

import { ReactComponent as VisibilityOffIcon } from "../../../res/icons/visibility_off_24dp_gi.svg"
import { ReactComponent as VisibilityOnIcon } from "../../../res/icons/visibility_24dp_gi.svg"
import { ReactComponent as DeleteIcon } from "../../../res/icons/delete_24dp_gi.svg"
import { ReactComponent as EditIcon } from "../../../res/icons/edit_24dp_gi.svg"
import { useNavigate } from "react-router-dom"
import routes from "../../../routes"
const STATUS = {
    IDLE: "IDLE",
    IS_LOADING: "IS_LOADING",
    HAS_ERROR: "HAS_ERROR",
    HAS_SUCCEED: "HAS_SUCCEED"
}
export const AdminVariantCard = ({index, variant, setVariants, downloadVariants}) => {
    const [status, setStatus] = useState(STATUS.IDLE)
    const navigation = useNavigate()
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
    const navigateToEditVariant = () => {
        const param = new URLSearchParams({variantId: variant.id})
        window.open(`${routes.EDIT_VARIANT}?${param.toString()}`, "_blank")
    }

    return (<>
        <div className="variantCardContainer">
            <div className="variantCardImage">
                {imageExists ? 
                    <img src={imagePath} alt=""/> :
                    <><p>Загрузка</p><p>Finding Image</p></>}
            </div>

            <div className="variantCardOptionsWrapper">
                <div className="variantCardContent">
                    <div className="variantCardTitle">
                    {status === STATUS.HAS_ERROR ?
                        <p>Кто-то уже прошел вариант</p> :
                        <p><span>{setNumberFormat(index + 1)}</span> {variant.theme}</p>
                    }
                        
                    </div>
                    <div className="variantCardButtons">
                        <div className="variantCardOptionsButtons">
                            <Button buttonType={"alt"}
                                    buttonIcon={<EditIcon className="svgIcon"/>}
                                    buttonFunc={navigateToEditVariant}/>
                            {variant.isVisible ? 
                                <Button buttonType={"bad"}
                                        buttonIcon={<VisibilityOffIcon className="svgIcon"/>}
                                        buttonFunc={()=>{changeVariantVisibility(variant.id, !variant.isVisible)}}/> :
                                <Button buttonType={"good"}
                                        buttonIcon={<VisibilityOnIcon className="svgIcon"/>}
                                        buttonFunc={()=>{changeVariantVisibility(variant.id, !variant.isVisible)}}/>}
                            <Button buttonType={"bad"}
                                    buttonIcon={<DeleteIcon className="svgIcon"/>}
                                    buttonFunc={()=>{handleDeleteVariant(variant.id)}}/>
                        </div>
                    </div>
                </div>
                {variant.isVisible &&
                    <div className="variantIsVisibleContainer">
                        <VisibilityOnIcon className="svgIcon"/>
                    </div>}
            </div>
        </div>
    </>)
}
