export const USER_DATA_KEY  = "user_data"
export const USER_NAME = "user_name"
export const USER_EMAIL = "user_email"
export const VISITORS_VARIANTS_AVAILABLE = 3
export const AUTH_VARIANTS_AVAILABLE = 5

export const GUEST_NAME = "Гость"
//Линк сервера
export const SERVER_API_URL = "https://192.168.65.55:8080"
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
export const API_AVAILABLE_VARIANTS = "/api/lesson/variants-available"
export const API_AVAILABLE_VARIANTS_BY_PAGE = "/api/lesson/variants-pageable"
export const API_VARIANT_TASKS_DATA = "/api/lesson/variant/%d/tasks"//получение заданий по варинату
export const API_VARIANT = "/api/lesson/variant/%d"//получение варианта с тасками
export const API_VARIANTS_AVAILABLE_COUNT = "/api/lesson/variants-available-count" //все видимые варианты для пользователя
export const API_SEND_EXAM_DATA = "/api/lesson/exam"//создание экзамена
export const API_SEND_USER_TASK_DATA = "/api/lesson/user-task" //Отправка результата выполнения задания
export const API_CUSTOMER_TASKS_BY_EXAM_DATA = "/api/lesson/result"
export const API_CUSTOMER_TASK_DATA = "/api/lesson/customer-task"

//exam & task results
export const API_TASK_EXPRESS = "/api/result/task-express"
export const API_TASK_EXPRESS_QUEUE = "/api/result/task-express-queue"
export const API_EXAM_TASKS_EXPRESS_QUEUE = "/api/result/exam-tasks-express-queue"

//admin routes
export const API_ADMIN_UPLOAD_VARIANT = "/api/admin/upload-variant"
export const API_ADMIN_UPLOAD_TASKS = "/api/admin/upload-tasks"
export const API_ADMIN_DELETE_VARIANT = "/api/admin/delete-variant"
export const API_ADMIN_VARIANT_VISIBILITY = "/api/admin/variant-visibility"
export const API_ADMIN_VALIDATE = "/api/admin/validate"
export const API_ADMIN_VARIANTS = "/api/admin/variants"
export const API_ADMIN_TASKS_TYPES = "/api/admin/tasks-types"
export const API_ADMIN_UPDATE_TASK_TYPE = "/api/admin/update-prompt"

export const API_ADMIN_ADD_BALANCE_TO_CUSTOMER = "/api/admin/add-balance-to-customer"
export const API_ADMIN_GET_CUSTOMER_ID_BY_EMAIL = "/api/admin/customer-id-by-email"

//subscriptions
export const API_SUBSCRIPTION_GET_ALL_VALID = "/api/subscription/valid-subscriptions"
export const API_SUBSCRIPTION_PURCHASE = "/api/subscription/purchase-subscription"
export const API_SUBSCRIPTION_CHECK_SUB = "/api/subscription/check-subscription"

export const API_PARTNER_GET_ALL = "/api/partner/get-all"
export const API_PARTNER_PARTNERSHIP_PROCEDURE = "/api/partner/partnership-procedure"
export const API_PARTNER_PAY_TO_PARTNER_AMOUNT = "/api/partner/pay"
export const API_PARTNER_GET = "/api/partner"
export const API_PARTNER_TYPES = "/api/partner/types"
export const API_PARTNER_UPDATE = "/api/partner/update"

export const API_PARTNERSHIP_APPLY_PROMOCODE = "/api/partner/apply-promocode"

export const API_PAYMENT_CREATE = "/api/payment/create"
export const API_PAYMENT_STATUS = "/api/payment/status"