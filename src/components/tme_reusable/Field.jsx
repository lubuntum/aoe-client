import "./css/inputs_style.css"

export const Field = ({value, type = "text", onChange, ph}) => {
    return (<>
        <input className="input" type={type} value={value} onChange={onChange} placeholder={ph} required></input>
    </>)
}