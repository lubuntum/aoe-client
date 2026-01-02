export const timersConfig = { 
    assigments: [
        {
            id: 1,
            name: "Задание 1", // Номер задания
            prepTimer: 5, // Таймер на подготовку
            readingTime: 90, // Секунды на чтение
            speakingTime: 90, // Секунды на ответ
        },
        {
            id: 2,
            name: "Задание 2",
            prepTimer: 5,
            readingTime: 90,
            speakingTime: 20,
        },
        {
            id: 3,
            name: "Задание 3",
            prepTimer: 5,
            readingTime: 0,
            speakingTime: 40,
        },
        {
            id: 4,
            name: "Задание 4",
            prepTimer: 5,
            readingTime: 150,
            speakingTime: 180,
        },
    ]
}

// Утилиты для работы с таймерами
export const timerUtils = {
    // Получить конфиг для конкретного задания
    getAssigmentConfig: (assigmentId) => {
        if (!assigmentId) {
            console.warn("No assigment ID provided")
            return timersConfig.assigments[0] // Возвращаем 1 как дефолтный
        }

        const config = timersConfig.assigments.find(a => a.id === assigmentId)

        if (!config) {
            console.warn(`No config found for this assgigment ID: ${assigmentId}`)
            return timersConfig.assigments[0] // Возвращаем 1 как дефолтный
        }

        return config
    },

    // Получить имя задания
    getAssigmentName: (assigmentId) => {
        const config = timerUtils.getAssigmentConfig(assigmentId)
        return config?.name || "Задание"
    },

    // Получить время на подготовку
    getPreparationTimer: (assigmentId) => {
        const config = timerUtils.getAssigmentConfig(assigmentId)
        return config?.prepTimer || 5
    },

    // Получить время на чтение
    getReadingTime: (assigmentId) => {
        const config = timerUtils.getAssigmentConfig(assigmentId)
        return config?.readingTime || 5
    },

    // Получить время на ответ
    getSpeakingTime: (assigmentId) => {
        const config = timerUtils.getAssigmentConfig(assigmentId)
        return config?.speakingTime || 5
    },

    // Формат времи (MM:SS)
    formatTime: (seconds) => {
        if (seconds < 0) seconds = 0
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    },
}