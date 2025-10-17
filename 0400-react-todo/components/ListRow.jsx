import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

const labelClassName =
  'rounded-full border border-[#c6c6c6] p-1 h-7 w-7 cursor-pointer text-[#fefefe] flex justify-center items-center';

export default function ListRow({ task, onDelete, onEdit, isCheckedCopmlete }) {
  const containerRef = useRef(null);
  const checkLabelRef = useRef(null);

  // const handleCompleteEditTaskName = (e, prevValue) => {
  //   //空なら前の値に戻す
  //   if (!e.target.value) {
  //     onEdit({ ...task, name: prevValue });
  //     return;
  //   }
  // };

  // const handleCompleteEditDeadline = (e, prevValue) => {
  //   //空なら前の値に戻す
  //   if (!e.target.value) {
  //     onEdit({ ...task, deadline: prevValue });
  //     return;
  //   }
  // };

  const handleCompleteEditTaskName = (e) => {
    if (!e.target.value) {
      return;
    }
    onEdit({ ...task, name: e.target.value });
  };

  const handleCompleteEditDeadline = (e) => {
    if (!e.target.value) {
      return;
    }
    onEdit({ ...task, deadline: e.target.value });
  };

  const handleCompleteTask = () => {
    //isCheckedCopmleteがtrue
    if (isCheckedCopmlete) {
      onEdit({ ...task, checked: !task.checked });
      return;
    }
    //off->on && isCheckedCopmleteがfalse
    if (!task.checked) {
      checkLabelRef.current.classList.add('bg-[#7a72ff]');
      containerRef.current.classList.add('opacity-0');
      // アニメーションを見せたいので 800ms 遅延させる
      setTimeout(() => {
        onEdit({ ...task, checked: !task.checked });
      }, 800);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center w-full border-b border-[#f0f0f0] transition-opacity duration-800"
    >
      <div className="flex justify-center flex-1 p-4 border-r border-[#f0f0f0]">
        <label
          ref={checkLabelRef}
          className={
            task.checked ? labelClassName + ' bg-[#7a72ff]' : labelClassName
          }
        >
          <input
            type="checkbox"
            className={'border-0 appearance-none absolute'}
            onChange={handleCompleteTask}
            checked={task.checked}
          />
          <FontAwesomeIcon icon={faCheck} />
        </label>
      </div>
      <div className="cursor-pointer flex-4 p-4 border-r border-[#f0f0f0]">
        <EdiableField
          value={task.name}
          // onChange={(e) => onEdit({ ...task, name: e.target.value })}
          // onBlur={(e, prevValue) => handleCompleteEditTaskName(e, prevValue)}
          onBlur={handleCompleteEditTaskName}
        />
      </div>
      <div className="cursor-pointer flex-1 p-4 border-r border-[#f0f0f0]">
        <EdiableField
          value={task.deadline}
          type={'date'}
          // onChange={(e) => onEdit({ ...task, deadline: e.target.value })}
          // onBlur={(e, prevValue) => handleCompleteEditDeadline(e, prevValue)}
          onBlur={handleCompleteEditDeadline}
        />
      </div>
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

function EdiableField({ value, onBlur, type = 'text' }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef();
  const prevValueRef = useRef(value);

  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e);
    }
    setIsEditing(false);
  };

  const handleStartEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current.focus();
      if (type === 'date') {
        inputRef.current.showPicker();
      }
    });
  };

  return (
    <div onClick={handleStartEditing}>
      {isEditing ? null : value}
      <input
        type={type}
        className={`p-2 rounded-[8px] border border-[#f0f0f0] w-full ${
          isEditing ? '' : 'hidden'
        }`}
        defaultValue={value}
        ref={inputRef}
        // onChange={(e) => onChange(e)}
        onBlur={handleBlur}
      />
    </div>
  );
}
