import { useRef, useCallback, useEffect } from 'react'

/**
 * @callback AudioEndedCallback
 * @param {Error|null} [error] - Ошибка, если возникла, или null при успешном завершении
 * @returns {void}
 */

/**
 * @typedef {Object} StopAudioFunction
 * @property {function(): void} stop - Функция для принудительной остановки воспроизведения
 */

/**
 * @typedef {Object} AudioSpeakerReturn
 * @property {function(url: string, onEndedCallback?: AudioEndedCallback): StopAudioFunction|undefined} speakAudio - Функция для воспроизведения аудиофайла
 */

/**
 * Хук для воспроизведения аудиофайлов по URL с обработкой ошибок и проверкой доступности файла
 * @returns {AudioSpeakerReturn} Объект с методом speakAudio для воспроизведения аудио
 */
export const useAudioSpeaker = () => {
    /** @type {React.MutableRefObject<HTMLAudioElement|null>} */
    const audioRef = useRef(null)

    /**
     * Очистка ресурсов при размонтировании компонента
     * @returns {void}
     */
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])

    /**
     * Проверяет доступность аудиофайла по URL без использования fetch (чтобы избежать CORS ошибок)
     * @param {string} url - URL аудиофайла для проверки
     * @returns {Promise<boolean>} Promise, который разрешается в true если файл доступен, иначе false
     */
    const checkAudioFile = useCallback(async (url) => {
        return new Promise((resolve) => {
            const audio = new Audio()
            audio.src = url

            audio.oncanplaythrough = () => {
                resolve(true)
            }

            audio.onerror = () => {
                resolve(false)
            }

            // Таймаут на случай, если событие не сработает
            setTimeout(() => resolve(false), 2000)
        })
    }, [])

    /**
     * Воспроизводит аудиофайл по указанному URL
     * @param {string} url - URL аудиофайла для воспроизведения
     * @param {AudioEndedCallback} [onEndedCallback] - Callback-функция, вызываемая после окончания воспроизведения или при ошибке. При ошибке первым аргументом передается объект Error.
     * @returns {function(): void|undefined} Функция для принудительной остановки текущего воспроизведения. Возвращается сразу после вызова speakAudio.
     */
    const speakAudio = useCallback(async (url, onEndedCallback = null) => {
        // Останавливаем предыдущее воспроизведение
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current = null
        }

        // Проверяем корректность URL
        if (!url || typeof url !== 'string') {
            if (onEndedCallback) {
                onEndedCallback(new Error('Invalid audio file URL'))
            }
            return
        }

        try {
            // Проверяем доступность файла (не через fetch, чтобы избежать CORS)
            const isFileAvailable = await checkAudioFile(url)
            if (!isFileAvailable) {
                throw new Error('Audio file not found or cannot be loaded')
            }

            const audio = new Audio()
            audioRef.current = audio
            audio.src = url

            // Обработчик успешного завершения воспроизведения
            audio.addEventListener('ended', () => {
                if (onEndedCallback) onEndedCallback()
                audioRef.current = null
            })

            // Обработчик ошибок воспроизведения
            audio.addEventListener('error', () => {
                if (onEndedCallback) onEndedCallback(new Error('Audio playback error'))
                audioRef.current = null
            })

            // Начинаем воспроизведение
            await audio.play()

            /**
             * Функция для принудительной остановки текущего воспроизведения
             * @returns {void}
             */
            const stopAudio = () => {
                if (audioRef.current) {
                    audioRef.current.pause()
                    audioRef.current = null
                }
            }

            return stopAudio

        } catch (error) {
            // Обработка ошибок при проверке файла или начале воспроизведения
            if (onEndedCallback) {
                onEndedCallback(error)
            }
        }
    }, [checkAudioFile])

    return { speakAudio }
}