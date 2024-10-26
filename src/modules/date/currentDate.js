export const getCurrentDate = () => {
    let date = new Date()
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: "numeric"
    })
}