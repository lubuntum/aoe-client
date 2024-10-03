import "./css/variants_result.css"

import { VariantsSelection } from "./VariantsSelection"
import { TaskSelection } from "./TasksSelection"
import { ContentViewer } from "./ContentViewer"

export const VariantsResults = () =>{
    /**
     * Данные которые будут подсасываться через useEffect
     */
    const testResponse = {
        "data" : {
            "variants": [{"id":1, "theme":"someTheme1", 
                            "tasks": [{"id":1, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":2, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":3, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":4, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},
                        {"id":5, "theme":"someTheme5", 
                            "tasks": [{"id":7, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":8, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":9, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":10, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},
                        {"id":7, "theme":"someTheme7", 
                            "tasks": [{"id":15, 
                                        "task_content":{"task_guide":"Aboba guide1", "task_text":"Aboba Text1"}},
                                        {"id":16, 
                                            "task_content":{"task_guide":"Aboba guide2", "task_text":"Aboba Text2"}},
                                        {"id":17, 
                                            "task_content":{"task_guide":"Aboba guide3", "task_text":"Aboba Text3"}},
                                        {"id":18, 
                                            "task_content":{"task_guide":"Aboba guide4", "task_text":"Aboba Text4"}}]},]
        }
    }
    const showTasksClick = (i) =>{
        const chosenVariant = testResponse.data.variants[i]
        console.log(chosenVariant.theme)
        //Дописать в хуке
    }
    //Сделать отдельным компонентом дофига логики
    return (<>
        <div className="resultTitle">Пройденные варианты</div>
        <div className="resultContainer">
            <VariantsSelection variants={testResponse.data.variants}/>
            <TaskSelection/>
            <ContentViewer/>
        </div>
    </>)
}