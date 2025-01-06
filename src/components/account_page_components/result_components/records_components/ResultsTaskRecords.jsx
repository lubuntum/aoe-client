import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { ReactComponent as LinkIcon } from "../../../../res/icons/link_24dp_gi.svg"
import { ReactComponent as DownloadIcon } from "../../../../res/icons/download_24dp_gi.svg"
import { ReactComponent as ProtocolIcon } from "../../../../res/icons/receipt_long_24dp_gi.svg"
import { ReactComponent as ExpandIcon } from "../../../../res/icons/quick_reference_all_24dp_gi.svg"

import { ResultsOptionButtons } from "./ResultsOptionButtons.jsx"
import { getCustomerExamsByVariant, getCustomerTasksByTask, startExpressCheckForTask } from "../../../../modules/api_modules/resultAPI.js"

import { setGradeColor } from "../../../../modules/number_formation_modules/setGradeColorRecognition.js"
import { setGradeFormat } from "../../../../modules/number_formation_modules/setGradeNumberFormat.js"
import routes from "../../../../routes.js"
import TASKS_MAX_GRADE from "../../../../modules/grade_modules/configMaxGrades.js"
import { sortCustomerTasks, sortDate } from "../../../../modules/date_modules/sortingDate.js"

import { Button } from "../../../reusible_components/Button.jsx"
import { Loader } from "../../../reusible_components/Loader.jsx"

export const ResultsTaskRecords = ({variant, task, className}) => {
    const navigate = useNavigate()

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
    },[task])
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
        const tempAIModel = "openai/gpt-4o-latest"//TEMP
        const textDistanceMethod = "levenshtein";
        const response = await startExpressCheckForTask(customerTask, 
                                                    tempTranscribeService, 
                                                    tempAIService, 
                                                    tempAIModel,
                                                    textDistanceMethod,
                                                    task,
                                                    localStorage.getItem("token"))
        console.log(response.data)
        await getCustomerTasksData()
    }

    const optionsButtons = [
        {id: 0, text: 'Подробнее', icon: <ExpandIcon className="svgIcon"/>, fnc: navigateToCustomerTask},
        {id: 1, text: 'Ссылка', icon: <LinkIcon className="svgIcon"/>, fnc: shareCustomerTask},
        {id: 2, text: 'Скачать', icon: <DownloadIcon className="svgIcon"/>, fnc: downloadCustomerTaskAudio},
    ]
    
    const statuses = {completed : "completed", checking: "checking"}
    const getStatus = (status) => { 
        return statuses[status] || "default"
    }

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
                        <th>
                            <div className="resultsRecordsTableHeaderItem">
                                <p>№</p>
                            </div>
                        </th>
                        <th>
                            <div className="resultsRecordsTableHeaderItem">
                                <p>Пройдено</p>
                            </div>
                        </th>
                        <th>
                            <div className="resultsRecordsTableHeaderItem">
                                <p>Отправить на проверку</p>
                            </div>
                        </th>
                        <th>
                            <div className="resultsRecordsTableHeaderItem">
                                <p>Дата отправки</p>
                            </div>
                        </th>
                        <th>
                            <div className="resultsRecordsTableHeaderItem">
                                <p>Результаты</p>
                            </div>
                        </th>
                        <th>
                            <div className="resultsRecordsTableHeaderItem">
                                <p>Действия</p>
                            </div>
                        </th>
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
                                    {getStatus(customerTask.expressCheckStatus?.status) === "checking" ?
                                    <Button buttonType={"block"}
                                            buttonPadding={"0 20px"}
                                            buttonWidth={"100%"}
                                            buttonHeight={""}
                                            buttonIcon={""}
                                            buttonText={"Экспресс"}
                                            buttonFunc={""}/> :

                                    getStatus(customerTask.expressCheckStatus?.status) === "completed" ?
                                    <Button buttonType={"block"}
                                            buttonPadding={"0 20px"}
                                            buttonWidth={"100%"}
                                            buttonHeight={""}
                                            buttonIcon={""}
                                            buttonText={"Экспресс"}
                                            buttonFunc={""}/> :

                                    <Button buttonType={""}
                                            buttonPadding={"0 20px"}
                                            buttonWidth={"100%"}
                                            buttonHeight={""}
                                            buttonIcon={""}
                                            buttonText={"Экспресс"}
                                            buttonFunc={()=>{startExpressTask(customerTask)}}/>}
                                </div>    
                            </td>
                            <td>
                                <div className="resultsRecordsTableBodySendDate">
                                    <div className="resultsRecordsTableBodyItem">
                                        <p>{customerTask.taskResults[0]?.sendDate ? customerTask.taskResults[0].sendDate : "Не отправлено"}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="resultsRecordsTableBodyGrade">
                                    <div className="resultsRecordsTableBodyItem">
                                        {getStatus(customerTask.expressCheckStatus?.status) === "checking" ? 
                                        <Loader/> :

                                        getStatus(customerTask.expressCheckStatus?.status) === "completed" ? <>
                                        <div className="resultsRecordsGradeWrapper">
                                            <p className={`recordGrade ${setGradeColor(customerTask.taskResults[0]?.result.grade, TASKS_MAX_GRADE[task.taskType])}`}>
                                                {setGradeFormat(customerTask.taskResults[0]?.result.grade)} / {setGradeFormat(TASKS_MAX_GRADE[task.taskType])}
                                            </p> 
                                            <Button buttonType={"ghost protocol"}
                                                    buttonPadding={""}
                                                    buttonWidth={""}
                                                    buttonHeight={""}
                                                    buttonIcon={""}
                                                    buttonText={<ProtocolIcon className="svgIcon"/>}
                                                    buttonFunc={()=>{startExpressTask(customerTask)}}/>
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
                            <Button buttonType={"ghost"}
                                    buttonPadding={""}
                                    buttonWidth={""}
                                    buttonHeight={""}
                                    buttonIcon={""}
                                    buttonText={index + 1}
                                    buttonFunc={() => paginate(index + 1)}/>))}
                    </div>}
            </table>
        </div>
    </>)
}