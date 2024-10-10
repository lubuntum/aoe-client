export const subscriptionEndDate = (startDateStr) => {
    const dateParts = startDateStr.split('.')
    console.log(`parts -> ${dateParts[2]}, ${dateParts[1]-1}, ${dateParts[0]}`)
    const endDate = new Date(dateParts[2], dateParts[1]-1, dateParts[0])
    endDate.setDate(endDate.getDate() + 30)
    return endDate
}

export const subscriptionRemain = (endDate) => {
    const currentDate = new Date()
    const daysRemain = Math.ceil((Math.abs(endDate - currentDate)) / (1000 * 3600 * 24))
    return daysRemain
}