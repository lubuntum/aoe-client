import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { ReactComponent as LinkIcon } from "../../../../res/icons/link_24dp_gi.svg"
import { ReactComponent as DownloadIcon } from "../../../../res/icons/download_24dp_gi.svg"
import { ReactComponent as ProtocolIcon } from "../../../../res/icons/receipt_long_24dp_gi.svg"
import { ReactComponent as ExpandIcon } from "../../../../res/icons/quick_reference_all_24dp_gi.svg"

import { ResultsOptionButtons } from "./ResultsOptionButtons.jsx"
import { getCustomerTasksByTask, sendCustomerTaskToCheckQueue } from "../../../../modules/api_modules/resultAPI.js"

import { setGradeColor } from "../../../../modules/number_formation_modules/setGradeColorRecognition.js"
import { setGradeFormat } from "../../../../modules/number_formation_modules/setGradeNumberFormat.js"
import routes from "../../../../routes.js"
import TASKS_MAX_GRADE from "../../../../modules/grade_modules/configMaxGrades.js"
import { sortCustomerTasks } from "../../../../modules/date_modules/sortingDate.js"

import { AccountPopup } from "../../AccountPopup.jsx"

import { Button } from "../../../reusible_components/Button.jsx"
import { Loader } from "../../../reusible_components/Loader.jsx"
import { getHeaderData } from "../../../../modules/api_modules/accountAPI.js"

export const ResultsTaskRecords = ({variant, task, className, setContentPopup, setShowPopup}) => {
    const navigate = useNavigate()

    const [currentBalance, setCurrentBalance] = useState(0)

    const [customerTasks, setCustomerTasks] = useState([])
    const [currentItems, setCurrentItems] = useState([])

    const [hoveredButton, setHoveredButton] = useState()
    const timeoutRef = useRef()

    const startItemNumber = useRef()
    const itemsPerPage = 3
    const [currentPage, setCurrentPage] = useState(1)
    const paginate = (pageNum) => {
        const indexOfLastItem = pageNum * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const currentItemsTemp = customerTasks.slice(indexOfFirstItem, indexOfLastItem)
        startItemNumber.current = indexOfFirstItem
        setCurrentPage(pageNum)
        setCurrentItems(currentItemsTemp)
    }

    useEffect(()=>{
        getCustomerTasksData()
        console.log(`current task in panel => ${task.id}`)
    }, [task])

    const getCustomerTasksData = async () => {
        const response = await getCustomerTasksByTask(localStorage.getItem("token"),task)
        const taskTemp = response.data
        taskTemp.sort(sortCustomerTasks)
        
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const currentItemsTemp = taskTemp.slice(indexOfFirstItem, indexOfLastItem)
        startItemNumber.current = indexOfFirstItem

        setCurrentItems(currentItemsTemp)
        setHoveredButton(Array(currentItemsTemp.length).fill(null))
        timeoutRef.current = Array(currentItemsTemp.length).fill(null)
        setCustomerTasks(taskTemp)
    }

    const handleMouseEnter = (rowIndex, buttonIndex) => {
        if (timeoutRef.current[rowIndex]) {
            clearTimeout(timeoutRef.current[rowIndex])
        }
        timeoutRef.current[rowIndex] = setTimeout(() => {
            setHoveredButton(prev => {
                const newHoveredButton = [...prev]
                newHoveredButton[rowIndex] = buttonIndex
                return newHoveredButton
            })
        }, 300)
    }
    
    const handleMouseLeave = (rowIndex) => {
        clearTimeout(timeoutRef.current[rowIndex])
        timeoutRef.current[rowIndex] = setTimeout(() => {
            setHoveredButton(prev => {
                const newHoveredButton = [...prev]
                newHoveredButton[rowIndex] = null
                return newHoveredButton
            })
        }, 400)
    }

    const navigateToCustomerTask = (customerTaskId) => {
        const resultsUrl = `${routes.TASK_RESULT}?customerTaskId=${customerTaskId}&taskId=${task.id}`
        navigate(resultsUrl)
    }

    const shareCustomerTask = async (customerTaskId) => {
        try{
            const resultsUrl = `${routes.TASK_RESULT}?customerTaskId=${customerTaskId}&taskId=${task.id}`
            await navigator.clipboard.writeText(`${window.location.host}${resultsUrl}`)
            console.log('Copied')
        } catch(err) {
            console.error(`Failed to copy ${err}`)
        }
    }

    const downloadCustomerTaskAudio = (customerTaskId) => {
        console.log("download")
    }

    const startExpressTask = async (customerTask) => {
        const tempTranscribeService = "assemblyai"//TEMP
        const tempAIService = "vsegpt"//TEMP
        const tempAIModel = "openai/gpt-4"//TEMP
        const textDistanceMethod = "levenshtein";
        try {
            const response = await sendCustomerTaskToCheckQueue(customerTask, 
                tempTranscribeService, 
                tempAIService, 
                tempAIModel,
                textDistanceMethod,
                task,
                localStorage.getItem("token"))
            console.log(response.data)
            await getCustomerTasksData()
        } catch(e) {
            console.log(e)
        }
    }

    const optionsButtons = [
        {id: 0, text: 'Подробнее', icon: <ExpandIcon className="svgIcon"/>, fnc: navigateToCustomerTask},
        {id: 1, text: 'Ссылка', icon: <LinkIcon className="svgIcon"/>, fnc: shareCustomerTask},
        {id: 2, text: 'Скачать', icon: <DownloadIcon className="svgIcon"/>, fnc: downloadCustomerTaskAudio},
    ]
    
    const statuses = {completed : "completed", 
                      checking: "checking", 
                      untranscribed: "untranscribed", 
                      transcribed: "transcribed",
                      incomplete: "incomplete",
                      insufficient: "insufficient"}
    const getStatus = (status) => { 
        return statuses[status] || "default"
    }

    const handleExpressClick = (customerTask) => {
        if (currentBalance < 50) {
            setContentPopup(() => (props) => (
                <AccountPopup
                    warningMessage={"Внимание!"}
                    messageText={"На вашем счету недостаточно средств для проверки!"}
                    messageCost={"На вашем счету должно быть минимум:"}
                    cost={"50"} 
                    messageConfirmation={"Пожалуйста пополните счет для отправки Вашего ответа!"}
                    acceptButton={<Button
                        key={"balanceButtonSend0"}
                        buttonText={"Пополнить"}
                        buttonWidth={"100%"}
                        buttonFunc={()=>{
                            setShowPopup(false)
                            navigate(routes.PRICING)}}
                        />}
                    declineButton={<Button
                        key={"balanceButtonSend1"}
                        buttonText={"Отмена"}
                        buttonType={"outline"}
                        buttonWidth={"100%"}
                        buttonFunc={()=>{
                            setShowPopup(false)}}
                        />}
                    {...props}
                />))
            setShowPopup(true)
        } else {
            setContentPopup(() => (props) => (
                <AccountPopup 
                    warningMessage={"Внимание!"}
                    messageText={`Вы выбрали экспресс проверку для ${task.taskType} задания, варианта: ${variant.theme}`}
                    messageCost={"С вашего счета спишется:"}
                    cost={"50"}
                    messageConfirmation={"Вы подтверждаете что хотите отправить ответ на проверку?"}
                    acceptButton={<Button 
                        key={"resultButtonSend1"}
                        buttonText={"Да"}
                        buttonWidth={"100%"}
                        buttonFunc={()=>{
                            setShowPopup(false)
                            startExpressTask(customerTask)}}
                        />}
                    declineButton={<Button 
                        key={"resultButtonSend2"}
                        buttonText={"Нет"}
                        buttonType={"outline"}
                        buttonWidth={"100%"}
                        buttonFunc={()=>setShowPopup(false)}
                    />}
                    {...props}
                />))
            setShowPopup(true)
        }
    }

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await getHeaderData(localStorage.getItem("token"))
                setCurrentBalance(response.data.currentBalance)
            } catch(e) {
                console.error(e)
            }
        }
        fetchBalance()
    }, [handleExpressClick])

    return (<>
        <div className={`resultsRecordsContainer ${className}`}>
            <div className="resultsRecordsDescription">
                <p>Ваши попытки</p>
                <p>{variant.theme}</p>
                <p>Задание</p>
            </div>
            
            <table className="resultsRecordsTable">
                <thead>
                    <tr>
                        <th><div className="resultsRecordsTableHeaderItem"><p>№</p></div></th>
                        <th><div className="resultsRecordsTableHeaderItem"><p>Пройдено</p></div></th>
                        <th><div className="resultsRecordsTableHeaderItem"><p>Отправить на проверку</p></div></th>
                        <th><div className="resultsRecordsTableHeaderItem"><p>Дата отправки</p></div></th>
                        <th><div className="resultsRecordsTableHeaderItem"><p>Результаты</p></div></th>
                        <th><div className="resultsRecordsTableHeaderItem"><p>Действия</p></div></th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems.map((customerTask, rowIndex) => (
                        <tr key={customerTask.id}>
                            <td>
                                <div className="resultsRecordsTableBodyItem">
                                    <p>{rowIndex+1 + startItemNumber.current}</p>
                                </div>
                            </td>
                            <td>
                                <div className="resultsRecordsTableBodyItem">
                                    <p>{customerTask.completeDate.split(" ")[0]}</p>
                                </div>
                            </td>
                            <td>
                                <div className="resultsRecordsTableBodyButtons">
                                    {getStatus(customerTask.expressCheckStatus?.status) === "completed" ?
                                        <Button key={"resultButtonBlock0"}
                                                buttonType={"block"}
                                                buttonPadding={"0 20px"}
                                                buttonWidth={"100%"}
                                                buttonText={"Экспресс"}/> :
                                        <Button key={"resultButtonSend0"}
                                                buttonPadding={"0 20px"}
                                                buttonWidth={"100%"}
                                                buttonText={"Экспресс"}
                                                buttonFunc={()=>handleExpressClick(customerTask)}/>}
                                </div>    
                            </td>
                            <td>
                                <div className="resultsRecordsTableBodySendDate">
                                    <div className="resultsRecordsTableBodyItem">
                                        {getStatus(customerTask.expressCheckStatus?.status) === "untranscribed" ?
                                            <p>Untranscribed</p> :
                                        getStatus(customerTask.expressCheckStatus?.status) === "transcribed" ?
                                            <p>Transcribed</p> :
                                        getStatus(customerTask.expressCheckStatus?.status) === "checking" ?
                                            <Loader/> :
                                        getStatus(customerTask.expressCheckStatus?.status) === "incomplete" ?
                                            <p>Incomplete</p> :
                                        getStatus(customerTask.expressCheckStatus?.status) === "insufficient" ?
                                            <p>Not enough words</p> :
                                        getStatus(customerTask.expressCheckStatus?.status) === "completed" ?
                                            <p>{customerTask.taskResults[0]?.sendDate ? customerTask.taskResults[0].sendDate : "Ошибка сервера"}</p> :
                                            <p>Не отправлено</p>}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="resultsRecordsTableBodyGrade">
                                    <div className="resultsRecordsTableBodyItem">
                                        {getStatus(customerTask.expressCheckStatus?.status) === "untranscribed" ?
                                            <p>Untranscribed</p> :
                                        getStatus(customerTask.expressCheckStatus?.status) === "transcribed" ?
                                            <p>Transcribed</p> :
                                        getStatus(customerTask.expressCheckStatus?.status) === "checking" ? 
                                            <Loader/> :
                                        getStatus(customerTask.expressCheckStatus?.status) === "incomplete" ?
                                            <p>Incomplete</p> :
                                        getStatus(customerTask.expressCheckStatus?.status) === "insufficient" ?
                                            <p>Not enough words</p> :
                                        getStatus(customerTask.expressCheckStatus?.status) === "completed" ? <>
                                            <div className="resultsRecordsGradeWrapper">
                                                <p className={`recordGrade ${setGradeColor(customerTask.taskResults[0]?.result.grade, TASKS_MAX_GRADE[task.taskType])}`}>
                                                    {setGradeFormat(customerTask.taskResults[0]?.result.grade)} / {setGradeFormat(TASKS_MAX_GRADE[task.taskType])}</p> 
                                                <Button key={2}
                                                        buttonType={"ghost protocol"}
                                                        buttonText={<ProtocolIcon className="svgIcon"/>}
                                                        buttonFunc={()=>{}}/>
                                            </div></> :
                                            <p>Не отправлено</p>}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="resultsRecordsTableOptions" style={{gap: hoveredButton[rowIndex] === null ? "20px" : "10px"}}>
                                    {optionsButtons.map((btn, index) => (
                                        <ResultsOptionButtons buttonId={btn.id} 
                                                              buttonIndex={index} 
                                                              buttonText={btn.text}
                                                              buttonIcon={btn.icon}
                                                              buttonFnc={() => btn.fnc(customerTask.id)}
                                                              hoveredButton={hoveredButton}
                                                              rowIndex={rowIndex}
                                                              handleMouseEnter={handleMouseEnter}
                                                              handleMouseLeave={handleMouseLeave}/>))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

                {customerTasks?.length > 3 && 
                    <div className="resultsRecordsTablePagination">
                        {Array.from({ length: Math.ceil(customerTasks.length / itemsPerPage) }, (_, index) => (
                            <Button key={`pagination${index + 1}`}    
                                    buttonType={"ghost"}
                                    buttonText={index + 1}
                                    buttonFunc={() => paginate(index + 1)}/>))}
                    </div>}
            </table>
        </div>
    </>)
}