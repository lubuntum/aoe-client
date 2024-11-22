const GRADE_RED = "gradeRed";
const GRADE_YELLOW = "gradeYellow"
const GRADE_GREEN = "gradeGreen"
export const setGradeColor = (grade, total) => {
    if (!grade) return ""
    const percentage = (grade / total) * 100
    if (percentage < 69) return GRADE_RED
    if (percentage >= 70 && percentage <= 84) return GRADE_YELLOW
    return GRADE_GREEN
}