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
import { sendTasksForVariant, sendVariantData } from "../../../modules/api_modules/variantAPI"

export const AdminAddVariantPage = () => {
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
        imagesForSendingRef.current.img = secondTaskValues.img
        secondTaskValues.img = "%img"
        imagesForSendingRef.current.firstImg = fourthTaskValues.firstImg
        fourthTaskValues.firstImg = "%firstImg"
        imagesForSendingRef.current.secondImg = fourthTaskValues.secondImg
        fourthTaskValues.secondImg = "%secondImg"
        recordsForSendingsRef.current.speakerRecord = thirdTaskValues.speakerRecord
        thirdTaskValues.speakerRecord = "%speakerRecord"
        //console.log(imagesForSendingRef.current.img)
        //console.log(secondTaskValues.img)
        
        return [{"taskType": 1, "taskContent": JSON.stringify(convertValuesToArray(firstTaskValues))},
                {"taskType": 2, "taskContent": JSON.stringify(filterValuesForSending(secondTaskValues))},
                {"taskType": 3, "taskContent": JSON.stringify({...thirdTaskValues, 
                    questionsRecords: thirdTaskValues.questionsRecords.map((record, index) => {
                        recordsForSendingsRef.current.questionsRecords[index] = record //проверить!
                        return `%questionRecord${index}`
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

    const print = () => {
        //console.log(getRequestDataFromValues())
        console.log("variant:---", variantValues)
        console.log("1:---", firstTaskValues)
        console.log("2:---", secondTaskValues)
        console.log("3:---", thirdTaskValues)
        console.log("4:---", fourthTaskValues)
        createVariant()
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