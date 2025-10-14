import React, { useEffect, useRef, useState } from 'react';
import CheckIcon from './CheckIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

//定数
const labelClassName =
  'rounded-full border border-[#c6c6c6] p-1 h-7 w-7 cursor-pointer text-[#fefefe] flex justify-center items-center';

export default function ListRow({
  isCheckedCopmlete,
  task,
  deleteTaskId,
  setDeleteTaskId,
  onDelete,
  onUpdateTask,
  onUpdateChecked,
}) {
  //useRef
  const editTaskNameRef = useRef();
  const editDeadlineRef = useRef();

  //useState
  const [editName, setEditName] = useState({});
  const [editDeadline, setEditDeadline] = useState({});

  //useEffect

  //checkがtrueになったとき、800sec経ったらdeleteTaskIdをnullに更新
  useEffect(() => {
    if (deleteTaskId === null) return;
    const tid = setTimeout(() => {
      setDeleteTaskId(null);
    }, 800);
    return () => clearTimeout(tid);
  }, [deleteTaskId]);

  //タスク完了checkの更新(trueの場合はdeleteTaskIdを更新)
  const handlefadeout = (task) => {
    //task.checkedをトグル
    onUpdateChecked(task);

    //deleteTaskIdを更新
    if (!task.checked && !isCheckedCopmlete) {
      setDeleteTaskId(task.id);
    }
  };

  //タスク名編集モード
  const handleEditName = (task) => {
    setEditName(task);
    editTaskNameRef.current?.focus();
  };

  //期限日編集モード
  const handleEditDeadline = (task) => {
    setEditDeadline(task);
    editDeadlineRef.current?.focus();
    editDeadlineRef.current?.showPicker();
  };

  const handleCompleteEditTaskName = (e, editName) => {
    if (!e.target.value) {
      setEditName(null);
      return;
    }
    //値があるなら、tasksを編集後に更新
    onUpdateTask(editName, 'name', e);
    setEditName(null);
  };

  const handleCompleteEditDeadline = (e, editDeadline) => {
    if (!e.target.value) {
      setEditDeadline(null);
      return;
    }
    //値があるなら、tasksを編集後に更新
    onUpdateTask(editDeadline, 'deadline', e);
    setEditDeadline(null);
  };

  return (
    <div
      className={`${
        deleteTaskId === task.id ? 'opacity-0' : ''
      } flex items-center w-full border-b border-[#f0f0f0] transition-opacity duration-800`}
    >
      <div className="flex justify-center flex-1 p-4 border-r border-[#f0f0f0]">
        <label
          className={
            task.checked ? labelClassName + ' bg-[#7a72ff]' : labelClassName
          }
        >
          <input
            type="checkbox"
            className={'border-0 appearance-none absolute'}
            onChange={() => handlefadeout(task)}
            checked={task.checked}
          />
          <FontAwesomeIcon icon={faCheck} />
        </label>
      </div>
      {editName?.id === task.id ? (
        <div className="cursor-pointer flex-4 p-4 border-r border-[#f0f0f0]">
          <input
            type="text"
            className="p-2 rounded-[8px] border border-[#f0f0f0] w-full"
            defaultValue={editName.name}
            ref={editTaskNameRef}
            onBlur={(e) => {
              handleCompleteEditTaskName(e, editName);
            }}
          />
        </div>
      ) : (
        <div
          className="cursor-pointer flex-4 p-4 border-r border-[#f0f0f0]"
          onClick={() => handleEditName(task)}
        >
          {task.name}
        </div>
      )}
      {editDeadline?.id === task.id ? (
        <input
          type="date"
          className="p-2 rounded-[8px] border border-[#f0f0f0] "
          defaultValue={editDeadline.deadline}
          ref={editDeadlineRef}
          onBlur={(e) => {
            handleCompleteEditDeadline(e, editDeadline);
          }}
        />
      ) : (
        <div
          className="cursor-pointer flex-1 p-4 border-r border-[#f0f0f0]"
          onClick={() => handleEditDeadline(task)}
        >
          {task.deadline}
        </div>
      )}
      <div className="text-[12px] flex justify-center flex-1 p-4 border-r border-[#f0f0f0]">
        <FontAwesomeIcon
          icon={faTrash}
          className="cursor-pointer"
          onClick={() => onDelete(task.id)}
        />
      </div>
    </div>
  );
}
