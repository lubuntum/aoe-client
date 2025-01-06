export const setNumberFormat = (digits) => {
    if(digits === null || digits === undefined) return "00"
    return digits.toString().padStart(2, "0")
}