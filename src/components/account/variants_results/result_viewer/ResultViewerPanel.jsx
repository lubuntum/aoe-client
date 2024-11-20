import "./css/results_viewer.css"
import "./css/result_viewer_media.css"

import { useState, useRef, useEffect } from "react"
import { getCurrentDate } from "../../../../modules/date/currentDate"

import { ReactComponent as BoltIcon } from "../../../../res/icons/bolt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FaceIcon } from "../../../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import { ReactComponent as LinkIcon } from "../../../../res/icons/link_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as DownloadIcon } from "../../../../res/icons/download_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ProtocolIcon } from "../../../../res/icons/receipt_long_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ExpandIcon } from "../../../../res/icons/quick_reference_all_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { getCustomerCompletedVariants } from "../../../../modules/api/account/AccountApi"
import { OptionsButtons } from "./OptionsButtons"
import { getCustomerExamsByVariant } from "../../../../modules/api/result/ResultAPI"
import { useNavigate, useNavigation } from "react-router-dom"
/*TODO
    --Сделать две панельки для экзамена и для тасков
    --Они слишком сильно отличаются и имеют разную во многом бизнес логику
    --Будет лучше, проще и практичнее сделать два отдельных компонента 
    которые будут отображать экзамены по варианту и задания отдельно
*/
export const ResultViewerPanel = ({variant, examPicked}) => {
    const navigate = useNavigate()

    const [exams, setExams] = useState([])
    const [currentItems, setCurrentItems] = useState([])

    const [hoveredButton, setHoveredButton] = useState()
    const timeoutRef = useRef()

    const startExamNumber = useRef()
    const itemsPerPage = 3
    const [currentPage, setCurrentPage] = useState(1)
    const paginate = (pageNum) => {
        
        const indexOfLastItem = pageNum * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const currentItemsTemp = exams.slice(indexOfFirstItem, indexOfLastItem)
        
        startExamNumber.current = indexOfFirstItem
        setCurrentPage(pageNum)
        setCurrentItems(currentItemsTemp)
    }


    useEffect(()=>{
        const getExamsData = async () => {
            const response = await getCustomerExamsByVariant(localStorage.getItem("token"), variant)
            const examsTemp = response.data
            examsTemp.sort((a,b)=>{
                // Split the date strings into components
                const [dayA, monthA, yearA] = a.examCompleteDate.split('.').map(Number);
                const [dayB, monthB, yearB] = b.examCompleteDate.split('.').map(Number);
                
                // Create Date objects for comparison
                const dateA = new Date(yearA, monthA - 1, dayA); // month is 0-indexed
                const dateB = new Date(yearB, monthB - 1, dayB);
                
                // Compare the Date objects
                return dateB - dateA})
            
            const indexOfLastItem = currentPage * itemsPerPage
            const indexOfFirstItem = indexOfLastItem - itemsPerPage
            const currentItemsTemp = examsTemp.slice(indexOfFirstItem, indexOfLastItem)
            startExamNumber.current = indexOfFirstItem
            setCurrentItems(currentItemsTemp)

            setHoveredButton(Array(currentItemsTemp.length).fill(null))
            timeoutRef.current = Array(currentItemsTemp.length).fill(null)
            
            setExams(examsTemp)
        }
        getExamsData()
    },[])

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
    const navigateToExamResults = (examId) => {
        const resultsUrl = `/results?variantId=${variant.id}&examId=${examId}`
        navigate(resultsUrl)
    }
    const shareExamResults = async (examId) => {
        try{
            const resultsUrl = `/results?variantId=${variant.id}&examId=${examId}`
            await navigator.clipboard.writeText(`${window.location.host}${resultsUrl}`)
            alert("Copy")
        } catch(err) {
            console.error(`Failed to copy ${err}`)
        }
        
    }
    const downloadExamResults = (examId) => {
        console.log("download")
    }
    const optionsButtons = [
        {id: 1, text: 'Подробнее', icon: <ExpandIcon className="svgIcon"/>, fnc: navigateToExamResults},
        {id: 2, text: 'Ссылка', icon: <LinkIcon className="svgIcon"/>, fnc: shareExamResults},
        {id: 3, text: 'Скачать', icon: <DownloadIcon className="svgIcon"/>, fnc: downloadExamResults},
    ]

    const getColorClass = (score) => {
        if (!score) return ""
        if (score >= 1 && score <= 7) {return "scoreRed"}
        if (score >= 8 && score <= 14) {return "scoreYellow"}
        return "scoreGreen"
    }

    const formatScore = (score) => {
        if (!score) return "--"
        const stringScore = score.toString()
        return stringScore.padStart(2, "0")
    }

    return (<>
        <div className="resultsViewerContainer gridItem9">
            <div className="resultsViewerDescription">
                <p>Ваши попытки</p>
                <p>{variant ? variant.theme : "Тема не найдена"}</p>
                <p>{examPicked ? "Экзамен" : "Задание"}</p>
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
                            <div className="resultsViewerTableHeaderItem itemWithIcons">
                                <BoltIcon className="svgIconTableHeaderItem"/>
                                <p>Отправить на проверку</p>
                                <FaceIcon className="svgIconTableHeaderItem"/>
                            </div>
                        </th>
                        <th>
                            <div className="resultsViewerTableHeaderItem itemWithIcons">
                                <BoltIcon className="svgIconTableHeaderItem"/>
                                <p>Дата отправки</p>
                                <FaceIcon className="svgIconTableHeaderItem"/>
                            </div>
                        </th>
                        <th>
                            <div className="resultsViewerTableHeaderItem itemWithIcons">
                                <BoltIcon className="svgIconTableHeaderItem"/>
                                <p>Результаты</p>
                                <FaceIcon className="svgIconTableHeaderItem"/>
                            </div>
                        </th>
                        <th>
                            <div className="resultsViewerTableHeaderItem"><p>Действия</p></div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems?.map((exam, rowIndex) => (
                        <tr key={exam.id}>
                            <td>
                                <div className="resultsViewerTableBodyItem"><p>{rowIndex+1 + startExamNumber.current}</p></div>
                            </td>
                            <td>
                                <div className="resultsViewerTableBodyItem"><p>{exam.examCompleteDate}</p></div>
                            </td>
                            <td>
                                <div className="resultsViewerSendBtns">
                                    <a className="btn">
                                        <BoltIcon className="svgIcon"/>
                                        <p className="sendBtnType" style={{fontWeight: "600"}}>Экспресс</p>
                                        <p className="sendBtnCost" style={{fontWeight: "600", display: "none"}}>4 токена</p>
                                    </a>
                                    <a className="btn">
                                        <p className="sendBtnType" style={{fontWeight: "600"}}>Эксперт</p>
                                        <p className="sendBtnCost" style={{fontWeight: "600", display: "none"}}>1 токен</p>
                                        <FaceIcon className="svgIcon"/>
                                    </a>
                                </div>    
                            </td>
                            <td>
                                <div className="resultsViewerSendDate">
                                    <div className="resultsViewerTableBodyItem"><p>{exam.expressSendDate ? exam.expressSendDate : '--.--.----'}</p></div>
                                    <div className="resultsViewerTableBodyItem"><p>{exam.expertSendDate ? exam.expertSendDate : '--.--.----'}</p></div>
                                </div>
                            </td>
                            <td>
                                <div className="resultsViewerResults">
                                    <div className="resultsViewerTableBodyItem">
                                        <p><span className={getColorClass(exam?.expressTotalGrade)}>{formatScore(exam.expressTotalGrade)}</span> / 20</p>
                                        <a className="btn"><ProtocolIcon className="svgIcon"/></a>
                                    </div>
                                    
                                    <div className="resultsViewerTableBodyItem">
                                        <p><span className={getColorClass(exam?.expertTotalGrade)}>{formatScore(exam.expertTotalGrade)}</span> / 20</p>
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
                                                        buttonFnc={() => btn.fnc(exam.id)}
                                                        hoveredButton={hoveredButton}
                                                        rowIndex={rowIndex}
                                                        handleMouseEnter={handleMouseEnter}
                                                        handleMouseLeave={handleMouseLeave}
                                                        /> 

                                    ))}
                                    
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

                {exams?.length > 3 && 
                    <div className="resultsViewerTablePagination">
                        {Array.from({ length: Math.ceil(exams.length / itemsPerPage) }, (_, index) => (
                            <a className="btn" key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</a>
                        ))}
                    </div>}
            </table>
        </div>
    </>)
}