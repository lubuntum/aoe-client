const GRADE_RED = "gradeRed";
const GRADE_YELLOW = "gradeYellow"
const GRADE_GREEN = "gradeGreen"
export const setGradeColor = (grade, total) => {
    if (grade === null) return ""
    const percentage = (grade / total) * 100
    console.log(`percentage = ${percentage}`)
    if (percentage < 69) return GRADE_RED
    if (percentage >= 70 && percentage <= 84) return GRADE_YELLOW
    return GRADE_GREEN
}
//TODO Тима сделай что бы по дефолту возвращал черный цвет, а не зеленый
//что бы символ "--" был черный