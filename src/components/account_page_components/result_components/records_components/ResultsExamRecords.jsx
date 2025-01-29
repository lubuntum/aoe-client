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

import { AccountPopup } from "../../AccountPopup.jsx"

import { Button } from "../../../reusible_components/Button.jsx"
import { Loader } from "../../../reusible_components/Loader.jsx"
import routes from "../../../../routes.js"
import { getHeaderData } from "../../../../modules/api_modules/accountAPI.js"

export const ResultsExamRecords = ({variant, examPicked, className, setContentPopup, setShowPopup}) => {
    const navigate = useNavigate()

    const [currentBalance, setCurrentBalance] = useState(0)

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
            console.log(response.data)
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
        {id: 1, text: 'Ссылка', icon: <LinkIcon className="svgIcon"/>, fnc: shareExamResults, isCopy: true},
        {id: 2, text: 'Скачать', icon: <DownloadIcon className="svgIcon"/>, fnc: downloadExamResults},
    ]

    const handleExamExpressClick = (examId, localStorage) => {
        if (currentBalance < 200) {
            setContentPopup(() => (props) => (
                <AccountPopup
                    warningMessage={"Внимание!"}   
                    messageText={"На вашем счету недостаточно средств для проверки!"}
                    messageCost={"На вашем счету должно быть минимум:"}
                    cost={"200"} 
                    messageConfirmation={"Пожалуйста пополните счет для отправки Вашего ответа!"}
                    acceptButton={<Button
                        key={"balanceButtonSend2"}
                        buttonText={"Пополнить"}
                        buttonWidth={"100%"}
                        buttonFunc={()=>{
                            setShowPopup(false)
                            navigate(routes.PRICING)}}
                        />}
                    declineButton={<Button
                        key={"balanceButtonSend3"}
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
                    messageText={`Вы выбрали экспресс проверку для экзамена, варианта: ${variant.theme}`}
                    messageCost={"С вашего счета спишется:"}
                    cost={"200"}
                    messageConfirmation={"Вы подтверждаете что хотите отправить ответ на проверку?"}
                    acceptButton={<Button 
                        key={"resultButtonSend4"}
                        buttonText={"Да"}
                        buttonWidth={"100%"}
                        buttonFunc={()=>{
                            setShowPopup(false)
                            sendExamToCheckQueue(examId, localStorage)}}/>}
                    declineButton={<Button 
                        key={"resultButtonSend5"}
                        buttonText={"Нет"}
                        buttonType={"outline"}
                        buttonWidth={"100%"}
                        buttonFunc={()=>setShowPopup(false)}/>}
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
    }, [handleExamExpressClick])

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
                        <th><div className="resultsRecordsTableHeaderItem"><p>№</p></div></th>
                        <th><div className="resultsRecordsTableHeaderItem"><p>Пройдено</p></div></th>
                        <th><div className="resultsRecordsTableHeaderItem headerItemIcons"><BoltIcon className="resultsRecordsSvgIcon"/><p>Отправить на проверку</p><FaceIcon className="resultsRecordsSvgIcon"/></div></th>
                        <th><div className="resultsRecordsTableHeaderItem headerItemIcons"><BoltIcon className="resultsRecordsSvgIcon"/><p>Дата отправки</p><FaceIcon className="resultsRecordsSvgIcon"/></div></th>
                        <th><div className="resultsRecordsTableHeaderItem headerItemIcons"><BoltIcon className="resultsRecordsSvgIcon"/><p>Результаты</p><FaceIcon className="resultsRecordsSvgIcon"/></div></th>
                        <th><div className="resultsRecordsTableHeaderItem"><p>Действия</p></div></th>
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
                                    <Button key={"resultButtonSend3"}
                                            buttonPadding={"0 20px"}
                                            buttonWidth={"100%"}
                                            buttonIcon={<BoltIcon className="svgIcon"/>}
                                            buttonText={"Экспресс"}
                                            buttonFunc={()=>handleExamExpressClick(exam.id, localStorage.getItem("token"))}/>
                                    <Button key={"resultButtonSend6"}
                                            buttonType={"block"}
                                            buttonPadding={"0 20px"}
                                            buttonWidth={"100%"}
                                            buttonIcon={<FaceIcon className="svgIcon"/>}
                                            buttonText={"Эксперт"}/>
                                </div>    
                            </td>
                            <td>
                                <div className="resultsRecordsTableBodySendDate">
                                    <div className="resultsRecordsTableBodyItem">
                                        <p>{exam.expressSendDate ? exam.expressSendDate : "Ошибка"}</p>
                                    </div>
                                    <div className="resultsRecordsTableBodyItem">
                                        <p>{exam.expertSendDate ? exam.expertSendDate : "Ошибка"}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="resultsRecordsTableBodyGrade">
                                    <div className="resultsRecordsTableBodyItem">
                                        <div className="resultsRecordsGradeWrapper">
                                            <p className={`recordGrade ${setGradeColor(exam?.expressTotalGrade, TASKS_MAX_GRADE.TOTAL_TASK_MAX_GRADE)}`}>
                                             {exam.expressCheckStatus?.status === "completed" ? `${exam?.expressTotalGrade} / ${TASKS_MAX_GRADE.TOTAL_TASK_MAX_GRADE}`: `-- / ${TASKS_MAX_GRADE.TOTAL_TASK_MAX_GRADE}`}
                                            </p>
                                            <Button key={2}
                                                    buttonType={"ghost protocol"}
                                                    buttonText={<ProtocolIcon className="svgIcon"/>}
                                                    buttonFunc={()=>{}}/>
                                        </div>
                                    </div>

                                    <div className="resultsRecordsTableBodyItem">
                                        <div className="resultsRecordsGradeWrapper">
                                            <p className={`recordGrade ${setGradeColor(exam?.expertTotalGrade, TASKS_MAX_GRADE.TOTAL_TASK_MAX_GRADE)}`}>
                                            {exam.expertCheckStatus?.status === "completed" ? `${exam?.expertTotalGrade} / ${TASKS_MAX_GRADE.TOTAL_TASK_MAX_GRADE}`: `-- / ${TASKS_MAX_GRADE.TOTAL_TASK_MAX_GRADE}`}
                                            </p>
                                            <Button key={3}
                                                    buttonType={"ghost protocol"}
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
                                                              handleMouseLeave={handleMouseLeave}
                                                              isCopyButton={btn.isCopy}/>))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

                {exams?.length > 3 && 
                    <div className="resultsRecordsTablePagination">
                        {Array.from({ length: Math.ceil(exams.length / itemsPerPage) }, (_, index) => (
                            <Button key={`pagination${index + 1}`}
                                    buttonType={"ghost"}
                                    buttonText={index + 1}
                                    buttonFunc={() => paginate(index + 1)}/>))}
                    </div>}
            </table>
        </div>
    </>)
}