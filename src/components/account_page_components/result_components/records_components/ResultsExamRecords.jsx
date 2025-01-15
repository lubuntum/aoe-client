import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { ReactComponent as BoltIcon } from "../../../../res/icons/bolt_24dp_gi.svg"
import { ReactComponent as FaceIcon } from "../../../../res/icons/face_24dp_gi.svg"

import { ReactComponent as LinkIcon } from "../../../../res/icons/link_24dp_gi.svg"
import { ReactComponent as DownloadIcon } from "../../../../res/icons/download_24dp_gi.svg"
import { ReactComponent as ProtocolIcon } from "../../../../res/icons/receipt_long_24dp_gi.svg"
import { ReactComponent as ExpandIcon } from "../../../../res/icons/quick_reference_all_24dp_gi.svg"

import { ResultsOptionButtons } from "./ResultsOptionButtons.jsx"
import { getCustomerExamsByVariant, sendExamToCheckQueue } from "../../../../modules/api_modules/resultAPI.js"

import { setGradeColor } from "../../../../modules/number_formation_modules/setGradeColorRecognition.js"
import { setGradeFormat } from "../../../../modules/number_formation_modules/setGradeNumberFormat.js"
import TASKS_MAX_GRADE from "../../../../modules/grade_modules/configMaxGrades.js"
import { sortCustomerTasks, sortDate, sortExams } from "../../../../modules/date_modules/sortingDate.js"

import { Button } from "../../../reusible_components/Button.jsx"
import { Loader } from "../../../reusible_components/Loader.jsx"

/*<div className="resultsViewerTableBodyItem">
    <p><span className={setGradeColor(exam?.expertTotalGrade, 20)}>{setGradeFormat(exam.expertTotalGrade)}</span> / {TASKS_MAX_GRADE.TOTAL_TASK_MAX_GRADE}</p>
    <a className="btn ghostBtn" style={{width: "40px"}}><ProtocolIcon className="ghostBtnSvg"/></a>
</div> */



/*TODO
    --Сделать две панельки для экзамена и для тасков
    --Они слишком сильно отличаются и имеют разную во многом бизнес логику
    --Будет лучше, проще и практичнее сделать два отдельных компонента 
    которые будут отображать экзамены по варианту и задания отдельно
*/
export const ResultsExamRecords = ({variant, examPicked, className}) => {
    const navigate = useNavigate()

    const [exams, setExams] = useState([])
    const [currentItems, setCurrentItems] = useState([])

    const [hoveredButton, setHoveredButton] = useState()
    const timeoutRef = useRef()

    const startItemNumber = useRef()
    const itemsPerPage = 3
    const [currentPage, setCurrentPage] = useState(1)
    const paginate = (pageNum) => {
        const indexOfLastItem = pageNum * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const currentItemsTemp = exams.slice(indexOfFirstItem, indexOfLastItem)
        startItemNumber.current = indexOfFirstItem
        setCurrentPage(pageNum)
        setCurrentItems(currentItemsTemp)
    }


    useEffect(()=>{
        const getExamsData = async () => {
            const response = await getCustomerExamsByVariant(localStorage.getItem("token"), variant)
            const examsTemp = response.data
            examsTemp.sort(sortExams)
            
            const indexOfLastItem = currentPage * itemsPerPage
            const indexOfFirstItem = indexOfLastItem - itemsPerPage
            const currentItemsTemp = examsTemp.slice(indexOfFirstItem, indexOfLastItem)
            startItemNumber.current = indexOfFirstItem

            setCurrentItems(currentItemsTemp)
            setHoveredButton(Array(currentItemsTemp.length).fill(null))
            timeoutRef.current = Array(currentItemsTemp.length).fill(null)
            setExams(examsTemp)
        }
        getExamsData()
    },[examPicked, variant])

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
            console.log('Copied')
        } catch(err) {
            console.error(`Failed to copy ${err}`)
        }
    }

    const downloadExamResults = (examId) => {
        console.log("download")
    }

    const optionsButtons = [
        {id: 0, text: 'Подробнее', icon: <ExpandIcon className="svgIcon"/>, fnc: navigateToExamResults},
        {id: 1, text: 'Ссылка', icon: <LinkIcon className="svgIcon"/>, fnc: shareExamResults},
        {id: 2, text: 'Скачать', icon: <DownloadIcon className="svgIcon"/>, fnc: downloadExamResults},
    ]

    return (<>
        <div className={`resultsRecordsContainer ${className}`}>
            <div className="resultsRecordsDescription">
                <p>Ваши попытки</p>
                <p>{variant.theme}</p>
                <p>{examPicked ? "Экзамен" : "Задание"}</p>
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
                            <div className="resultsRecordsTableHeaderItem headerItemIcons">
                                <BoltIcon className="resultsRecordsSvgIcon"/>
                                <p>Отправить на проверку</p>
                                <FaceIcon className="resultsRecordsSvgIcon"/>
                            </div>
                        </th>
                        <th>
                            <div className="resultsRecordsTableHeaderItem headerItemIcons">
                                <BoltIcon className="resultsRecordsSvgIcon"/>
                                <p>Дата отправки</p>
                                <FaceIcon className="resultsRecordsSvgIcon"/>
                            </div>
                        </th>
                        <th>
                            <div className="resultsRecordsTableHeaderItem headerItemIcons">
                                <BoltIcon className="resultsRecordsSvgIcon"/>
                                <p>Результаты</p>
                                <FaceIcon className="resultsRecordsSvgIcon"/>
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
                    {currentItems?.map((exam, rowIndex) => (
                        <tr key={exam.id}>
                            <td>
                                <div className="resultsRecordsTableBodyItem">
                                    <p>{rowIndex+1 + startItemNumber.current}</p>
                                </div>
                            </td>
                            <td>
                                <div className="resultsRecordsTableBodyItem">
                                    <p>{exam.examCompleteDate.split(" ")[0]}</p>
                                </div>
                            </td>
                            <td>
                                <div className="resultsRecordsTableBodyButtons">
                                    <Button buttonType={""}
                                            buttonPadding={"0 20px"}
                                            buttonWidth={"100%"}
                                            buttonHeight={""}
                                            buttonIcon={<BoltIcon className="svgIcon"/>}
                                            buttonText={"Экспресс"}
                                            buttonFunc={() => {sendExamToCheckQueue(exam.id, localStorage.getItem("token"))}}/>

                                    <Button buttonType={""}
                                            buttonPadding={"0 20px"}
                                            buttonWidth={"100%"}
                                            buttonHeight={""}
                                            buttonIcon={<FaceIcon className="svgIcon"/>}
                                            buttonText={"Эксперт"}
                                            buttonFunc={""}/>
                                </div>    
                            </td>
                            <td>
                                <div className="resultsRecordsTableBodySendDate">
                                    <div className="resultsRecordsTableBodyItem">
                                        <p>{exam.expressSendDate ? exam.expressSendDate : "Не отправл."}</p>
                                    </div>
                                    <div className="resultsRecordsTableBodyItem">
                                        <p>{exam.expertSendDate ? exam.expertSendDate : "Не отправл."}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="resultsRecordsTableBodyGrade">
                                    <div className="resultsRecordsTableBodyItem">
                                        <div className="resultsRecordsGradeWrapper">
                                            <p className={`recordGrade ${setGradeColor(exam?.expressTotalGrade, TASKS_MAX_GRADE.TOTAL_TASK_MAX_GRADE)}`}>
                                            {exam?.expressTotalGrade} / {TASKS_MAX_GRADE.TOTAL_TASK_MAX_GRADE}
                                            </p>
                                            <Button buttonType={"ghost protocol"}
                                                    buttonPadding={""}
                                                    buttonWidth={""}
                                                    buttonHeight={""}
                                                    buttonIcon={""}
                                                    buttonText={<ProtocolIcon className="svgIcon"/>}
                                                    buttonFunc={()=>{}}/>
                                        </div>
                                    </div>

                                    <div className="resultsRecordsTableBodyItem">
                                        <div className="resultsRecordsGradeWrapper">
                                            <p className={`recordGrade ${setGradeColor(exam?.expressTotalGrade, TASKS_MAX_GRADE.TOTAL_TASK_MAX_GRADE)}`}>
                                                -- / {TASKS_MAX_GRADE.TOTAL_TASK_MAX_GRADE}
                                            </p>
                                            <Button buttonType={"ghost protocol"}
                                                    buttonPadding={""}
                                                    buttonWidth={""}
                                                    buttonHeight={""}
                                                    buttonIcon={""}
                                                    buttonText={<ProtocolIcon className="svgIcon"/>}
                                                    buttonFunc={()=>{}}/>
                                        </div>
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
                                                              buttonFnc={() => btn.fnc(exam.id)}
                                                              hoveredButton={hoveredButton}
                                                              rowIndex={rowIndex}
                                                              handleMouseEnter={handleMouseEnter}
                                                              handleMouseLeave={handleMouseLeave}/>))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

                {exams?.length > 3 && 
                    <div className="resultsRecordsTablePagination">
                        {Array.from({ length: Math.ceil(exams.length / itemsPerPage) }, (_, index) => (
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