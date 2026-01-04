// Константы для сообщений об успешных операциях
export const SUCCESS_MESSAGES = {
	// Регистрация
	REGISTRATION_SUCCESS: {
		message: "Регистрация прошла успешно! Теперь вы можете войти в систему.",
		type: "success",
		duration: 2000
	},
	REGISTRATION_EMAIL_SENT: {
		message: "Письмо с подтверждением отправлено на ваш email.",
		type: "success",
		duration: 2000
	},

	// Восстановление пароля
	PASSWORD_RESET_SENT: {
		message: "Инструкции по сбросу пароля отправлены на ваш email.",
		type: "success",
		duration: 2000
	},
	PASSWORD_RESET_SUCCESS: {
		message: "Пароль успешно изменен. Теперь вы можете войти с новым паролем.",
		type: "success",
		duration: 2000
	},

	// Общие
	PROFILE_UPDATED: {
		message: "Профиль успешно обновлен.",
		type: "success",
		duration: 2000
	},
	EMAIL_VERIFIED: {
		message: "Email успешно подтвержден.",
		type: "success",
		duration: 2000
	},
	SETTINGS_SAVED: {
		message: "Настройки сохранены.",
		type: "success",
		duration: 2000
	}
}

// Константы для сообщений об ошибках
export const ERROR_MESSAGES = {
	// Общие ошибки
	NETWORK_ERROR: {
		message: "Ошибка сети. Проверьте подключение к интернету.",
		type: "error",
		duration: 2000
	},
	SERVER_ERROR: {
		message: "Ошибка сервера. Пожалуйста, попробуйте позже.",
		type: "error",
		duration: 2000
	},
	UNKNOWN_ERROR: {
		message: "Произошла неизвестная ошибка.",
		type: "error",
		duration: 2000
	},

	// Ошибки валидации
	REQUIRED_FIELD: {
		message: "Заполните все поля для продолжения.",
		type: "error",
		duration: 2000
	},
	INVALID_EMAIL: {
		message: "Пожалуйста, введите корректный email адрес.",
		type: "error",
		duration: 2000
	},
	PASSWORD_TOO_SHORT: {
		message: "Пароль должен содержать минимум 6 символов.",
		type: "error",
		duration: 2000
	},
	PASSWORDS_DO_NOT_MATCH: {
		message: "Пароли не совпадают.",
		type: "error",
		duration: 2000
	},
	INVALID_PHONE: {
		message: "Неверный формат номера телефона.",
		type: "error",
		duration: 2000
	},

	// Ошибки регистрации
	EMAIL_ALREADY_EXISTS: {
		message: "Пользователь с таким email уже существует.",
		type: "error",
		duration: 2000
	},
	USERNAME_TAKEN: {
		message: "Имя пользователя уже занято.",
		type: "error",
		duration: 2000
	},
	WEAK_PASSWORD: {
		message: "Пароль слишком слабый. Используйте буквы, цифры и специальные символы.",
		type: "error",
		duration: 2000
	},
	TERMS_NOT_ACCEPTED: {
		message: "Вы должны принять условия пользовательского соглашения.",
		type: "error",
		duration: 2000
	},
	INVALID_BIRTH_DATE: {
		message: "Дата рождения указана некорректно.",
		type: "error",
		duration: 2000
	},

	// Ошибки авторизации
	INVALID_CREDENTIALS: {
		message: "Неверный email или пароль.",
		type: "error",
		duration: 2000
	},
	USER_NOT_FOUND: {
		message: "Пользователь с такой электронной почтой не найден.",
		type: "error",
		duration: 2000
	},
	ACCOUNT_NOT_ACTIVATED: {
		message: "Аккаунт не активирован. Проверьте вашу почту.",
		type: "error",
		duration: 2000
	},
	ACCOUNT_LOCKED: {
		message: "Аккаунт временно заблокирован. Попробуйте позже.",
		type: "error",
		duration: 2000
	},
	TOO_MANY_ATTEMPTS: {
		message: "Слишком много попыток входа. Попробуйте через 5 минут.",
		type: "error",
		duration: 2000
	},

	// Ошибки сессии
	SESSION_EXPIRED: {
		message: "Сессия истекла. Пожалуйста, войдите снова.",
		type: "error",
		duration: 2000
	},
	UNAUTHORIZED: {
		message: "У вас нет прав для выполнения этого действия.",
		type: "error",
		duration: 2000
	},
	INVALID_TOKEN: {
		message: "Неверный или просроченный токен.",
		type: "error",
		duration: 2000
	},

	// Ошибки восстановления пароля
	EMAIL_NOT_FOUND: {
		message: "Пользователь с таким email не найден.",
		type: "error",
		duration: 2000
	},
	EMAIL_SEND_FAILED: {
		message: "Невозможно отправить письмо на указанный email.",
		type: "error",
		duration: 2000
	},
	RESET_TOKEN_EXPIRED: {
		message: "Срок действия ссылки для сброса пароля истек.",
		type: "error",
		duration: 2000
	},
	INVALID_RESET_TOKEN: {
		message: "Неверная ссылка для сброса пароля.",
		type: "error",
		duration: 2000
	},

	// Ошибки обновления профиля
	EMAIL_ALREADY_IN_USE: {
		message: "Этот email уже используется другим пользователем.",
		type: "error",
		duration: 2000
	},
	CURRENT_PASSWORD_INCORRECT: {
		message: "Текущий пароль указан неверно.",
		type: "error",
		duration: 2000
	},
	NEW_PASSWORD_SAME_AS_OLD: {
		message: "Новый пароль не должен совпадать со старым.",
		type: "error",
		duration: 2000
	},

	// HTTP статус коды ошибок
	HTTP_400_BAD_REQUEST: {
		message: "Неверный запрос. Проверьте отправляемые данные.",
		type: "error",
		duration: 2000
	},
	HTTP_401_UNAUTHORIZED: {
		message: "Требуется авторизация для выполнения этого действия.",
		type: "error",
		duration: 2000
	},
	HTTP_403_FORBIDDEN: {
		message: "Доступ запрещен. У вас недостаточно прав.",
		type: "error",
		duration: 2000
	},
	HTTP_404_NOT_FOUND: {
		message: "Запрошенный ресурс не найден.",
		type: "error",
		duration: 2000
	},
	HTTP_405_METHOD_NOT_ALLOWED: {
		message: "Метод запроса не поддерживается для этого ресурса.",
		type: "error",
		duration: 2000
	},
	HTTP_408_REQUEST_TIMEOUT: {
		message: "Время ожидания запроса истекло.",
		type: "error",
		duration: 2000
	},
	HTTP_409_CONFLICT: {
		message: "Конфликт данных. Возможно, запись уже существует.",
		type: "error",
		duration: 2000
	},
	HTTP_422_UNPROCESSABLE_ENTITY: {
		message: "Невозможно обработать данные запроса.",
		type: "error",
		duration: 2000
	},
	HTTP_429_TOO_MANY_REQUESTS: {
		message: "Слишком много запросов. Пожалуйста, попробуйте позже.",
		type: "error",
		duration: 2000
	},
	HTTP_500_INTERNAL_SERVER_ERROR: {
		message: "Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.",
		type: "error",
		duration: 2000
	},
	HTTP_502_BAD_GATEWAY: {
		message: "Проблема с подключением к серверу.",
		type: "error",
		duration: 2000
	},
	HTTP_503_SERVICE_UNAVAILABLE: {
		message: "Сервис временно недоступен. Ведутся технические работы.",
		type: "error",
		duration: 2000
	},
	HTTP_504_GATEWAY_TIMEOUT: {
		message: "Время ожидания ответа от сервера истекло.",
		type: "error",
		duration: 2000
	}
}

// Хелпер для получения сообщения по HTTP статус коду
export const getHttpErrorMessage = (statusCode) => {
	const statusMessages = {
		400: ERROR_MESSAGES.HTTP_400_BAD_REQUEST,
		401: ERROR_MESSAGES.HTTP_401_UNAUTHORIZED,
		403: ERROR_MESSAGES.HTTP_403_FORBIDDEN,
		404: ERROR_MESSAGES.HTTP_404_NOT_FOUND,
		405: ERROR_MESSAGES.HTTP_405_METHOD_NOT_ALLOWED,
		408: ERROR_MESSAGES.HTTP_408_REQUEST_TIMEOUT,
		409: ERROR_MESSAGES.HTTP_409_CONFLICT,
		422: ERROR_MESSAGES.HTTP_422_UNPROCESSABLE_ENTITY,
		429: ERROR_MESSAGES.HTTP_429_TOO_MANY_REQUESTS,
		500: ERROR_MESSAGES.HTTP_500_INTERNAL_SERVER_ERROR,
		502: ERROR_MESSAGES.HTTP_502_BAD_GATEWAY,
		503: ERROR_MESSAGES.HTTP_503_SERVICE_UNAVAILABLE,
		504: ERROR_MESSAGES.HTTP_504_GATEWAY_TIMEOUT
	}

	return statusMessages[statusCode] || ERROR_MESSAGES.UNKNOWN_ERROR
}