import { useEffect, useRef, useState } from "react"

import { AdminPopupName } from "./AdminPopupName"
import { AdminPopupFirstTask } from "./AdminPopupFirstTask"
import { AdminPopupSecondTask } from "./AdminPopupSecondTask"
import { AdminPopupThirdTask } from "./AdminPopupThirdTask"
import { AdminPopupFourthTask } from "./AdminPopupFourthTask"
import { AdminPopupChangeTask } from "./AdminPopupChangeTask"
import { sendTasksForVariant, sendVariantData } from "../../../../modules/api/variant/VariantApi"

import { hasAllValues } from "../../../../modules/validate/hasAllValues.js"

export const AdminPopupAddVariant = ({setShowPopup}) => {
    //Popup компонент
    const [currentPopupComponent, setCurrentPopupComponent] = useState(1)

    const [status, setStatus] = useState("")
    const [statusColor, setStatusColor] = useState("")

    const [variantValidate, setVariantValidate] = useState(false)
    const [taskValidate, setTaskValidate] = useState([false, false, false, false])

    //Структура варинта
    const [variantValues, setVariantValues] = 
        useState({variantName: "", 
                  variantImg : null})
    
    //Структура первого таска
    const [firstTaskValues, setFirstTaskValues] = 
        useState({taskGuide: "", 
                  taskText: ""})

    //Структура второго таска
    const [secondTaskValues, setSecondTaskValues] = 
        useState({taskGuide: "Study the advertisement", 
                  description: "You have 20 seconds to ask each question", 
                  text: "",
                  topics: Array(4).fill(""), 
                  img: null,
                  imgTitle: ""})

    //Структура третьего таска
    const [thirdTaskValues, setThirdTaskValues] = 
        useState({taskGuide: "", 
                  speaker: Array(1).fill(""), 
                  questions: Array(5).fill("")})

    //Структура четвертого таска
    const [fourthTaskValues, setFourthTaskValues] = 
        useState({taskGuide: "", 
                  description: "You will speak for not more than 3 minutes (12-15 sentences). You have to talk continuously.", 
                  text: "In 2.5 minutes be ready to", 
                  subTasks: Array(4).fill(""), 
                  firstImg: null,
                  secondImg: null})

    //Ловит изменения в поле имени варианта
    useEffect(() => {
        variantValidation()
    }, [variantValues])

    //Ловит изменения в полях для тасков
    useEffect(() => {
        taskValidation()
    }, [firstTaskValues, secondTaskValues, thirdTaskValues, fourthTaskValues])

    //Функция валидации имени и картинки варианта
    const variantValidation = () => {
        setVariantValidate(hasAllValues(variantValues))
    }

    //Функция валидации полей тасков
    const taskValidation = () => {
        const taskValidateTemp = [...taskValidate]
        taskValidateTemp[0] = hasAllValues(firstTaskValues)
        taskValidateTemp[1] = hasAllValues(secondTaskValues)
        taskValidateTemp[2] = hasAllValues(thirdTaskValues)
        taskValidateTemp[3] = hasAllValues(fourthTaskValues)
        setTaskValidate(taskValidateTemp)
    }

    //Функция для сброса всех значений при добавлении варианта
    const resetAllValues = () => {
        setVariantValues({ 
            variantName: "", 
            variantImg: null })

        setFirstTaskValues({ 
            taskGuide: "",
            taskText: "" })

        setSecondTaskValues({
            taskGuide: "Study the advertisement",
            description: "You have 20 seconds to ask each question",
            text: "",
            topics: Array(4).fill(""),
            img: null,
            imgTitle: ""
        })

        setThirdTaskValues({
            taskGuide: "",
            speaker: Array(1).fill(""),
            questions: Array(5).fill("")
        })
        
        setFourthTaskValues({
            taskGuide: "",
            description: "You will speak for not more than 3 minutes (12-15 sentences). You have to talk continuously.",
            text: "In 2.5 minutes be ready to",
            subTasks: Array(4).fill(""),
            firstImg: null,
            secondImg: null
        });
    };
    
    //Поскольку в оригинальных полях тасков файлы
    //не могут храниться для отправки, они будут отправлены отсюда
    const imagesForSendingRef = useRef({img:null, firstImg:null, secondImg: null})
    //Handle чекающий изменения в инпутах (для 1 таска / 2 таска / 3 таска / 4 таска)
    const handleInputChange = (setValues) => (e) => {
        const { id, value } = e.target
        // Check if the field is an array (for questions, topcis, subTasks)
        if (id.startsWith('question')) {
            const index = parseInt(id.replace('question', '')) // Assuming id is like 'question0', 'question1', etc.
            setValues(prevValues => {
                const updatedQuestions = [...prevValues.questions]
                updatedQuestions[index] = value
                return { ...prevValues, questions: updatedQuestions}
            })
            return
        }

        if (id.startsWith('topic')) {
            const index = parseInt(id.replace('topic', '')) // Assuming id is like 'topic0', 'topic1', etc.
            setValues(prevValues => {
                const updatedTopics = [...prevValues.topics]
                updatedTopics[index] = value
                return { ...prevValues, topics: updatedTopics}
            })
            return
        }

        if (id.startsWith('subTask')) {
            const index = parseInt(id.replace('subTask', '')) // Assuming id is like 'subTask0', 'subTask1', etc.
            setValues(prevValues => {
                const updatedSubTasks = [...prevValues.subTasks]
                updatedSubTasks[index] = value
                return { ...prevValues, subTasks: updatedSubTasks}
            })
            return
        }
        
        if (id ==='variantImg' || id === 'img' || 
            id === 'firstImg' || id === 'secondImg'){
            console.log(`add image with id = ${id}`)
            setValues(prevValues => {
                return {...prevValues, [id] : e.target.files[0]}
            })
            return
        }

        if (id.startsWith('speaker')) {
            setValues(prevValues => {
                const updatedSpeakerText = [...prevValues.speaker]
                updatedSpeakerText[0] = value
                return {...prevValues, speaker : updatedSpeakerText}
            })
            return
        }

        setValues(prevValues => ({
            ...prevValues,
            [id]: value
        }))
    }

    const convertValuesToArray = (value) => {
        const {taskText, ...rest} = value
        return {...rest, taskText: [value.taskText]}
    }

    //Обработка структуры перед отправкой (формат для сервера)
    const filterValuesForSending = (value) => {
        const {description, text, ...rest} = value;
        return {...rest, taskText : [value.text, value.description]}
    }

    //Конвертация в JSON
    const getRequestDataFromValues = () => {
        imagesForSendingRef.current.img = secondTaskValues.img
        secondTaskValues.img = "%s"
        imagesForSendingRef.current.firstImg = fourthTaskValues.firstImg
        fourthTaskValues.firstImg = "%s"
        imagesForSendingRef.current.secondImg = fourthTaskValues.secondImg
        fourthTaskValues.secondImg = "%s"
        return [{"taskType" : 1, "taskContent":JSON.stringify(convertValuesToArray(firstTaskValues))}, 
                {"taskType" : 2, "taskContent":JSON.stringify(filterValuesForSending(secondTaskValues))}, 
                {"taskType" : 3, "taskContent":JSON.stringify(thirdTaskValues)}, 
                {"taskType" : 4, "taskContent":JSON.stringify(filterValuesForSending(fourthTaskValues))}]
    }

    // Компоненты и их параметры для (1 таска / 2 таска / 3 таска / 4 таска)
    const AdminPopupContentComponents = {
        1:{component: AdminPopupFirstTask, 
            taskValues: firstTaskValues, 
            handleInputChange: handleInputChange(setFirstTaskValues)},

        2:{component: AdminPopupSecondTask, 
            taskValues: secondTaskValues, 
            handleInputChange: handleInputChange(setSecondTaskValues)},

        3:{component: AdminPopupThirdTask, 
            taskValues: thirdTaskValues, 
            handleInputChange: handleInputChange(setThirdTaskValues)},

        4:{component: AdminPopupFourthTask, 
            taskValues: fourthTaskValues, 
            handleInputChange: handleInputChange(setFourthTaskValues)},
    }
    const sendVariant = async () => {
        //console.log(variantValues)
        //Отдельно извлечь все изображения и передать их, затем удалить их поля
        //в данных и только потом преобразовать структуру в текст
        //console.log(getRequestDataFromValues())
        //console.log(imagesForSendingRef.current)
        try {
            const response = await sendVariantData(variantValues)
            await sendTasksData(response.data)
            console.log("Вариант создан!")
        } catch (err) {
            console.error("Ошибка при создании варианта!", err)
        }
    }

    //Отправка данных о тасках на сервер а также обработка ошибок при добавлении
    const sendTasksData = async (variant) => {
        try {
            await sendTasksForVariant(getRequestDataFromValues(), 
                                      imagesForSendingRef.current.img, 
                                      imagesForSendingRef.current.firstImg, 
                                      imagesForSendingRef.current.secondImg,  
                                      variant.id)
            setStatus("Вариант добавлен!")
            setStatusColor("good")
            resetAllValues()
        } catch (err) {
            setStatus("Ошибка при добавлении!")
            setStatusColor("bad")
            console.error("Ошибка при добавлении!", err)
        } finally {
            setTimeout(() => {
                setStatus("")
                setStatusColor("")
            }, 3000)
        }
    }

    const CurrentPopupComponent = AdminPopupContentComponents[currentPopupComponent]

    return (<>
        <div className="adminPopupContainer">
            <AdminPopupName variantValues = {variantValues}
                            handleInputChange = {handleInputChange(setVariantValues)}/>

            <CurrentPopupComponent.component taskValues = {CurrentPopupComponent.taskValues}
                                             handleInputChange = {CurrentPopupComponent.handleInputChange} />

            <AdminPopupChangeTask setCurrentPopupComponent={setCurrentPopupComponent} 
                                  setShowPopup = {setShowPopup} 
                                  sendVariant = {sendVariant}
                                  status = {status}
                                  statusColor = {statusColor}
                                  taskValidate = {taskValidate}
                                  variantValidate = {variantValidate}/>
        </div>
    </>)
}