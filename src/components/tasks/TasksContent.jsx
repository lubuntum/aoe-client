import { TasksTitle } from './TasksTitile'
import { TasksCard } from './TasksCard'
import { TasksMore } from './TasksMore'

export const TasksContent = () => {
    return (<>
        <div className='tasksContentWrapper'>
            <TasksTitle/>
            <div className='tasksCardsGrid'>
                <TasksCard/>
                <TasksCard/>
                <TasksCard/>
                <TasksCard/>
                <TasksCard/>
                <TasksCard/>
                <TasksCard/>
                <TasksCard/>
                <TasksCard/>
            </div>
            <TasksMore/>
        </div>
    </>)
}