import React, { useState } from 'react';
import Form from './Form';
import List from './List';

const initialTasks = [
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
];

export default function Body() {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (name, deadline) => {
    setTasks((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name,
        deadline,
        checked: false,
      },
    ]);
  };

  const deleteTask = (id) => {
    if (confirm('このタスクを削除しますか?')) {
      setTasks((prev) => prev.filter((prevTask) => prevTask.id !== id));
    }
  };

  const updateTask = (task) => {
    setTasks((prev) => prev.map((it) => (it.id === task.id ? task : it)));
  };

  return (
    <div className="max-w-[986px] my-16 mx-auto">
      <Form onSubmit={addTask} />
      <List tasks={tasks} onDelete={deleteTask} onEdit={updateTask} />
    </div>
  );
}
