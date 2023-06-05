import React from 'react'
import { TaskList } from './components/tasksList/taskList'
import { SmthList } from './components/samplesList/smthList'

import './styles/main.css'

export const Main=()=>{
    return(
        <div className='content'>
            <div className='main_layout'>
                <TaskList/>
                <SmthList/>
            </div>
        </div>
    )
}