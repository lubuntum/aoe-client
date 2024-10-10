import { useState } from "react"

import "./css/account_result_grid.css"

import "./css/result_selection_btn.css"
import "./css/result_variants_selection.css"
import "./css/result_tasks_selection.css"
import "./css/result_content_viewer.css"
import "./css/result_audio_viewer.css"
import "./css/result_media.css"

import { VariantsSelection } from "./sidebar/VariantsSelection"
import { TaskSelection } from "./topbar/TasksSelection"

import { TaskContentViewer } from "./content_viewer/TaskContentViewer"
import { ExamContentViewer } from "./content_viewer/ExamContentViewer"

import { TaskResultsViewer } from "./result_viewer/TaskResultsViewer"
import { ExamResultsViewer } from "./result_viewer/ExamResultsViewer"

export const AccountResultsGrid = () =>{
    const [currentVariant, setCurrentVariant] = useState()
    const [currentTask, setCurrentTask] = useState()
    const [examPicked, setExamPicked] = useState()
    /** TEST
     * Данные которые будут подсасываться через useEffect
     */
    const testResponse = {
        "data" : {
            "variants": [{"id":1, "theme":"someTheme1", 
                            "tasks": [{"id":1, 
                                        "task_content":{
                                            "task_guide":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin tortor purus platea sit eu id nisi litora libero. Neque vulputate consequat ac amet augue blandit maximus aliquet congue. Pharetra vestibulum posuere ornare faucibus fusce dictumst orci aenean eu facilisis ut volutpat commodo senectus purus himenaeos fames primis convallis nisi.", 
                                            "task_text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar mollis odio sem faucibus consectetur sed dignissim ullamcorper. Torquent fames fringilla laoreet diam ultricies posuere nibh dictum conubia. Tempus aenean at venenatis vitae proin neque ipsum inceptos nibh senectus class iaculis. Aliquam eros mauris magna urna tortor nostra vestibulum id amet.Iaculis euismod nostra duis bibendum dolor duis nibh dictumst nunc donec egestas. Vestibulum tortor consectetur dapibus consequat pellentesque adipiscing tempus facilisis praesent sodales porttitor posuere porta feugiat. Fames consequat fames elementum scelerisque duis per litora augue lacinia. Ante eget eleifend laoreet mollis nec vel sapien pharetra neque convallis id lobortis. Primis adipiscing luctus aenean dictum rhoncus quam donec litora cubilia aenean ultricies aenean sodales.Platea nostra sem sagittis lectus lobortis ipsum cras class senectus sapien. Facilisis luctus ut purus senectus himenaeos curabitur id nostra elementum congue. Hac faucibus rutrum lorem consectetur consequat consequat felis vivamus lectus diam placerat. Senectus eu dictum curabitur ex ac tristique elementum adipiscing curae dignissim auctor mauris enim. Mauris conubia libero vitae aptent sapien placerat fermentum consectetur ante sodales fermentum ultricies semper dictum."}, 
                                            "task_type":1},
                                        {"id":2, 
                                            "task_content":{
                                                "task_guide":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin tortor purus platea sit eu id nisi litora libero. Neque vulputate consequat ac amet augue blandit maximus aliquet congue. Pharetra vestibulum posuere ornare faucibus fusce dictumst orci aenean eu facilisis ut volutpat commodo senectus purus himenaeos fames primis convallis nisi.", 
                                                "task_topics": ["Aboba", "Aboba 2", "Aboba: Revenge", "Aboba: Endgame"],
                                                "task_img": "https://img.freepik.com/free-photo/beautiful-young-woman-posing-kitchen_1153-5078.jpg?w=1380&t=st=1728291068~exp=1728291668~hmac=6399b7be61f4a46b74ea2568dcc46bc713fa1ca6fd49ac5637a93aa853d27f51"},
                                                "task_type":2},
                                        {"id":3, 
                                            "task_content":{
                                                "task_guide":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin tortor purus platea sit eu id nisi litora libero. Neque vulputate consequat ac amet augue blandit maximus aliquet congue. Pharetra vestibulum posuere ornare faucibus fusce dictumst orci aenean eu facilisis ut volutpat commodo senectus purus himenaeos fames primis convallis nisi.", 
                                                "task_questions":['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet']}, 
                                                "task_type":3},
                                        {"id":4, 
                                            "task_content":{
                                                "task_guide":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin tortor purus platea sit eu id nisi litora libero. Neque vulputate consequat ac amet augue blandit maximus aliquet congue. Pharetra vestibulum posuere ornare faucibus fusce dictumst orci aenean eu facilisis ut volutpat commodo senectus purus himenaeos fames primis convallis nisi.", 
                                                "task_sub":['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet'],
                                                "task_img1": "https://img.freepik.com/free-photo/beautiful-young-woman-posing-kitchen_1153-5078.jpg?w=1380&t=st=1728291068~exp=1728291668~hmac=6399b7be61f4a46b74ea2568dcc46bc713fa1ca6fd49ac5637a93aa853d27f51",
                                                "task_img2": "https://img.freepik.com/free-photo/beautiful-young-woman-posing-kitchen_1153-5078.jpg?w=1380&t=st=1728291068~exp=1728291668~hmac=6399b7be61f4a46b74ea2568dcc46bc713fa1ca6fd49ac5637a93aa853d27f51"}, 
                                                "task_type":4}]},
                        {"id":5, "theme":"someTheme5", 
                            "tasks": [{"id":7, 
                                        "task_content":{
                                            "task_guide":"Aboba guide1 theme", 
                                            "task_text":"Aboba Text11"}, 
                                            "task_type":1},
                                        {"id":8, 
                                            "task_content":{
                                                "task_guide":"Aboba guide2", 
                                                "task_text":"Aboba Text2"}, 
                                                "task_type":2},
                                        {"id":9, 
                                            "task_content":{
                                                "task_guide":"Aboba guide3", 
                                                "task_text":"Aboba Text3"}, 
                                                "task_type":3},
                                        {"id":10, 
                                            "task_content":{
                                                "task_guide":"Aboba guide4", 
                                                "task_text":"Aboba Text4"}, 
                                                "task_type":4}]},
                        {"id":7, "theme":"someTheme7", 
                            "tasks": [{"id":15, 
                                        "task_content":{
                                            "task_guide":"Aboba guide1", 
                                            "task_text":"Aboba Text111"}, 
                                            "task_type":1},
                                        {"id":16, 
                                            "task_content":{
                                                "task_guide":"Aboba guide2", 
                                                "task_text":"Aboba Text2"}, 
                                                "task_type":2},
                                        {"id":17, 
                                            "task_content":{
                                                "task_guide":"Aboba guide3", 
                                                "task_text":"Aboba Text3"}, 
                                                "task_type":3},
                                        {"id":18, 
                                            "task_content":{
                                                "task_guide":"Aboba guide4", 
                                                "task_text":"Aboba Text4"}, 
                                                "task_type":4}]},]
        }
    }
    const findTaskByTaskTypeInVariant = (taskType, variant) =>{
        return variant.tasks.find(t => t.task_type === taskType)
    }
    /**
     * Функция клика на вариант задания,
     * необходима для получения варианта и работы с ним по клику
     * @param {*} i Индекс текущего варианта
     */
    const showTasksClick = (i) =>{
        const chosenVariant = testResponse.data.variants[i]
        console.log(chosenVariant.theme)
        setCurrentVariant(chosenVariant)
        if(currentTask !== undefined) setCurrentTask(findTaskByTaskTypeInVariant(currentTask.task_type, chosenVariant))
    }
    /**
     * Функция необходимая для отображения
     * контента отдельной задачи по клику
     * на кнопку задания
     * @param {*} task Задание
     * 
     */
    const showContentByTaskClick = (task) => {
        console.log(task.id)//exam false hook
        console.info("set false")
        setExamPicked(false)
        setCurrentTask(task)
    }
    const showContentByExamClick = () =>{
        //account token, currentVariant.id
        setExamPicked(true)
        console.info("set true")
    } 
    //Сделать отдельным компонентом дофига логики
    return (<>
        <div className="accountResultGrid">
            <VariantsSelection 
                variants={testResponse.data.variants} 
                showTasksClick = {showTasksClick}/>

            <TaskSelection  
                currentVariant = {currentVariant} 
                showContentByTaskClick = {showContentByTaskClick} 
                showContentByExamClick = {showContentByExamClick}/>

            {examPicked ? <ExamContentViewer variant={currentVariant} exams={undefined}/> : <TaskContentViewer task={currentTask}/>}

            <TaskResultsViewer/>
        </div>
    </>)
}