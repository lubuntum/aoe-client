import { AdminPopupName } from "./AdminPopupName"
import { AdminPopupFirstTask } from "./AdminPopupFirstTask"
import { AdminPopupSecondTask } from "./AdminPopupSecondTask"
import { AdminPopupThirdTask } from "./AdminPopupThirdTask"
import { AdminPopupFourthTask } from "./AdminPopupFourthTask"
import { AdminPopupChangeTask } from "./AdminPopupChangeTask"
import { useState } from "react"
import { sendVariantData } from "../../../../modules/api/variant/VariantApi"

export const AdminPopupAddVariant = ({setShowPopup}) => {
    //Popup компонент
    const [currentPopupComponent, setCurrentPopupComponent] = useState(1)

    const [viewStatus, setViewStatus] = useState(false)
    const [statusColor, setStatusColor] = useState("")
    const [status, setStatus] = useState("")

    const [variantValues, setVariantValues] = 
        useState({variantName: "", 
                  variantImg: ""})

    //Структура первого таска
    const [firstTaskValues, setFirstTaskValues] = 
        useState({taskGuide: "", 
                  taskText: ""})

    //Структура второго таска
    const [secondTaskValues, setSecondTaskValues] = 
        useState({taskGuide: "", 
                  description: "You have 20 seconds to ask each question", 
                  text: "",
                  taskText: Array(2).fill(""),
                  topics: Array(4).fill(""), 
                  img: "",
                  imgTitle: ""})

    //Структура третьего таска
    const [thirdTaskValues, setThirdTaskValues] = 
        useState({taskGuide: "", 
                  taskText: "", 
                  questions: Array(5).fill("")})

    //Структура четвертого таска
    const [fourthTaskValues, setFourthTaskValues] = 
        useState({taskGuide: "", 
                  description: "You will speak for not more than 3 minutes (12-15 sentences). You have to talk continuously.", 
                  text: "In 2.5 minutes be ready to", 
                  taskText: Array(2).fill(""),
                  subTasks: Array(4).fill(""), 
                  firstImg: "",
                  secondImg: ""})

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
        if (id.startsWith('variantImg')){
            console.log(e.target.files[0])
            setVariantValues(prevValues => {
                return {...prevValues, [id]: e.target.files[0]}
            })
        }
        setValues(prevValues => ({
            ...prevValues,
            [id]: value
        }))
    }

    //Обработка структуры перед отправкой (формат для сервера)
    const filterValuesForSending = (value) => {
        const {description, text, ...rest} = value;
        return {...rest, taskText : [value.text, value.description]}
    }

    //Конвертация в JSON
    const getRequestDataFromValues = () => {
        return [JSON.stringify(firstTaskValues), 
                JSON.stringify(filterValuesForSending(secondTaskValues)), 
                JSON.stringify(thirdTaskValues), 
                JSON.stringify(filterValuesForSending(fourthTaskValues))]
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
        const response = await sendVariantData(variantValues)
        sendTasksData(response.data)
        //TODO use id from response and save other data sendTasksData()...
    }
    //Отправка данных о тасках на сервер
    const sendTasksData = (variant) => {
        console.log(variantValues, getRequestDataFromValues())
        setViewStatus(true)
        setStatusColor("bad")
        setStatus("Ошибка")
        
        setTimeout(() => {
            setViewStatus(false)
            setStatusColor("")
            setStatus("")
        }, 3000)
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
                                  viewStatus = {viewStatus}
                                  status = {status}
                                  statusColor = {statusColor}/>
        </div>
    </>)
}