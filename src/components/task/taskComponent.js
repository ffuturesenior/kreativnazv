import * as React from 'react';
import {
  DetailsList,
  SelectionMode,
  Stack,
  Checkbox,
  DefaultPalette,
  DetailsListLayoutMode,
  IColumn,
  Icon,
  TextField,
} from '@fluentui/react';

import './task.css';

export const TaskComponent = () => {
  const tasks = [
    {
      key: '1',
      taskName: 'Task 1',
      taskOwner: 'John Doe',
      status: false,
    },
    {
      key: '6',
      taskName: 'Task 2',
      taskOwner: null,
      status: true,
    },
    {
      key: '7',
      taskName: 'Task 3',
      taskOwner: 'Bob Johnson',
      status: false,
    },
    {
        key: '1313',
        taskName: 'Task 4',
        taskOwner: 'John Doe',
        status: false,
      },
      {
        key: '1313313',
        taskName: 'Task 52',
        taskOwner: null,
        status: true,
      },
      {
        key: '1111',
        taskName: 'Task 6',
        taskOwner: 'Bob Johnson',
        status: false,
      },
    // Add more tasks as needed
  ];

  const [items, setItems] = React.useState(tasks);
  const [sortedItems,setSortedItems]=React.useState(items)
  const [isSorted,setIsSorted]=React.useState(false)
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
      isSorted: false,
      isSortedDescending: false,
      onRender: (item) => (
        <div>{item.taskOwner ? item.taskOwner : 'unassigned'}</div>
      ),
      // Render the sort arrow based on the sorting state
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'status',
      minWidth: 100,
      maxWidth: 150,
      onColumnClick: (ev, column) => {
        const sortedItems =
        setSortedItems(
            items.slice(0).sort((a, b) => {
                if (a.status === b.status) {
                return 0;
                }
                if (a.status) {
                return -1; // True values come before false values
                }
                return 1; // False values come after true values
            })
        )
        setIsSorted(!isSorted)
      },
      onRenderColumnHeaderTooltip: (tooltipHostProps) => {
        return (
          <div>
            {tooltipHostProps.children}
            {tooltipHostProps.column?.isSorted ? (
              tooltipHostProps.column?.isSortedDescending ? (
                <Icon iconName="SortDown" />
              ) : (
                <Icon iconName="SortUp" />
              )
            ) : null}
          </div>
        );
      },
      onRender: (item) => (
        <div
          className={item.status ? 'open' : 'close'}
          onClick={() => onCheckboxChange(item)}
        >
          {item.status ? 'open' : 'closed'}
        </div>
      ),
    },
  ];

  const onFilter=(str)=>{
    if(str.length>1){setIsSorted(true)}
    if(str.length==0){setIsSorted(false)}
    const arr=items.filter(item => item.taskName.toLowerCase().includes(str.toLowerCase()));
    setSortedItems(arr)
  }
  const textFieldStyles= { root: { maxWidth: '300px' } };
  return (
    <Stack tokens={{ padding: 20 }}>
      <TextField
          label="Filter by name:"
          onChange={(e)=>onFilter(e.target.value)}
          styles={textFieldStyles}
        />
      <DetailsList
        items={isSorted?sortedItems:items}
        columns={columns}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
      />
    </Stack>
  );
};