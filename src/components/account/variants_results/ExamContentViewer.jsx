import "./css/content_viewer.css"
/**
 * 
 * @variant {object} Текущий выбранный вариант
 * @exams {object[]} Все экзамены этого варианта (через API) 
 * @returns 
 */
export const ExamContentViewer = ({variant, exams}) => {
    
    return (<>
        <div className="viewerContainerWrapper">
            {variant.theme}
        </div>
    </>)
}