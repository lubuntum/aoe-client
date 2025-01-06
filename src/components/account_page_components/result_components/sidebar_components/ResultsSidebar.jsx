export const ResultsSidebar = ({variants, showTasksClick, className}) => {
    let idleComponent
    if (variants === undefined) {
        idleComponent = <div className={`resultSidebarContainer ${className}`}>Нет пройденных вариантов</div>
    }
    return (<>
        {idleComponent && idleComponent}
        {idleComponent === undefined && (<>
            <div className={`resultSidebarContainer ${className}`}>
                <div className="resultSidebarRadioGroup">
                    <fieldset id="sidebarGroup">
                        {variants && variants.map((variant, index) => (
                            <label key={`Sidebar${index}`} className="sidebarRadioOption" onClick={()=>{showTasksClick(index)}}>
                                <input type="radio" name="sidebarGroup"></input>
                                <div className="sidebarButton">{variant.theme}</div>
                            </label>
                        ))}
                    </fieldset>
                </div>
            </div>
        </>)}
    </>)
}   