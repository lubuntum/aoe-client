export const getCurrentDate = () => {
    let date = new Date()
    let currentDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: "numeric"
    })
    let currentTime = date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    return `${currentDate} ${currentTime}`
}