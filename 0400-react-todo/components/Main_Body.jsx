import React, { useState } from 'react';
import Form from './Form';
import List from './List';

export default function Main_Body() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Task 1',
      deadline: '2025-11-07',
      checked: false,
    },
    {
      id: 2,
      name: 'Task 2',
      deadline: '2025-12-07',
      checked: false,
    },
    {
      id: 3,
      name: 'Task 3',
      deadline: '2025-01-07',
      checked: false,
    },
  ]);
  return (
    <>
      <div className="max-w-[986px] my-16 mx-auto">
        <Form tasks={tasks} setTasks={setTasks} />
        <List tasks={tasks} setTasks={setTasks} />
      </div>
    </>
  );
}
