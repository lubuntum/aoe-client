export const hasAllValues = (struct) => {
    return Object.values(struct).every(value => {
        if (Array. isArray(value)) {
            return value.every(item => item !== "" && item !== null)
        }
        return value !== "" && value !== null
    })
}