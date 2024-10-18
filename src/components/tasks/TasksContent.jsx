import { TasksTitle } from './TasksTitile'
import { TasksCard } from './TasksCard'
import { TasksMore } from './TasksMore'

export const TasksContent = ({variants}) => {
    return (<>
        <div className='tasksContentWrapper'>
            <TasksTitle/>
            
            {variants ? 
            (<>
                <div className='tasksCardsGrid'>
                    {variants.map((variant, i)=>(
                        <TasksCard variant={variant} index={i+1}/>
                    ))}
                </div>
                <TasksMore/> 
            </>)
             : <p>Ошибка загрузки вариантов, обновите страницу</p>}
        </div>
    </>)
}