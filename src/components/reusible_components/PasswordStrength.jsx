import "./css/strength.css"

export const PasswordStrength = ({strengthStyle}) => {
    return (<>
        <div className={`passwrodStrengthContainer ${strengthStyle}`}></div>
    </>)
}