export const checkMoneyFormat  = (amount) => {
    const regex = /^\d{1,10}(\.\d{1,2})?$/
    return regex.test(amount)
}