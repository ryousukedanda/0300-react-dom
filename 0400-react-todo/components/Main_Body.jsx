import React, { useState } from 'react';
import Form from './Form';
import List from './List';

export default function Main_Body() {
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  return (
    <>
      <div className="max-w-[986px] my-16 mx-auto">
        <Form />
        <List />
      </div>
    </>
  );
}
