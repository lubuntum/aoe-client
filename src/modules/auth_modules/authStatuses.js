const SUCCESS_REG_COMPLETE = {
    message: "Регистрация успешна! Мы отправили вам сообщение на почту для подтверждения аккаунта. Если сообщение не пришло, посмотрите в папке - Спам.",
    type: "success"
};

const ERROR_REG_FIELDS_ARE_EMPTY = {
    message: "Для регистрации заполните все поля.",
    type: "error"
};

const ERROR_RESET_FIELDS_ARE_EMPTY = {
    message: "Для сброса пароля заполните все поля.",
    type: "error"
};

const ERROR_LOGIN_FIELDS_ARE_EMPTY = {
    message: "Введите почту и пароль для входа в аккаунт.",
    type: "error"
};

const ERROR_EMAIL_NOT_VALID = {
    message: "Неверный формат почты.",
    type: "error"
};

const ERROR_EMAIL_ALREADY_EXIST = {
    message: "Такая почта уже существует.",
    type: "error"
};

const ERROR_PASS_NOT_VALID = {
    message: "Пароль должен содержать более 5 символов.",
    type: "error"
};

const ERROR_PASS_NOT_EQUAL = {
    message: "Пароли не совпадают.",
    type: "error"
};

const ERROR_RULES_NOT_CHECKED = {
    message: "Перед регистрацией ознакомьтесь с соглашениями.",
    type: "error"
};

const ERROR_REG_FAILED = {
    message: "При регистрации произошла ошибка. Попробуйте снова.",
    type: "error"
};

const ERROR_EMAIL_CONFIRMATION = {
    message: "Прежде чем войти, подтвердите почту.",
    type: "error"
};

const ERROR_WRONG_EMAIL_OR_PASS = {
    message: "Неверная почта или пароль. Попробуйте снова.",
    type: "error"
};

const ERROR_FORGET_EMAIL_EMPTY = {
    message: "Для сброса пароля, введите свою почту.",
    type: "error"
};

const SUCCESS_FORGET_EMAIL_SEND = {
    message: "На вашу почту была отправлена ссылка на сброс пароля. Если сообщение не пришло, посмотрите в папке - Спам!",
    type: "success"
};

const ERROR_FORGET_EMAIL_FAILED = {
    message: "При отправке произошла ошибка. Попробуйте снова.",
    type: "error"
};

const ERROR_CONFIRMATION_ERROR = {
    message: "При подтверждении почты произошла непредвиденная ошибка.",
    type: "error"
};

const SUCCESS_CONFIRMATION_SUCCESS = {
    message: "Ваша почта успешно подтверждена! Теперь вы можете начать подготовку к ЕГЭ.",
    type: "success"
};

const ERROR_RESET_ERROR = {
    message: "При изменении пароля произошла непредвиденная ошибка.",
    type: "error"
};

const SUCCESS_RESET_SUCCESS = {
    message: "Пароль успешно изменен!",
    type: "success"
};

const authStatuses = {
    SUCCESS_REG_COMPLETE,
    ERROR_REG_FIELDS_ARE_EMPTY,
    ERROR_RESET_FIELDS_ARE_EMPTY,
    ERROR_LOGIN_FIELDS_ARE_EMPTY,
    ERROR_EMAIL_NOT_VALID,
    ERROR_EMAIL_ALREADY_EXIST,
    ERROR_PASS_NOT_VALID,
    ERROR_PASS_NOT_EQUAL,
    ERROR_RULES_NOT_CHECKED,
    ERROR_REG_FAILED,
    ERROR_EMAIL_CONFIRMATION,
    ERROR_WRONG_EMAIL_OR_PASS,
    ERROR_FORGET_EMAIL_EMPTY,
    SUCCESS_FORGET_EMAIL_SEND,
    ERROR_FORGET_EMAIL_FAILED,
    ERROR_CONFIRMATION_ERROR,
    SUCCESS_CONFIRMATION_SUCCESS,
    ERROR_RESET_ERROR,
    SUCCESS_RESET_SUCCESS
};

export default authStatuses;