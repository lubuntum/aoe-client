/**
 * 
 * @variant {object} Текущий выбранный вариант
 * @exams {object[]} Все экзамены этого варианта (через API) 
 * @returns 
 */
export const ExamContentViewer = ({variant, exams}) => {
    
    return (<>
        <div className="viewerContainerWrapper gridItem8">
            {variant.theme}
        </div>
    </>)
}