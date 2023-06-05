import React from "react";

import '../../styles/taskList.css'
import { TaskComponent } from "../../../../components/task/taskComponent";

export const TaskList=()=>{
    
    return(
        <div className="task">
            <h1 className="task_title">Tasks</h1>
            <TaskComponent/>
        </div>
    )
}