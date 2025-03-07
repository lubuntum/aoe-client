import { SERVER_API_URL } from "./config";
const TASK_ONE_START = 1
const TASK_TWO_START = 2
const TASK_THREE_START = 3
const TASK_FOUR_START = 4
const QUESTION_ONE = 1
const QUESTION_TWO = 2
const QUESTION_THREE = 3
const QUESTION_FOUR = 4
export const speechUrls = {
    bounce : "http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a",
    shoot : "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/player_shoot.wav",
    [TASK_ONE_START] : `${SERVER_API_URL}/speaker/task_one_start.mp3`,
    [TASK_TWO_START] : `${SERVER_API_URL}/speaker/task_two_start.mp3`,
    [TASK_THREE_START] : `${SERVER_API_URL}/speaker/task_three_start.mp3`,
    [TASK_FOUR_START] : `${SERVER_API_URL}/speaker/task_four_start.mp3`,
    SPEAKING_START: `${SERVER_API_URL}/speaker/start_speaking.mp3`,
    TEST_END: `${SERVER_API_URL}/speaker/test_end.mp3`,
    
}
export const topicsTaskTwoUrls = {
    [QUESTION_ONE]: `${SERVER_API_URL}/speaker/question_one.mp3`,
    [QUESTION_TWO]: `${SERVER_API_URL}/speaker/question_two.mp3`,
    [QUESTION_THREE]: `${SERVER_API_URL}/speaker/question_three.mp3`,
    [QUESTION_FOUR]: `${SERVER_API_URL}/speaker/question_four.mp3`,
}