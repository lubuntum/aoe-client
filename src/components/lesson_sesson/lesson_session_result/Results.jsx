import { useLocation } from "react-router-dom"
import Header from "../../header/Header"

export const Results = () => {
    const query = new URLSearchParams(useLocation().search)
    const userId = query.get('userId')
    const examId = query.get('examId')
    const variantId = query.get('variantId')
    /**TODO сделать запрос получить все результаты по examId, и сами задания variantId */
    return (
        <>
            <Header/>
            <p>{`userId = ${userId}, examId = ${examId},  variantId = ${variantId}`}</p>
        </>
    )
}