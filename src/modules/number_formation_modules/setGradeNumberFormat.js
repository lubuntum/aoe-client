export const setGradeFormat = (grade) => {
    if(grade == null) return "--"
    return grade.toString().padStart(2, "0")
}