import "./css/input_file.css"

export const InputFile = ({inputFileName = "",
                           inputFileOnChange,
                           inputFileWidth = "",
                           inputFileFor = "",
                           accept = null}) => {
    return (
        <div className="inputFileContainer"
             style={{minWidth: `${inputFileWidth}`, maxWidth: `${inputFileWidth}`}}>
            <label htmlFor={inputFileFor}><p>{inputFileName}</p></label>
            <input type="file" name={inputFileFor} id={inputFileFor} onChange={inputFileOnChange} accept={accept !== null && accept}></input>
        </div>
    )
}