//deprecated
export const subscriptionEndDate = (startDateStr) => {
    const dateParts = startDateStr.split('.')
    console.log(`parts -> ${dateParts[2]}, ${dateParts[1]-1}, ${dateParts[0]}`)
    const endDate = new Date(dateParts[2], dateParts[1]-1, dateParts[0])
    endDate.setDate(endDate.getDate() + 30)
    return endDate
}
//deprecated
export const subscriptionRemain = (endDate) => {
    const currentDate = new Date()
    if (currentDate > endDate) return 0
    const daysRemain = Math.ceil((Math.abs(endDate - currentDate)) / (1000 * 3600 * 24))
    return daysRemain
}
/**
 * 
 * @param {*} expireDate date when subscription parish
 * 
 * return how many days is remain until sub ends
 */
export const subscriptionDaysRemain = (expireDate) => {
    const [day, month, year] = expireDate.split('.').map(Number)
    const targetDate = new Date(year, month-1, day)
    
    const today = new Date()
    today.setHours(0,0,0,0)

    const difference = targetDate - today
    return Math.ceil(difference / (1000*3600*24))
}
export const subscriptionRemainPercent = (startDate, expireDate) => {
    const daysRemains = subscriptionDaysRemain(expireDate)
    const daysTotal = totalSubDays(startDate, expireDate)
    return Math.round(daysRemains / daysTotal * 100)
    
}

const totalSubDays = (startDateStr, expireDateStr) => {
    const [expDay, expMonth, epxYear] = expireDateStr.split('.').map(Number)
    const expireDate = new Date(epxYear, expMonth - 1, expDay)
    const [startDay, startMonth, startYear] = startDateStr.split('.').map(Number)
    const startDate = new Date(startYear, startMonth - 1, startDay)
    const difference = expireDate - startDate
    return Math.ceil(difference / (1000*3600*24))

}