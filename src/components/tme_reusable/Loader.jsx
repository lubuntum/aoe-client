import "./css/loader_style.css"

export const Loader = () => {
    return (<>
        {/*Loader copied from uiverse.io by dovatgabriel (Thanks)*/}
        <div class="loader_container">
            <div class="leap_loader">
                <div class="leap_loader--dot"></div>
                <div class="leap_loader--dot"></div>
                <div class="leap_loader--dot"></div>
            </div>
        </div>
    </>)
}