export const phoneNumberFormat = (e) => {
    const numbers = e.target.value.replace(/\D/g, '').substring(0, 11)
    let formatted = ""
    if (numbers.length === 0) 
        return ""
    formatted += "+"
    formatted += numbers.charAt(0)
    if(e.target.value === formatted) 
        return ""
    formatted += ""
    if (numbers.length > 1) 
        formatted += "(" + numbers.substring(1, 4)

    if (numbers.length > 4) 
        formatted += ")" + numbers.substring(4, 7)

    if (numbers.length > 7) 
        formatted += " " + numbers.substring(7, 9)

    if (numbers.length > 9) 
        formatted += "-" + numbers.substring(9, 11)

    return formatted
}