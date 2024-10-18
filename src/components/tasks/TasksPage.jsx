import './css/tasks.css'

import './css/tasks_content.css'
import './css/tasks_title.css'
import './css/tasks_card.css'
import './css/tasks_media.css'
import './css/tasks_more.css'

import { Header } from '../header/Header'
import { TasksContent } from './TasksContent'
import { useEffect, useState } from 'react'
import { getVariantsData } from '../../modules/api/variant/VariantApi'

const TasksPage = () => {
    const [variants, setVariants] = useState(undefined);
    useEffect(()=>{
        const fetchData = async () => {
            const response = await getVariantsData();
            setVariants(response.data);
        }
        fetchData()
    },[])
    return (<>
        <div className='tasksWrapper'>
            <Header/>
            <TasksContent variants={variants}/>
        </div>
    </>)
}

export default TasksPage