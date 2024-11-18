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
import { getCustomerExamsByVariant } from "../../../../modules/api/result/ResultAPI"
/*TODO
    --Сделать две панельки для экзамена и для тасков
    --Они слишком сильно отличаются и имеют разную во многом бизнес логику
    --Будет лучше, проще и практичнее сделать два отдельных компонента 
    которые будут отображать экзамены по варианту и задания отдельно
*/
export const ResultViewerPanel = ({variant, examPicked}) => {
    const data = Array.from({length: 19}, (_, index) => ({
        id: index + 1,
        complete: getCurrentDate(),
        expressSend: getCurrentDate(),
        expertSend: getCurrentDate(),
        expressResult: "6",
        expertResult: "16" 
    }))
    const [exams, setExams] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 3
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = exams.slice(indexOfFirstItem, indexOfLastItem)
    const paginate = (pageNum) => setCurrentPage(pageNum)

    const [hoveredButton, setHoveredButton] = useState(Array(currentItems.length).fill(null))
    const timeoutRef = useRef(Array(currentItems.length).fill(null))

    useEffect(()=>{
        const getExamsData = async () => {
            const response = await getCustomerExamsByVariant(localStorage.getItem("token"), variant)
            response.data.sort((a,b)=>{
                // Split the date strings into components
                const [dayA, monthA, yearA] = a.examCompleteDate.split('.').map(Number);
                const [dayB, monthB, yearB] = b.examCompleteDate.split('.').map(Number);
                
                // Create Date objects for comparison
                const dateA = new Date(yearA, monthA - 1, dayA); // month is 0-indexed
                const dateB = new Date(yearB, monthB - 1, dayB);
                
                // Compare the Date objects
                return dateB - dateA})
            setExams(response.data)
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

    const usefullBtns = [
        {id: 1, text: 'Подробнее', icon: <ExpandIcon className="svgIcon"/>},
        {id: 2, text: 'Ссылка', icon: <LinkIcon className="svgIcon"/>},
        {id: 3, text: 'Скачать', icon: <DownloadIcon className="svgIcon"/>},
    ]

    const getColorClass = (score) => {
        const numericScore = parseInt(score, 10)
        if (numericScore >= 1 && numericScore <= 7) {return "scoreRed"}
        else if (numericScore >= 8 && numericScore <= 14) {return "scoreYellow"}
        else {return "scoreGreen"}
    }

    const formatScore = (score) => {
        if (!score) return "00"
        return score.padStart(2, "0")
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
                                <div className="resultsViewerTableBodyItem"><p>{rowIndex+1}</p></div>
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
                                        <p><span className={getColorClass(exam?.expressResult)}>{formatScore(exam.expressTotalGrade)}</span> / 20</p>
                                        <a className="btn"><ProtocolIcon className="svgIcon"/></a>
                                    </div>
                                    
                                    <div className="resultsViewerTableBodyItem">
                                        <p><span className={getColorClass(exam?.expertResult)}>{formatScore(exam.expertTotalGrade)}</span> / 20</p>
                                        <a className="btn"><ProtocolIcon className="svgIcon"/></a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="resultsViewerUsefullBtns" style={{gap: hoveredButton[rowIndex] === null ? "20px" : "10px"}}>
                                    {usefullBtns.map((button, buttonIndex) => (
                                        <a key={button.id} className="btn"
                                        style={{width: hoveredButton[rowIndex] === buttonIndex ? "120px" : hoveredButton[rowIndex] === null ? "40px" : "10px"}}
                                        onMouseEnter={() => handleMouseEnter(rowIndex, buttonIndex)}
                                        onMouseLeave={() => handleMouseLeave(rowIndex)}>
                                            <div className="svgIconPresentation" style={{display: hoveredButton[rowIndex] === null ? "flex" : "none"}}>{button.icon}</div>
                                            <p style={{display: hoveredButton[rowIndex] === buttonIndex ? "flex" : "none", fontWeight: "600"}}>{button.text}</p>
                                        </a>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

                <div className="resultsViewerTablePagination">
                    {Array.from({ length: Math.ceil(exams.length / itemsPerPage) }, (_, index) => (
                        <a className="btn" key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</a>
                    ))}
                </div>
            </table>
        </div>
    </>)
}