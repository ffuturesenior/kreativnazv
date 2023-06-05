import React from 'react'
import { DetailsList, SelectionMode, Stack, Checkbox, DefaultPalette } from '@fluentui/react';

import './task.css'

export const TaskComponent=()=>{
    const tasks = [
        {
        key: '1',
        taskName: 'Task 1',
        taskOwner: 'John Doe',
        status: false,
        },
        {
        key: '2',
        taskName: 'Task 2',
        taskOwner: null,
        status: true,
        },
        {
        key: '3',
        taskName: 'Task 3',
        taskOwner: 'Bob Johnson',
        status: false,
        },
        // Add more tasks as needed
    ];

    const [items, setItems] = React.useState(tasks);

    const onCheckboxChange = (item) => {
        const updatedItems = items.map((i) => {
        if (i.key === item.key) {
            return { ...i, status: !i.status };
        }
        return i;
        });
        setItems(updatedItems);
    };

    const columns = [
        {
        key: 'taskName',
        name: 'Task Name',
        fieldName: 'taskName',
        minWidth: 150,
        maxWidth: 300,
        },
        {
        key: 'taskOwner',
        name: 'Task Owner',
        fieldName: 'taskOwner',
        minWidth: 150,
        maxWidth: 300,
        onRender:(item)=>(
            <div>{item.taskOwner?item.taskOwner:'unnasigned'}</div>
        )

        },
        {
        key: 'status',
        name: 'Status',
        fieldName: 'status',
        minWidth: 100,
        maxWidth: 150,
        onRender: (item) => (
            <div className={item.status?'open':'close'}
            checked={item.status}
            onClick={() => onCheckboxChange(item)}
            > 
            {item.status ? 'open' : 'closed'}
            </div>
        ),
        },
    ];

    return (
        <Stack tokens={{ padding: 20 }}>
        <DetailsList
            items={items}
            columns={columns}
            selectionMode={SelectionMode.none}
        />
        </Stack>
    );
}