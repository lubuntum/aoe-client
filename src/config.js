export const USER_DATA_KEY  = "user_data"
export const USER_NAME = "user_name"
export const USER_EMAIL = "user_email"

export const GUEST_NAME = "Гость"
//Линк сервера
export const SERVER_API_URL = "http://localhost:8080"
//Роуты для валидации
export const API_REGISTRATION = "/api/auth/registration"
export const API_LOGIN = "/api/auth/login"
export const API_VALIDATE_CREDENTIAL_BY_KEY = "/api/auth/validate"

//Роуты для Data
//account routes
export const API_CUSTOMER_DATA = "/api/account/customer"
export const API_HEADER_DATA = "/api/account/header"
export const API_CUSTOMER_COMPLETED_VARIANTS = "/api/account/customer/completed-variants"
export const API_CUSTOMER_EXAMS_BY_VARIANT = "/api/account/customer/exams-by-variant"
export const API_CUSTOMER_TASKS_BY_TASK = "/api/account/customer/customer-tasks-by-task-id"

//lesson routes
export const API_TASK_DATA = "/api/lesson/task/%d"
export const API_VARIANTS_DATA = "/api/lesson/variants"//получение всех вариантов
export const API_VARIANT_TASKS_DATA = "/api/lesson/variant/%d/tasks"//получение заданий по варинату
export const API_SEND_EXAM_DATA = "/api/lesson/exam"//создание экзамена
export const API_SEND_USER_TASK_DATA = "/api/lesson/user-task" //Отправка результата выполнения задания
export const API_CUSTOMER_TASKS_BY_EXAM_DATA = "/api/lesson/result"
export const API_CUSTOMER_TASK_DATA = "/api/lesson/customer-task"

//exam & task results
export const API_TASK_EXPRESS = "/api/result/task-express"

//admin routes
export const API_ADMIN_UPLOAD_VARIANT = "/api/admin/upload-variant"
export const API_ADMIN_UPLOAD_TASKS = "/api/admin/upload-tasks"
export const API_ADMIN_DELETE_VARIANT = "/api/admin/delete-variant"
export const API_ADMIN_VARIANT_VISIBILITY = "/api/admin/variant-visibility"
export const API_ADMIN_VALIDATE = "/api/admin/validate"
export const API_ADMIN_VARIANTS = "/api/admin/variants"
export const API_ADMIN_TASKS_TYPES = "/api/admin/tasks-types"
export const API_ADMIN_UPDATE_TASK_TYPE = "/api/admin/update-prompt"