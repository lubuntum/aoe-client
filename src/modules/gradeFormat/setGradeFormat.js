export const setGradeFormat = (grade) => {
    if(!grade) return "--"
    return grade.toString().padStart(2, "0")
}