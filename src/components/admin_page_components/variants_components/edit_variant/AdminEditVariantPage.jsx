import { useEffect, useRef, useState } from "react"
import { getVariantById } from "../../../../modules/api_modules/variantAPI"
import { AdminAddVariantPage } from "../AdminAddVariantPage"
const variantEditStatuses = {
    IDLE:"IDLE",
    READY: "READY",
}
export const AdminEditVariantPage = () => {
    const [status, setStatus] = useState(variantEditStatuses.IDLE)
    const [variant, setVariant] = useState(null)
    useEffect(()=>{
        const param = new URLSearchParams(window.location.search)
        getVariantByIdForEdit(param.get("variantId"))
    }, [])
    const getVariantByIdForEdit = async (variantId) => {
        try {
            const response = await getVariantById(variantId)
            setVariant(response.data)
            console.log(response.data)
            //console.log(variantRef.current.variantTasks)
        } catch(e) {
            console.log(e)
        }
    }
    useEffect(()=>{
        convertVariantForEditing()
        setStatus(variantEditStatuses.READY)
    }, [variant])
    /**К сожалению из за неправильной обработки JSON файлов и их структуры
     * нужны подобные конвертеры
     * 1. В задаче с типом 1 taskText храниться как массив но при добавлении он храниться как строка...
     * 2. В задаче с типом 2 и 4, поля описания и текста задания хранятся массивом, но при добавлении как text, desc
     * Именно эти факторы правит функция ниже
     * При отправке используется обратный процесс
     */
    const convertVariantForEditing = () => {
        if (variant == null) return
        convertFirstTaskForEditing(findTaskByType(1))
        extractValuesFromTaskText(findTaskByType(2))
        extractValuesFromTaskText(findTaskByType(4))
    }
    const convertFirstTaskForEditing = (task) => {
        task.taskContent.taskText = task.taskContent.taskText[0]
    }
    const extractValuesFromTaskText = (task) => {
        task.taskContent.text = task.taskContent.taskText[0]
        task.taskContent.desc = task.taskContent.taskText[1]
    }
    const findTaskByType = (type) => {
        return variant.variantTasks.find((task) => task.taskType.type === type)
    }

    return (<>
        {status === variantEditStatuses.IDLE && <p>Загрузка</p>}
        {status === variantEditStatuses.READY && <AdminAddVariantPage variant={variant} loadEditedVariant={getVariantByIdForEdit}/>}
    </>)
}