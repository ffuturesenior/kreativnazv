import React  from "react";

import '../../styles/smth.css'
import { TaskComponent } from "../../../../components/task/taskComponent";

export const SmthList=()=>{
    
    return(
        <div className='samples'>
            <h1 className="samples_title">
                Sapmles
            </h1>
            <h1 className="task_title">
                tasks
            </h1>
            <TaskComponent/>
        </div>
    )
    
}