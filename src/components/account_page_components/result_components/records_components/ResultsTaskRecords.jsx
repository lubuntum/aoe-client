import { useState, useRef, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { ReactComponent as BoltIcon } from "../../../../res/icons/bolt_24dp_gi.svg"
import { ReactComponent as LinkIcon } from "../../../../res/icons/link_24dp_gi.svg"
import { ReactComponent as DownloadIcon } from "../../../../res/icons/download_24dp_gi.svg"
import { ReactComponent as ProtocolIcon } from "../../../../res/icons/receipt_long_24dp_gi.svg"
import { ReactComponent as ExpandIcon } from "../../../../res/icons/quick_reference_all_24dp_gi.svg"

import { ResultsOptionButtons } from "./ResultsOptionButtons.jsx"
import { getCustomerTasksByTask, sendCustomerTaskToCheckQueue } from "../../../../modules/api_modules/resultAPI.js"

import routes from "../../../../routes.js"
import TASKS_MAX_GRADE from "../../../../modules/grade_modules/configMaxGrades.js"
import { sortCustomerTasks } from "../../../../modules/date_modules/sortingDate.js"

import { AccountPopup } from "../../AccountPopup.jsx"

import { Button } from "../../../reusible_components/Button.jsx"
import { getHeaderData } from "../../../../modules/api_modules/accountAPI.js"
import { setNumberFormat } from "../../../../modules/number_formation_modules/setNumberFormat.js"

export const ResultsTaskRecords = ({variant, task, className, setContentPopup, setShowPopup, setUpdateHeaderData}) => {
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
    }, [task, variant])

    const getCustomerTasksData = async () => {
        const response = await getCustomerTasksByTask(localStorage.getItem("token"),task)
        const taskTemp = response.data
        taskTemp.sort(sortCustomerTasks)
        console.log(response.data)
        
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const currentItemsTemp = taskTemp.slice(indexOfFirstItem, indexOfLastItem)
        startItemNumber.current = indexOfFirstItem

        setCurrentItems(currentItemsTemp)
        setHoveredButton(Array(currentItemsTemp.length).fill(null))
        timeoutRef.current = Array(currentItemsTemp.length).fill(null)
        setCustomerTasks(taskTemp)
    }

    useEffect(()=>{
        const updateDataInterval = setInterval( ()=>{ getCustomerTasksData()}, 35 * 1000)
        return () => clearInterval(updateDataInterval)
    },[getCustomerTasksData])

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
        window.open(resultsUrl, "_blank")
    }

    const shareCustomerTask = async (customerTaskId) => {
        try{
            const resultsUrl = `${routes.TASK_RESULT}?customerTaskId=${customerTaskId}&taskId=${task.id}`
            await navigator.clipboard.writeText(`${window.location.host}${resultsUrl}`)
        } catch (err) {
            console.error("Failed to copy", err)
        }
    }

    const downloadCustomerTaskAudio = (customerTaskId) => {
        console.log("download")
    }

    const startExpressTask = async (customerTask) => {
        try {
            const response = await sendCustomerTaskToCheckQueue(customerTask, task, localStorage.getItem("token"))
            await getCustomerTasksData()
            setUpdateHeaderData(true)
        } catch (err) {
            console.error("Failed to start express check", err)
        }
    }

    const optionsButtons = [
        {id: 0, text: 'Подробнее', icon: <ExpandIcon className="svgIcon"/>, fnc: navigateToCustomerTask},
        {id: 1, text: 'Ссылка', icon: <LinkIcon className="svgIcon"/>, fnc: shareCustomerTask, isCopy: true},
        {id: 2, text: 'Скачать', icon: <DownloadIcon className="svgIcon"/>, fnc: downloadCustomerTaskAudio},
    ]
    
    const handleExpressClick = (customerTask) => {
        if (currentBalance < 50) {
            setContentPopup(() => (props) => (
                <AccountPopup
                    warningMessage={"Внимание!"}
                    messageText={"На вашем балансе недостаточно средств для проверки!"}
                    messageCost={"На вашем балансе должно быть минимум:"}
                    cost={"50"} 
                    messageConfirmation={"Пожалуйста пополните баланс для отправки Вашего ответа!"}
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
                    messageCost={"С вашего баланса спишется:"}
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
            } catch (err) {
                console.error("Failed to fetch balance", err)
            }
        }
        fetchBalance()
    }, [handleExpressClick])

    return (<>
        <div className={`resultsRecordsContainer ${className}`}>
            <div className="resultsRecordsDescription">
                <p>Ваши попытки</p> <p>{variant.theme}</p> <p>Задание</p>
            </div>
            
            <table className="resultsRecordsTable">
                <thead>
                    <tr>
                        <th><div className="resultsRecordsHeaderNumber">№</div></th>
                        <th><div className="resultsRecordsHeaderDate">Пройдено</div></th>
                        <th><div className="resultsRecordsHeaderButtons">Отправить</div></th>
                        <th><div className="resultsTaskRecordsHeaderExpress"><BoltIcon className="svgIcon"/>Экспресс: результаты</div></th>
                        <th><div className="resultsRecordsHeaderOptions">Действия</div></th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems.map((customerTask, rowIndex) => (
                        <tr key={customerTask.id}>
                            <td><div className="resultsRecordsBodyNumber">{rowIndex + 1 + startItemNumber.current}</div></td>
                            <td><div className="resultsRecordsBodyDate">{customerTask.completeDate.split(" ")[0]}</div></td>
                            <td>
                                <div className="resultsRecordsBodyButtons">
                                    {(customerTask.expressCheckStatus?.status !== null && customerTask.expressCheckStatus?.status === "checking") ||
                                    (customerTask.expressCheckStatus?.status !== null && customerTask.expressCheckStatus?.status === "untranscribed") ||
                                    (customerTask.expressCheckStatus?.status !== null && customerTask.expressCheckStatus?.status === "transcribed") ||
                                    (customerTask.expressCheckStatus?.status !== null && customerTask.expressCheckStatus?.status === "incomplete") ||
                                    (customerTask.expressCheckStatus?.status !== null && customerTask.expressCheckStatus?.status === "insufficient") ||
                                    (customerTask.expressCheckStatus?.status !== null && customerTask.expressCheckStatus?.status === "completed") ?
                                        
                                        <Button key={"taskExpressSendButton0"}
                                                buttonWidth={"100%"}
                                                buttonIcon={<BoltIcon className="svgIcon"/>}
                                                buttonText={"Экспресс"}
                                                buttonFunc={()=>handleExpressClick(customerTask)}/> :

                                        <Button key={"taskExpressSendButton1"}
                                                buttonWidth={"100%"}
                                                buttonIcon={<BoltIcon className="svgIcon"/>}
                                                buttonText={"Экспресс"}
                                                buttonFunc={()=>handleExpressClick(customerTask)}/>}
                                </div>    
                            </td>
                            <td>
                                <div className="resultsTaskRecordsBodyExpress">
                                    {(customerTask.expressCheckStatus?.status !== null && customerTask.expressCheckStatus?.status === "checking") ||
                                    (customerTask.expressCheckStatus?.status !== null && customerTask.expressCheckStatus?.status === "untranscribed") ||
                                    (customerTask.expressCheckStatus?.status !== null && customerTask.expressCheckStatus?.status === "transcribed") ?
                                        <p>Загрузка</p> :
                                    (customerTask.expressCheckStatus?.status !== null && customerTask.expressCheckStatus?.status === "incomplete") ||
                                    (customerTask.expressCheckStatus?.status !== null && customerTask.expressCheckStatus?.status === "insufficient") ?
                                        `Ошибка проверки` :
                                    (customerTask.expressCheckStatus?.status !== null && customerTask.expressCheckStatus?.status === "completed") ?
                                        `${setNumberFormat(customerTask.taskResults[0]?.result.grade)} / ${setNumberFormat(TASKS_MAX_GRADE[task.taskType])}` :
                                        "Не проверено"}
                                </div>
                            </td>
                            <td>
                                <div className="resultsRecordsBodyOptions" style={{gap: hoveredButton[rowIndex] === null ? "20px" : "10px"}}>
                                    {optionsButtons.map((btn, index) => (
                                        <ResultsOptionButtons buttonId={btn.id} 
                                                              buttonIndex={index} 
                                                              buttonText={btn.text}
                                                              buttonIcon={btn.icon}
                                                              buttonFnc={() => btn.fnc(customerTask.id)}
                                                              hoveredButton={hoveredButton}
                                                              rowIndex={rowIndex}
                                                              handleMouseEnter={handleMouseEnter}
                                                              handleMouseLeave={handleMouseLeave}
                                                              isCopyButton={btn.isCopy}/>))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

                {customerTasks?.length > 3 && 
                    <div className="resultsRecordsTablePagination">
                        {Array.from({ length: Math.ceil(customerTasks.length / itemsPerPage) }, (_, index) => (
                            <Button key={`pagination${index + 1}`}    
                                    buttonType={`ghost ${currentPage === index + 1 ? "paginationActive" : ""}`}
                                    buttonText={index + 1}
                                    buttonFunc={() => paginate(index + 1)}/>))}
                    </div>}
            </table>
        </div>
    </>)
}