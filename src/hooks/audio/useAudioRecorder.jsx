import { useCallback, useEffect, useState } from "react"
import { audioRecorder } from "../../modules/audio_modules/sessionAudioService.js"

/**
 * Хук для работы с записью и объединением аудио
 */
export const useAudioRecorder = () => {
    // Состояния
    const [isRecording, setIsRecording] = useState(false)
    const [permission, setPermission] = useState(false)
    const [isMerging, setIsMerging] = useState(false)
    const [recordedAudiosInfo, setRecordedAudiosInfo] = useState([])
    const [initialized, setInitialized] = useState(false)

    /**
     * Инициализация микрофона
     */
    const initialize = useCallback(async () => {
        try {
            // Проверяем не инициализирован ли уже
            if (audioRecorder.stream && audioRecorder.stream.active) {
                setPermission(true)
                setInitialized(true)
                return true
            }

            const success = await audioRecorder.ini()
            setPermission(success)
            setInitialized(success)
            return success

        } catch (error) {
            console.error("Failed to granted permission to use microphone: ", error)
            setPermission(false)
            setInitialized(false)
            return false
        }
    }, [])

    /**
     * Начало записи
     */
    const startRecording = useCallback(async (id) => {
        try {
            // Сначала проверяем инициализацию
            if (!initialized) {
                const initializedResult = await initialize()
                if (!initializedResult) {
                    throw new Error("Не удалось получить доступ к микрофону")
                }
            }

            // Дополнительная проверка стрима
            if (!audioRecorder.stream || !audioRecorder.stream.active) {
                console.warn("Stream not active, reinitializing...")
                await audioRecorder.reinitialize()
                setInitialized(true)
            }

            await audioRecorder.startRecording()
            setIsRecording(true)
            return true

        } catch (error) {
            console.error("Failed to start recording: ", error)
            setIsRecording(false)
            setInitialized(false)
            return false
        }
    }, [initialized, initialize])

    /**
     * Остановка записи с сохранение результата
     */
    const stopRecording = useCallback(async (id, metadata ={}) => {
        try {
            if (!audioRecorder.isRecordingNow()) {
                console.log("No active recording to stop")
                return null
            }

            const audioBlob = await audioRecorder.stopRecording()
            setIsRecording(false)

            if (id && audioBlob) {
                const audioResult = audioRecorder.createAudioResult(id, audioBlob, metadata)
                audioRecorder.saveAudioForMerge(audioBlob, {
                    ...metadata,
                    id: id
                })

                updateRecordedAudiosInfo()
                return audioResult
            }
            return audioBlob

        } catch (error) {
            console.error("Failed to stop recording: ", error)
            setIsRecording(false)
            return null
        }
    }, [])

    /**
     * Объединение нескольких файлов
     */
    const mergeAudios = useCallback(async (audioBlobs, options = {}) => {
        try {
            setIsMerging(true)

            const mergedBlob = await audioRecorder.mergedAudioFiles(audioBlobs, options)

            setIsMerging(false)

            return mergedBlob

        } catch (error) {
            console.error("Failed to merge audios: ", error)
            setIsMerging(false)
            throw error
        }
    }, [])

    /**
     * Объединение всех записанных аудио
     */
    const mergeAllRecordedAudios = useCallback(async () => {
        try {
            setIsMerging(true)

            const mergedBlob = await audioRecorder.mergeAllRecordedAudios()

            updateRecordedAudiosInfo()
            
            setIsMerging(false)
            
            return mergedBlob

        } catch (error) {
            console.error("Failed to merge all audios: ", error)
            setIsMerging(false)
            throw error
        }
    }, [])

    /**
     * Обновление информации о сохраненных записях
     */
    const updateRecordedAudiosInfo = useCallback(() => {
        const info = audioRecorder.getRecordedAudiosInfo()
        setRecordedAudiosInfo(info)
    }, [])

    /**
     * Очистка всех сохраненных записей
     */
    const clearAllRecordedAudios = useCallback(() => {
        audioRecorder.clearRecordedAudios()
        setRecordedAudiosInfo([])
    }, [])

    /**
     * Очистка ресурсов
     */
    const cleanup = useCallback(() => {
        if (isRecording) {
            audioRecorder.stopRecording().catch(() => {})
        } else {
            audioRecorder.cleanup()
        }

        setIsRecording(false)
    }, [isRecording])

    /**
     * Автоматическая очистка при размонтировании
     */
    useEffect(() => {
        return cleanup
    }, [cleanup])

    /**
     * Инициализация информации о записях
     */
    useEffect(() => {
        updateRecordedAudiosInfo()
    }, [updateRecordedAudiosInfo])

    return {
        // Состояния
        isRecording,
        permission,
        isMerging,
        recordedAudiosInfo,
        initialized,

        // Методы записи
        initialize,
        startRecording,
        stopRecording,
        cleanup,

        // Методы объединения
        mergeAudios,
        mergeAllRecordedAudios,
        clearAllRecordedAudios,

        // Утилиты
        isMicrophoneAvailable: () => audioRecorder.isRecordingNow(),
        getTotalRecordings: () => recordedAudiosInfo.length,
    }

}