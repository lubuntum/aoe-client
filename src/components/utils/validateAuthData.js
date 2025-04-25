import authStatuses from "../../modules/auth_modules/authStatuses"

export const validateAuthData = (data) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!data.registrationEmail || !data.registrationName || !data.registrationSecondName || !data.registrationPassword || !data.registrationRepeatPassword)
        return authStatuses.ERROR_REG_FIELDS_ARE_EMPTY

    if (data.registrationPatronymic && !data.registrationPhoneNumber)
        return authStatuses.ERROR_REG_FIELDS_ARE_EMPTY

    if (!regex.test(data.registrationEmail)) 
        return authStatuses.ERROR_EMAIL_NOT_VALID

    if (data.registrationPassword.length < 5) 
        return authStatuses.ERROR_PASS_NOT_VALID

    if (data.registrationPassword !== data.registrationRepeatPassword)
        return authStatuses.ERROR_PASS_NOT_EQUAL

    if (!data.privacyPolice || !data.userAgreement) 
        return authStatuses.ERROR_RULES_NOT_CHECKED

    return null
}