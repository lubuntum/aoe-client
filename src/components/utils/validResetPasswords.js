import authStatuses from "../../modules/auth_modules/OLD_authStatuses"

export const validResetPasswords = (data) => {
    if (!data.resetPassword || !data.resetRepeatPassword)
        return authStatuses.ERROR_RESET_FIELDS_ARE_EMPTY

    if (data.resetPassword.length < 5)
        return authStatuses.ERROR_PASS_NOT_VALID

    if (data.resetPassword !== data.resetRepeatPassword)
        return authStatuses.ERROR_PASS_NOT_EQUAL

    return null
}