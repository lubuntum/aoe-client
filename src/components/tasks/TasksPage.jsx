import '../../App.css'
import './css/tasks.css'
import './css/tasks_content.css'
import './css/tasks_card.css'
import './css/tasks_media.css'
import './css/tasks_more.css'

import { Header } from '../header/Header'
import { TasksContent } from './TasksContent'
import { useEffect, useState } from 'react'
import { getVisibleVariants } from '../../modules/api/variant/VariantApi'

const TasksPage = () => {
    const [variants, setVariants] = useState(undefined);
    useEffect(()=>{
        const fetchData = async () => {
            const response = await getVisibleVariants();
            setVariants(response.data);
        }
        fetchData()
    },[])

    return (<>
        <div className='sectionWrapper'>
            <div className='contentWrapper'>
                <div className='tasksWrapper'>
                    <Header/>
                    <TasksContent variants={variants}/>
                </div>
            </div>
        </div>

    </>)
}

export default TasksPage