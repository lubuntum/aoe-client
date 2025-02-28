import { useState, useRef, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { ReactComponent as BoltIcon } from "../../../../res/icons/bolt_24dp_gi.svg"
import { ReactComponent as FaceIcon } from "../../../../res/icons/face_24dp_gi.svg"

import { ReactComponent as LinkIcon } from "../../../../res/icons/link_24dp_gi.svg"
import { ReactComponent as DownloadIcon } from "../../../../res/icons/download_24dp_gi.svg"
import { ReactComponent as ProtocolIcon } from "../../../../res/icons/receipt_long_24dp_gi.svg"
import { ReactComponent as ExpandIcon } from "../../../../res/icons/quick_reference_all_24dp_gi.svg"
import { ReactComponent as MoreIcon } from "../../../../res/icons/arrow_up_24dp_gi.svg"

import { ResultsOptionButtons } from "./ResultsOptionButtons.jsx"
import { getCustomerExamsByVariant, sendExamToCheckQueue } from "../../../../modules/api_modules/resultAPI.js"

import TASKS_MAX_GRADE from "../../../../modules/grade_modules/configMaxGrades.js"
import { sortCustomerTasks, sortDate, sortExams } from "../../../../modules/date_modules/sortingDate.js"

import { AccountPopup } from "../../AccountPopup.jsx"

import { Button } from "../../../reusible_components/Button.jsx"
import { Loader } from "../../../reusible_components/Loader.jsx"
import routes from "../../../../routes.js"
import { getHeaderData } from "../../../../modules/api_modules/accountAPI.js"
import { setNumberFormat } from "../../../../modules/number_formation_modules/setNumberFormat.js"

export const ResultsExamRecords = ({variant, examPicked, className, setContentPopup, setShowPopup, setUpdateHeaderData}) => {
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
        getExamsData()
    },[examPicked, variant])
    

    const getExamsData = async () => {
        const response = await getCustomerExamsByVariant(localStorage.getItem("token"), variant)
        const examsTemp = response.data
        examsTemp.sort(sortExams)
        console.log(response.data)
        
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const currentItemsTemp = examsTemp.slice(indexOfFirstItem, indexOfLastItem)
        startItemNumber.current = indexOfFirstItem

        setCurrentItems(currentItemsTemp)
        setHoveredButton(Array(currentItemsTemp.length).fill(null))
        timeoutRef.current = Array(currentItemsTemp.length).fill(null)
        setExams(examsTemp)
    }

    useEffect(()=>{
        const updateInterval = setInterval(()=>{
            getExamsData()
        }, 60 * 1000)
        return () => clearInterval(updateInterval)
    }, [getExamsData])

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
        window.open(resultsUrl, "_blank")
    }

    const shareExamResults = async (examId) => {
        try{
            const resultsUrl = `/results?variantId=${variant.id}&examId=${examId}`
            await navigator.clipboard.writeText(`${window.location.host}${resultsUrl}`)
        } catch (err) {
            console.error("Failed to copy", err)
        }
    }

    const downloadExamResults = (examId) => {
        console.log("download")
    }

    const startExpressExam = async (examId) => {
        try {
            const response = await sendExamToCheckQueue(examId, localStorage.getItem("token"))
            await getExamsData()
            setUpdateHeaderData(true)
        } catch (err) {
            console.error("Failed to start exam check", err)
        }
    }

    const optionsButtons = [
        {id: 0, text: 'Подробнее', icon: <ExpandIcon className="svgIcon"/>, fnc: navigateToExamResults},
        {id: 1, text: 'Ссылка', icon: <LinkIcon className="svgIcon"/>, fnc: shareExamResults, isCopy: true},
        {id: 2, text: 'Скачать', icon: <DownloadIcon className="svgIcon"/>, fnc: downloadExamResults},
    ]

    const handleExamExpressClick = (examId) => {
        if (currentBalance < 200) {
            setContentPopup(() => (props) => (
                <AccountPopup
                    warningMessage={"Внимание!"}   
                    messageText={"На вашем балансе недостаточно средств для проверки!"}
                    messageCost={"На вашем балансе должно быть минимум:"}
                    cost={"200"} 
                    messageConfirmation={"Пожалуйста пополните баланс для отправки Вашего ответа!"}
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
                    messageCost={"С вашего баланса спишется:"}
                    cost={"200"}
                    messageConfirmation={"Вы подтверждаете что хотите отправить ответ на проверку?"}
                    acceptButton={<Button 
                        key={"resultButtonSend4"}
                        buttonText={"Да"}
                        buttonWidth={"100%"}
                        buttonFunc={()=>{
                            setShowPopup(false)
                            startExpressExam(examId)}}/>}
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
            } catch (err) {
                console.error("Failed to fetch balance", err)
            }
        }
        fetchBalance()
    }, [handleExamExpressClick])

    return (<>
        <div className={`resultsRecordsContainer ${className}`}>
            <div className="resultsRecordsDescription">
                <p>Ваши попытки</p> <p>{variant.theme}</p> <p>{examPicked ? "Экзамен" : "Задание"}</p>
            </div>
            
            <table className="resultsRecordsTable">
                <thead>
                    <tr>
                        <th><div className="resultsRecordsHeaderNumber">№</div></th>
                        <th><div className="resultsRecordsHeaderDate">Пройдено</div></th>
                        <th><div className="resultsRecordsHeaderButtons">Проверка</div></th>
                        <th><div className="resultsRecordsHeaderExpress"><BoltIcon className="svgIcon"/>Экспресс: результаты</div></th>
                        <th><div className="resultsRecordsHeaderExpert"><FaceIcon className="svgIcon"/>Эксперт: результаты</div></th>
                        <th><div className="resultsRecordsHeaderOptions">Действия</div></th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems?.map((exam, rowIndex) => (
                        <tr key={exam.id}>
                            <td><div className="resultsRecordsBodyNumber">{rowIndex + 1 + startItemNumber.current}</div></td>
                            <td><div className="resultsRecordsBodyDate">{exam.examCompleteDate.split(" ")[0]}</div></td>
                            <td>
                                <div className="resultsRecordsBodyButtons">
                                    {(exam.expressCheckStatus?.status !== undefined && exam.expressCheckStatus?.status === "checking") ||
                                    (exam.expressCheckStatus?.status !== undefined && exam.expressCheckStatus?.status === "completed") ?

                                        <Button key={"examExpressSendButton0"}
                                                buttonPadding={"0 10px 0 3px"}
                                                buttonWidth={"100%"}
                                                buttonIcon={<BoltIcon className="svgIcon"/>}
                                                buttonText={"Экспресс"}
                                                buttonFunc={()=>handleExamExpressClick(exam.id)}
                                                /> :

                                        <Button key={"examExpressSendButton1"}
                                                buttonPadding={"0 10px 0 3px"}
                                                buttonWidth={"100%"}
                                                buttonIcon={<BoltIcon className="svgIcon"/>}
                                                buttonText={"Экспресс"}
                                                buttonFunc={()=>handleExamExpressClick(exam.id)}/>}

                                    {(exam.expertCheckStatus?.status !== null && exam.expertCheckStatus?.status === "checking") ||
                                    (exam.expertCheckStatus?.status !== null && exam.expertCheckStatus?.status === "completed") ?

                                        <Button key={"examExpertbutton0"}
                                                buttonType={"block"}
                                                buttonPadding={"0 10px 0 3px"}
                                                buttonWidth={"100%"}
                                                buttonIcon={<FaceIcon className="svgIcon"/>}
                                                buttonText={"Эксперт"}/> :

                                        <Button key={"examExpertbutton1"}
                                                buttonType={"block"}
                                                buttonPadding={"0 10px 0 3px"}
                                                buttonWidth={"100%"}
                                                buttonIcon={<FaceIcon className="svgIcon"/>}
                                                buttonText={"Эксперт"}/>}

                                </div>    
                            </td>
                            <td>
                                <div className="resultsRecordsBodyExpress">
                                    {(exam.expressCheckStatus?.status !== null && exam.expressCheckStatus?.status === "checking") ? 
                                        <Loader/> :
                                    (exam.expressCheckStatus?.status !== null && exam.expressCheckStatus?.status === "completed") ? 
                                        `${setNumberFormat(exam?.expressTotalGrade)} / ${setNumberFormat(TASKS_MAX_GRADE.TOTAL_TASK_MAX_GRADE)}` :
                                        "Не проверено"}
                                        <div className="moreResultsExpress">
                                            <MoreIcon className="svgIcon"/>
                                        </div>
                                        {exam.expressCheckStatus?.status === "completed" &&
                                        <div className="moreResultsTooltip">
                                            {exam.customerTasks && exam.customerTasks
                                                .filter(item => item.expertCheckStatus?.status !== null && item.expressCheckStatus?.status === "completed")
                                                .sort((a, b) => {return a.task.taskType.type - b.task.taskType.type}).map((item, index) => (
                                                <div className="tasksResultsContainer">
                                                    <p>Задание {index + 1}</p>
                                                    <p>{(item.expressCheckStatus?.status !== null && item.expressCheckStatus?.status === "completed") &&
                                                        `${setNumberFormat(JSON.parse(item.taskResults[0].result).grade)} / ${setNumberFormat(TASKS_MAX_GRADE[item.task.taskType.type])}`}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>}
                                </div>
                            </td>
                            <td>
                                <div className="resultsRecordsBodyExpert">
                                    {(exam.expertCheckStatus?.status !== null && exam.expertCheckStatus?.status === "checking") ? 
                                        <Loader/> :
                                    (exam.expertCheckStatus?.status !== null && exam.expertCheckStatus?.status === "completed") ? 
                                        `${exam?.expertTotalGrade} / ${TASKS_MAX_GRADE.TOTAL_TASK_MAX_GRADE}` :
                                        "Не проверено"}
                                    <div className="moreResultsExpert">
                                        <MoreIcon className="svgIcon"/>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="resultsRecordsBodyOptions" style={{gap: hoveredButton[rowIndex] === null ? "20px" : "10px"}}>
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
                                    buttonType={`ghost ${currentPage === index + 1 ? "paginationActive" : ""}`}
                                    buttonText={index + 1}
                                    buttonFunc={() => paginate(index + 1)}/>))}
                    </div>}
            </table>
        </div>
    </>)
}