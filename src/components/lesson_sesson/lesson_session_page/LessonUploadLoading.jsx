import { useAuth } from "../../../modules/auth_modules/AuthProvider"
import routes from "../../../routes"
import { Button } from "../../reusible_components/Button"
import { Loader } from "../../reusible_components/Loader"

export const LessonUploadLoading = () => {
    const { isAuth } = useAuth()

    return (
        <div className="lessonUploadLoadingContainer">
            {isAuth ? 
            <div className="lessonUploadLoadingAuthContainer">
                <div className="uploadLoader">
                    <Loader/>
                </div>
                <p>Данные загружаются на сервер, подождите!</p>
                <p>После завершения, вас автоматически перекинет на страницу с результатами!</p>
            </div> : 

            <div className="lessonUploadLoadingUnAuthContainer">
                <p>Для сохранения пройденного задания, войдите ИЛИ зарегистрируйтесь!</p>
                <Button key={"sessionButton0"}
                        buttonText={"Регистрация"}
                        buttonPadding={"0 20px"}
                        buttonFunc={()=>{window.open(routes.AUTORIZATION, "_blank")}}/>
            </div>
            }
        </div>
    )
}