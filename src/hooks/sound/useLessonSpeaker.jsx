import { useEffect, useRef } from "react"

/**
 * @typedef {Object} Voice
 * @property {string} name - Название голоса
 * @property {string} lang - Язык голоса (например, 'en-GB', 'en-US')
 */

/**
 * @typedef {Object} SpeechUtterance
 * @property {Voice} voice - Выбранный голос
 * @property {string} lang - Язык произношения
 * @property {number} rate - Скорость произношения (0.1-10)
 * @property {number} pitch - Тон голоса (0-2)
 * @property {number} volume - Громкость (0-1)
 * @property {Function} onend - Обработчик завершения произношения
 * @property {Function} onerror - Обработчик ошибок произношения
 */

/**
 * @typedef {Object} SpeechSynthesisErrorEvent
 * @property {string} error - Тип ошибки ('interrupted', 'audio-busy', 'audio-hardware', 'network', 'synthesis-failed', 'synthesis-unavailable', 'text-too-long', 'voice-unavailable')
 */

/**
 * @callback SpeechCallback
 * @param {Error|null} [error] - Ошибка, если возникла, или null при успешном завершении
 * @returns {void}
 */

/**
 * @typedef {Object} LessonSpeakerReturn
 * @property {function(text: string, onEndCallback?: SpeechCallback): void} speak - Основная функция для произношения текста
 */

/**
 * Хук для преобразования текста в речь (Text-to-Speech) с оптимизированной загрузкой голосов
 * и обработкой последовательных вызовов. Автоматически выбирает британский английский голос
 * с откатом к американскому или любому другому английскому акценту.
 * 
 * @returns {LessonSpeakerReturn} Объект с методами для работы с TTS
 */
export const useLessonSpeaker = () => {
    /** @type {React.MutableRefObject<Voice|null>} */
    const voiceRef = useRef(null)
    
    /** @type {React.MutableRefObject<NodeJS.Timeout|null>} */
    const endSpeechTimerRef = useRef(null)
    
    /** @type {React.MutableRefObject<SpeechUtterance|null>} */
    const currentUtteranceRef = useRef(null)
    
    /** @type {React.MutableRefObject<SpeechSynthesis|null>} */
    const synthRef = useRef(null)
    
    /**
     * Эффект инициализации SpeechSynthesis API и выбора голоса
     * @returns {function(): void} Функция очистки ресурсов
     */
    useEffect(() => {
        if (!('speechSynthesis' in window)) {
            console.warn('Speech synthesis not supported')
            return
        }
        
        synthRef.current = window.speechSynthesis
        
        /**
         * Поиск и выбор оптимального английского голоса из доступных в системе
         * Приоритет: en-GB (британский) → en-US (американский) → любой английский (en-*)
         */
        const findEnglishVoice = () => {
            const voices = synthRef.current.getVoices()
            
            voiceRef.current = voices.find(voice => voice.lang === 'en-GB') ||
                              voices.find(voice => voice.lang === 'en-US') ||
                              voices.find(voice => voice.lang.startsWith('en-')) ||
                              (voices.length > 0 ? voices[0] : null)
            
            console.log('Selected TTS voice:', voiceRef.current?.name || 'default')
        }
        
        // Устанавливаем обработчик для события изменения списка голосов
        synthRef.current.onvoiceschanged = findEnglishVoice
        
        // Первоначальная попытка загрузки голосов
        findEnglishVoice()
        
        // Дополнительная попытка через короткое время
        const timeoutId = setTimeout(findEnglishVoice, 300)
        
        // Очистка при размонтировании компонента
        return () => {
            clearTimeout(timeoutId)
            if (endSpeechTimerRef.current) {
                clearTimeout(endSpeechTimerRef.current)
            }
            if (synthRef.current) {
                synthRef.current.cancel()
            }
            currentUtteranceRef.current = null
        }
    }, [])
    
    /**
     * Основная функция произношения текста с обработкой последовательных вызовов.
     * Если в момент вызова уже идет воспроизведение другого текста, текущее воспроизведение
     * корректно останавливается и новый текст начинает воспроизводиться сразу.
     * 
     * @param {string} text - Текст для произношения
     * @param {SpeechCallback} [onEndCallback] - Callback-функция, вызываемая после завершения произношения
     * или при возникновении ошибки (кроме ошибки прерывания).
     * 
     * @example
     * // Базовое использование
     * const { speak } = useLessonSpeaker();
     * speak("Hello world", (error) => {
     *   if (error) console.error('Error:', error);
     *   else console.log('Finished speaking');
     * });
     */
    const speak = (text, onEndCallback = () => {}) => {
        if (!synthRef.current) {
            console.warn('Speech synthesis not available')
            onEndCallback(new Error('Speech synthesis not supported'))
            return
        }

        if (!text || typeof text !== 'string' || text.trim() === '') {
            console.warn('Invalid text for TTS')
            onEndCallback(new Error('Invalid text'))
            return
        }

        // Очищаем предыдущий таймер
        if (endSpeechTimerRef.current) {
            clearTimeout(endSpeechTimerRef.current)
        }

        // Останавливаем текущее воспроизведение
        if (synthRef.current.speaking) {
            synthRef.current.cancel()
        }

        // Создаем новое высказывание
        const utterance = new SpeechSynthesisUtterance(text.trim())

        // Сохраняем ссылку для возможной будущей очистки
        currentUtteranceRef.current = utterance

        // Настраиваем голос
        if (voiceRef.current) {
            utterance.voice = voiceRef.current
            utterance.lang = voiceRef.current.lang
        } else {
            utterance.lang = 'en-US'
        }

        // Оптимальные настройки
        utterance.rate = 1.0
        utterance.pitch = 1.0
        utterance.volume = 1.0

        // Таймер безопасности (20 секунд)
        endSpeechTimerRef.current = setTimeout(() => {
            if (synthRef.current.speaking) {
                console.warn('TTS timeout - forced end after 20s')
                synthRef.current.cancel()
                onEndCallback(new Error('TTS timeout'))
            }
        }, 20000)

        /**
         * Обработчик завершения воспроизведения
         */
        const handleEnd = () => {
            clearTimeout(endSpeechTimerRef.current)
            currentUtteranceRef.current = null
            onEndCallback() // Успешное завершение
        }

        /**
         * Обработчик ошибок воспроизведения
         * @param {SpeechSynthesisErrorEvent} event - Событие ошибки
         */
        const handleError = (event) => {
            clearTimeout(endSpeechTimerRef.current)
            currentUtteranceRef.current = null
            
            // Ошибка "interrupted" - это нормально при отмене, не считаем это ошибкой
            if (event.error === 'interrupted') {
                console.log('Speech was interrupted (normal when canceling)')
                // Не вызываем callback при прерывании
            } else {
                console.error('Speech synthesis error:', event.error)
                onEndCallback(new Error(`Speech error: ${event.error}`))
            }
        }

        // Назначаем обработчики
        utterance.onend = handleEnd
        utterance.onerror = handleError

        // Запускаем воспроизведение
        try {
            synthRef.current.speak(utterance)
            console.log('TTS started:', text.substring(0, 50) + (text.length > 50 ? '...' : ''))
        } catch (error) {
            console.error('Failed to start TTS:', error)
            clearTimeout(endSpeechTimerRef.current)
            onEndCallback(new Error('Failed to start speech synthesis'))
        }
    }
    
    return { speak }
}