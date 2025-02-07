import { Loader } from "../../reusible_components/Loader"

export const LessonUploadLoading = () => {
    return (
        <div className="lessonUploadLoadingContainer">
            <div className="uploadLoader">
                <Loader/>
            </div>
            <p>Данные загружаются на сервер, подождите!</p>
            <p>После завершения, вас автоматически перекинет на страницу с результатами!</p>
        </div>
    )
}