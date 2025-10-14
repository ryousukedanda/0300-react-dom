import React, { useState } from 'react';
import ListRow from './ListRow';

export default function List({
  tasks,
  onDelete,
  onUpdateTask,
  onUpdateChecked,
}) {
  const [isCheckedCopmlete, setIsCheckedComplete] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  return (
    <div className="p-8">
      <div className="p-4 mb-8 flex justify-end">
        <label>
          <input
            type="checkbox"
            className="mt-[3px] mr-[3px] mb-[3px] ml-[4px]"
            onChange={() => setIsCheckedComplete((prev) => !prev)}
            checked={isCheckedCopmlete}
          />
          完了タスクを表示
        </label>
      </div>
      <div className="flex items-center border-b border-[#f0f0f0] text-[12px]">
        <div className="flex-1 py-2 px-4 border-r border-[#f0f0f0] text-[12px]"></div>
        <div className="flex-4 py-2 px-4 border-r border-[#f0f0f0] text-[12px]">
          タスク
        </div>
        <div className="flex-1 py-2 px-4 border-r border-[#f0f0f0] text-[12px]">
          期限日
        </div>
        <div className="border-r-0 flex-1 py-2 px-4 text-[12px]"></div>
      </div>
      <div className="list-none p-0">
        {[...tasks]
          .sort((a, b) => {
            return (
              new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
            );
          })
          .filter((task) => {
            if (!isCheckedCopmlete) {
              return !task.checked || task.id === deleteTaskId;
            }
            return true;
          })
          .map((task) => {
            return (
              <li key={task.id}>
                <ListRow
                  isCheckedCopmlete={isCheckedCopmlete}
                  task={task}
                  deleteTaskId={deleteTaskId}
                  setDeleteTaskId={setDeleteTaskId}
                  onDelete={onDelete}
                  onUpdateTask={onUpdateTask}
                  onUpdateChecked={onUpdateChecked}
                />
              </li>
            );
          })}
      </div>
    </div>
  );
}
