import './css/tasks.css'

import './css/tasks_content.css'
import './css/tasks_title.css'
import './css/tasks_card.css'
import './css/tasks_media.css'
import './css/tasks_more.css'

import { Header } from '../header/Header'
import { TasksContent } from './TasksContent'

const TasksPage = () => {
    return (<>
    <div className='tasksWrapper'>
        <Header/>
        <TasksContent/>
    </div>
    </>)
}

export default TasksPage