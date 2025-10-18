import React, { useState } from 'react';

export default function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split('T')[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      return alert('タスク名を入力してください');
    }
    if (!deadline) {
      return alert('期限日を入力してください');
    }
    onSubmit(name, deadline);
    setName('');
    setDeadline('');
  };

  return (
    <form
      className="py-2 px-4 mb-8 border border-[#f0f0f0] rounded-[8px]"
      onSubmit={handleSubmit}
    >
      <div className="flex">
        <div className="flex-4 py-2 px-4">
          <label className="block text-[12px] mb-1">タスク</label>
          <input
            type="text"
            name="name"
            value={name}
            className="p-2 rounded-[8px] border border-[#f0f0f0] w-full"
            placeholder="タスク名入力"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex-1 py-2 px-4">
          <label className="block text-[12px] mb-1">期限日</label>
          <input
            type="date"
            name="deadline"
            value={deadline}
            className="p-2 rounded-[8px] border border-[#f0f0f0] w-full"
            placeholder="期限日を入力"
            onChange={(e) => {
              setDeadline(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="p-4 flex justify-end">
        <button className="bg-[#7a72ff] text-[#fefefe] border-0 cursor-pointer rounded-[8px] py-2 px-8 text-[14px] tracking-[.1rem]">
          追加
        </button>
      </div>
    </form>
  );
}
