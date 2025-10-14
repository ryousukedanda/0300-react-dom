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
    } else {
      return;
    }
  };

  const updateTask = (editType, key, e) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editType.id ? { ...task, [key]: e.target.value } : task
      )
    );
  };

  const updateChecked = (task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, checked: !t.checked } : t))
    );
  };

  return (
    <div className="max-w-[986px] my-16 mx-auto">
      <Form onSubmit={addTask} />
      <List
        tasks={tasks}
        onDelete={deleteTask}
        onUpdateTask={updateTask}
        onUpdateChecked={updateChecked}
      />
    </div>
  );
}
