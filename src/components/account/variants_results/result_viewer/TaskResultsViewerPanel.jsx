import "./css/results_viewer.css"
import "./css/result_viewer_media.css"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { ReactComponent as BoltIcon } from "../../../../res/icons/bolt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FaceIcon } from "../../../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import { ReactComponent as LinkIcon } from "../../../../res/icons/link_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as DownloadIcon } from "../../../../res/icons/download_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ProtocolIcon } from "../../../../res/icons/receipt_long_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ExpandIcon } from "../../../../res/icons/quick_reference_all_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import { OptionsButtons } from "./OptionsButtons"
import { getCustomerExamsByVariant, getCustomerTasksByTask, startExpressCheckForTask } from "../../../../modules/api/result/ResultAPI"

import { setGradeColor } from "../../../../modules/gradeFormat/setGradeColor.js"
import { setGradeFormat } from "../../../../modules/gradeFormat/setGradeFormat.js"
import routes from "../../../../routes.js"
import TASKS_MAX_GRADE from "../../../../grades.js"

/*TODO
    --Сделать две панельки для экзамена и для тасков
    --Они слишком сильно отличаются и имеют разную во многом бизнес логику
    --Будет лучше, проще и практичнее сделать два отдельных компонента 
    которые будут отображать экзамены по варианту и задания отдельно
*/
export const TaskResultsViewerPanel = ({variant, task}) => {
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
        taskTemp.sort((a,b)=>{
            const [dayA, monthA, yearA] = a.completeDate.split('.').map(Number);
            const [dayB, monthB, yearB] = b.completeDate.split('.').map(Number);

            const dateA = new Date(yearA, monthA - 1, dayA);
            const dateB = new Date(yearB, monthB - 1, dayB);

            return dateB - dateA})
        
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
        const tempAIService = "aimlapi.com"//TEMP
        const tempAIModel = "gpt-4o"//TEMP
        const textDistanceMethod = "levenshtein";
        const response = await startExpressCheckForTask(customerTask, 
                                                    tempTranscribeService, 
                                                    tempAIService, 
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
    
    return (<>
        <div className="resultsViewerContainer gridItem9">
            <div className="resultsViewerDescription">
                <p>Ваши попытки</p>
                <p>{variant ? variant.theme : "Тема не найдена"}</p>
                <p>Задание</p>
            </div>
            
            <table className="resultsViewerTable">
                <thead>
                    <tr>
                        <th>
                            <div className="resultsViewerTableHeaderItem"><p>№</p></div>
                        </th>
                        <th>
                            <div className="resultsViewerTableHeaderItem"><p>Пройдено</p></div>
                        </th>
                        <th>
                            <div className="resultsViewerTableHeaderItem">
                                <p>Отправить на проверку</p>
                            </div>
                        </th>
                        <th>
                            <div className="resultsViewerTableHeaderItem">
                                <p>Дата отправки</p>
                            </div>
                        </th>
                        <th>
                            <div className="resultsViewerTableHeaderItem">
                                <p>Результаты</p>
                            </div>
                        </th>
                        <th>
                            <div className="resultsViewerTableHeaderItem"><p>Действия</p></div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems.map((customerTask, rowIndex) => (
                        <tr key={customerTask.id}>
                            <td>
                                <div className="resultsViewerTableBodyItem"><p>{rowIndex+1 + startItemNumber.current}</p></div>
                            </td>
                            <td>
                                <div className="resultsViewerTableBodyItem"><p>{customerTask.completeDate}</p></div>
                            </td>
                            <td>
                                <div className="resultsViewerSendBtns">
                                    <a className="btn" onClick={()=>{startExpressTask(customerTask)}} style = {customerTask.answer !== null ? { pointerEvents: "none", background: "gray" } : {}}>
                                        <p className="sendBtnType" style={{fontWeight: "600"}}>Экспресс</p>
                                        <p className="sendBtnCost" style={{fontWeight: "600", display: "none"}}>6 токенов</p>
                                    </a>
                                </div>    
                            </td>
                            <td>
                                <div className="resultsViewerSendDate">
                                    <div className="resultsViewerTableBodyItem"><p>{customerTask.taskResults[0]?.sendDate ? customerTask.taskResults[0].sendDate : '--.--.----'}</p></div>
                                </div>
                            </td>
                            <td>
                                <div className="resultsViewerResults">
                                    <div className="resultsViewerTableBodyItem">
                                        <p><span className={setGradeColor(customerTask.taskResults[0]?.result.grade, TASKS_MAX_GRADE[task.taskType])}>{setGradeFormat(customerTask.taskResults[0]?.result.grade)}</span> / {TASKS_MAX_GRADE[task.taskType]}</p>
                                        <a className="btn"><ProtocolIcon className="svgIcon"/></a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="resultsViewerUsefullBtns" style={{gap: hoveredButton[rowIndex] === null ? "20px" : "10px"}}>
                                    {optionsButtons.map((btn, index) => (
                                        <OptionsButtons buttonId={btn.id} 
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
                    <div className="resultsViewerTablePagination">
                        {Array.from({ length: Math.ceil(customerTasks.length / itemsPerPage) }, (_, index) => (
                            <a className="btn" key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</a>
                        ))}
                    </div>}
            </table>
        </div>
    </>)
}