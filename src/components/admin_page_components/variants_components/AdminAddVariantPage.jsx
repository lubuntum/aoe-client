import "./css/admin_add_variant_page.css"

import { useCallback, useEffect, useRef, useState } from "react"
import { useAuth } from "../../../modules/auth_modules/AuthProvider"
import { validateAdmin } from "../../../modules/validation_modules/adminValidation"
import { HeaderMain } from "../../header_components/HeaderMain"
import { FooterMain } from "../../footer_components/FooterMain"
import { AdminAddVariantName } from "./AdminAddVariantName"
import { AdminAddVariantFirstTask } from "./AdminAddVariantFirstTask"
import { AdminAddVariantSecondTask } from "./AdminAddVariantSecondTask"
import { AdminAddVariantThirdTask } from "./AdminAddVariantThirdTask"
import { AdminAddVariantFourthTask } from "./AdminAddVariantFourthTask"
import { AdminAddVariantOptions } from "./AdminAddVariantOptions"
import { hasAllValues } from "../../../modules/validation_modules/hasAllValuesValidation"
import { editVariant, editVarianTasks, sendTasksForVariant, sendVariantData } from "../../../modules/api_modules/variantAPI"

export const AdminAddVariantPage = ({variant = null, loadEditedVariant = null}) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const { logout } = useAuth()

    const [variantValues, setVariantValues] = 
        useState({variantName: "", 
                  variantImg: null})

    const [firstTaskValues, setFirstTaskValues] = 
        useState({taskGuide: "",
                  taskText: ""})

    const [secondTaskValues, setSecondTaskValues] = 
        useState({taskGuide: "Study the advertisement",
                  desc: "You have 20 seconds to ask each question",
                  text: "",
                  topics: Array(4).fill(""),
                  img: null,
                  imgTitle: ""})

    const [thirdTaskValues, setThirdTaskValues] = 
        useState({taskGuide: "",
                  speaker: "",
                  speakerRecord: null,
                  questions: Array(5).fill(""),
                  questionsRecords: Array(5).fill(null)})

    const [fourthTaskValues, setFourthTaskValues] = 
        useState({taskGuide: "",
                  desc: "You will speak for not more than 3 minutes (12-15 sentences). You have to talk continuously.",
                  text: "In 2.5 minutes be ready to",
                  subTasks: Array(4).fill(""),
                  firstImg: null,
                  secondImg: null})

    useEffect(() => {
        if(variant) {
            setFirstTaskValues(variant.variantTasks.find((task) => task.taskType.type === 1).taskContent)
            setSecondTaskValues(variant.variantTasks.find((task) => task.taskType.type === 2).taskContent)
            setThirdTaskValues((prev) => ({...prev, ...variant.variantTasks.find((task) => task.taskType.type === 3).taskContent}))
            setFourthTaskValues(variant.variantTasks.find((task) => task.taskType.type === 4).taskContent)
            
            setVariantValues({variantName: variant.theme, variantImg: variant.imagePath})
        }
    }, [variant])
    
    const [currentComponent, setCurrentComponent] = useState(1)
    const [variantValidate, setVariantValidate] = useState(false)
    const [tasksValidate, setTasksValidate] = useState([false, false, false, false])
    const [status, setStatus] = useState("")

    const imagesForSendingRef = useRef({img: null, firstImg: null, secondImg: null})
    const recordsForSendingsRef = useRef({speakerRecord: null, questionsRecords: Array(5).fill(null)})
    
    useEffect(()=>{
        validate()
    },[])
    
    const validate = async () => {
        try {
            const response = await validateAdmin(localStorage.getItem("token"))
            setIsAdmin(response.data)
        } catch (e) {
            setIsAdmin(false)
            logout()
        }
    }

    const resetFields = () => {
        setVariantValues({ 
            variantName: "", 
            variantImg: null })

        setFirstTaskValues({ 
            taskGuide: "", 
            taskText: "" })

        setSecondTaskValues({
            taskGuide: "Study the advertisement",
            desc: "You have 20 seconds to ask each question",
            text: "",
            topics: Array(4).fill(""),
            img: null,
            imgTitle: ""})

        setThirdTaskValues({
            taskGuide: "",
            speaker: "",
            speakerRecord: null,
            questions: Array(5).fill(""),
            questionsRecords: Array(5).fill(null)})

        setFourthTaskValues({
            taskGuide: "",
            desc: "You will speak for not more than 3 minutes (12-15 sentences). You have to talk continuously.",
            text: "In 2.5 minutes be ready to",
            subTasks: Array(4).fill(""),
            firstImg: null,
            secondImg: null})

        setVariantValidate(false)
        setTasksValidate([false, false, false, false])
    }

    const variantValidation = useCallback(() =>{
        setVariantValidate(hasAllValues(variantValues))
    }, [variantValues])

    const tasksValidation = useCallback(() => {
        const tasksValidateTemp = [
            hasAllValues(firstTaskValues),
            hasAllValues(secondTaskValues),
            hasAllValues(thirdTaskValues),
            hasAllValues(fourthTaskValues),
        ];
        setTasksValidate(tasksValidateTemp)
    }, [firstTaskValues, secondTaskValues, thirdTaskValues, fourthTaskValues])

    useEffect(() => {
        variantValidation()
    }, [variantValidation])

    useEffect(() => {
        tasksValidation()
    }, [tasksValidation])

    const convertValuesToArray = (value) => {
        const { taskText, ...rest } = value
        return { ...rest, taskText: [value.taskText] }
    }

    const filterValuesForSending = (value) => {
        const { desc, text, ...rest } = value
        return { ...rest, taskText: [value.text, value.desc] }
    }

    const getRequestDataFromValues = () => {
        const replaceFileForSedning = (sendData, original, key) => {
            sendData[key] = original[key]
            original[key] = key
        }
        if (secondTaskValues.img instanceof File) {
            imagesForSendingRef.current.img = secondTaskValues.img
            secondTaskValues.img = "%img"
        }
        if (fourthTaskValues.firstImg instanceof File) {
            imagesForSendingRef.current.firstImg = fourthTaskValues.firstImg
            fourthTaskValues.firstImg = "%firstImg"
        }
        if (fourthTaskValues.secondImg instanceof File){
            imagesForSendingRef.current.secondImg = fourthTaskValues.secondImg
            fourthTaskValues.secondImg = "%secondImg"
        }
        if (thirdTaskValues.speakerRecord instanceof File) {
            recordsForSendingsRef.current.speakerRecord = thirdTaskValues.speakerRecord
            thirdTaskValues.speakerRecord = "%speakerRecord"
        }
        
        //console.log(imagesForSendingRef.current.img)
        //console.log(secondTaskValues.img)
        
        return [{"taskType": 1, "taskContent": JSON.stringify(convertValuesToArray(firstTaskValues))},
                {"taskType": 2, "taskContent": JSON.stringify(filterValuesForSending(secondTaskValues))},
                {"taskType": 3, "taskContent": JSON.stringify({...thirdTaskValues, 
                    questionsRecords: thirdTaskValues.questionsRecords.map((record, index) => {
                        if (record instanceof File){
                            recordsForSendingsRef.current.questionsRecords[index] = record //проверить!
                            return `%questionRecord${index}`
                        }
                        return record
                        //replaceFileForSedning(recordsForSendingsRef.current.questionsRecords[index], record)
                    })
                })},
                {"taskType": 4, "taskContent": JSON.stringify(filterValuesForSending(fourthTaskValues))}]
    }

    const createVariant = async () => {
        try {
            const response = await sendVariantData(variantValues)
            await sendTasksData(response.data)
            console.log("Variant created!")
        } catch (err) {
            console.error("Error while variant create!", err)
        }
    }
    const sendTasksData = async (variant) => {
        try {
            await sendTasksForVariant(getRequestDataFromValues(),
                                    imagesForSendingRef.current.img,
                                    imagesForSendingRef.current.firstImg,
                                    imagesForSendingRef.current.secondImg,
                                    recordsForSendingsRef.current.speakerRecord,
                                    recordsForSendingsRef.current.questionsRecords,//TODO не те файлы, строки
                                    variant.id)
            setStatus("Вариант создан!")
            resetFields()
        } catch (err) {
            setStatus("Ошибка при создании варианта!")
            console.log("Error while send tasks data!", err)
        } finally {
            setTimeout(() => {
                setStatus("")
            }, 3000)
        }
    }
    const editTasksData = async () => {
        const response = await editVarianTasks(getRequestDataFromValues(), 
                                                imagesForSendingRef.current.img, 
                                                imagesForSendingRef.current.firstImg,
                                                imagesForSendingRef.current.secondImg,
                                                recordsForSendingsRef.current.speakerRecord,
                                                recordsForSendingsRef.current.questionsRecords,//TODO не те файлы, строки
                                                variant.id)
        await loadEditedVariant(variant.id)
    }
    const editVariantData = async () => {
        try {
            await editVariant({...variantValues, id: variant.id})
            await editTasksData()
            console.log("Variant created!")
        } catch (err) {
            console.error("Error while variant create!", err)
        }
    }

    const print = () => {
        //console.log(getRequestDataFromValues())
        console.log("variant:---", variantValues)
        console.log("1:---", firstTaskValues)
        console.log("2:---", secondTaskValues)
        console.log("3:---", thirdTaskValues)
        console.log("4:---", fourthTaskValues)
        console.log(recordsForSendingsRef.current)
        //if variant is not null then there is editing process
        variant ? editVariantData() : createVariant()
        //createVariant()
    }

    const AddVariantTasksComponents = {
        1:{component: AdminAddVariantFirstTask, taskValues: firstTaskValues, onChange: setFirstTaskValues},
        2:{component: AdminAddVariantSecondTask, taskValues: secondTaskValues, onChange: setSecondTaskValues},
        3:{component: AdminAddVariantThirdTask, taskValues: thirdTaskValues, onChange: setThirdTaskValues},
        4:{component: AdminAddVariantFourthTask, taskValues: fourthTaskValues, onChange: setFourthTaskValues}
    }

    const CurrentComponent = AddVariantTasksComponents[currentComponent]

    return (<>
        {!isAdmin ? <p>Not found 404</p> : <>
        <HeaderMain/>
            <div className="sectionWrapper">
                <div className="contentWrapper">
                    <div className="addVariantWrapper">
                        <AdminAddVariantName variantValues={variantValues} onChange={setVariantValues}/>

                        <CurrentComponent.component taskValues={CurrentComponent.taskValues} onChange={CurrentComponent.onChange}/>

                        <AdminAddVariantOptions setCurrentComponent={setCurrentComponent}
                                                tasksValidate={tasksValidate}
                                                variantValidate={variantValidate} 
                                                status={status}
                                                printFunc={print}/>
                    </div>
                </div>
            </div>
        <FooterMain/>
        </>}
    </>)
}