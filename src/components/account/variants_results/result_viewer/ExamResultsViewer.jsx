import { useState, useRef } from "react"
import "./css/results_viewer.css"
import { getCurrentDate } from "../../../../modules/date/currentDate"

import { ReactComponent as BoltIcon } from "../../../../res/icons/bolt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FaceIcon } from "../../../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import { ReactComponent as LinkIcon } from "../../../../res/icons/link_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as DownloadIcon } from "../../../../res/icons/download_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ProtocolIcon } from "../../../../res/icons/receipt_long_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ExpandIcon } from "../../../../res/icons/quick_reference_all_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const ExamResultsViewer = () => {
    const data = Array.from({length: 19}, (_, index) => ({
        id: index + 1,
        complete: getCurrentDate(),
        expressSend: getCurrentDate(),
        expertSend: getCurrentDate(),
        expressResult: "06",
        expertResult: "12" 
    }))

    const [hoveredButton, setHoveredButton] = useState(null)
    const timeoutRef = useRef(null)

    const handleMouseEnter = (index) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            setHoveredButton(index)
        }, 300)
    }
    
    const handleMouseLeave = () => {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            setHoveredButton(null)
        }, 400)
    }

    const usefullBtns = [
        {id: 1, text: 'Подробнее', icon: <ExpandIcon className="svgIcon"/>},
        {id: 2, text: 'Ссылка', icon: <LinkIcon className="svgIcon"/>},
        {id: 3, text: 'Скачать', icon: <DownloadIcon className="svgIcon"/>},
    ]

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)
    const paginate = (pageNum) => setCurrentPage(pageNum)

    return (<>
        <div className="resultsViewerContainer gridItem9">
            <div className="resultsViewerDescription">
                <p>Ваши попытки</p>
                <p>Ecology And Ecology</p>
                <p>Экзамен</p>
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
                    {currentItems.map(i => (
                        <tr key={i.id}>
                            <td>
                                <div className="resultsViewerTableBodyItem"><p>{i.id}</p></div>
                            </td>
                            <td>
                                <div className="resultsViewerTableBodyItem"><p>{i.complete}</p></div>
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
                                    <div className="resultsViewerTableBodyItem"><p>{i.expressSend}</p></div>
                                    <div className="resultsViewerTableBodyItem"><p>{i.expertSend}</p></div>
                                </div>
                            </td>
                            <td>
                                <div className="resultsViewerResults">
                                    <div className="resultsViewerTableBodyItem">
                                        <p>{i.expressResult} / 20</p>
                                        <a className="btn"><ProtocolIcon className="svgIcon"/></a>
                                    </div>
                                    
                                    <div className="resultsViewerTableBodyItem">
                                        <p>{i.expertResult} / 20</p>
                                        <a className="btn"><ProtocolIcon className="svgIcon"/></a>
                                    </div>
                                    
                                </div>
                            </td>
                            <td>
                                <div className="resultsViewerUsefullBtns" style={{gap: hoveredButton === null ? "20px" : "10px"}}>
                                    {usefullBtns.map((button, index) => (
                                        <a key={button.id} className="btn"
                                        style={{width: hoveredButton === index ? "120px" : hoveredButton === null ? "40px" : "10px"}}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}>
                                            <div className="svgIconPresentation" style={{display: hoveredButton === null ? "flex" : "none"}}>{button.icon}</div>
                                            <p style={{display: hoveredButton === index ? "flex" : "none", fontWeight: "600"}}>{button.text}</p>
                                        </a>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

                <div className="resultsViewerTablePagination">
                    {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                        <a className="btn" key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</a>
                    ))}
                </div>
            </table>
        </div>
    </>)
}