import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function List({ tasks, setTasks }) {
  const labelClassName =
    'rounded-full border border-[#c6c6c6] p-1 h-7 w-7 cursor-pointer text-[#fefefe] flex justify-center items-center';

  //useRef
  const editTaskNameRef = useRef();
  const editDeadlineRef = useRef();
  const divRef = useRef();

  //useState
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [editTaskNameId, setEditTaskNameId] = useState(null);
  const [editDeadlineId, setEditDeadlineId] = useState(null);
  const [IsCheckedCopmlete, setIsCheckedComplete] = useState(false);
  const [tmpTaskName, setTmpTaskName] = useState('');
  const [tmpDeadline, setTmpDeadline] = useState('');

  //useEffect

  //taskNameを編集するとき、inputをfocusする。
  useEffect(() => {
    if (editTaskNameId !== null) {
      editTaskNameRef.current?.focus();
    }
  }, [editTaskNameId]);

  //deadlineを編集するとき、inputをfocus,showする。
  useEffect(() => {
    if (editDeadlineId !== null) {
      editDeadlineRef.current?.focus();
      editDeadlineRef.current?.showPicker();
    }
  }, [editDeadlineId]);

  //checkがtrueになったとき、800sec経ったらdeleteTaskIdをnullに更新
  useEffect(() => {
    if (deleteTaskId === null) return;
    const tid = setTimeout(() => {
      setDeleteTaskId(null);
    }, 800);
    return () => clearTimeout(tid);
  }, [deleteTaskId]);

  //イベントハンドラー

  //タスク完了checkの更新(trueの場合はdeleteTaskIdを更新)
  const handlerfadeout = (task) => {
    //task.checkedをトグル
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, checked: !t.checked } : t))
    );

    //deleteTaskIdを更新
    if (!task.checked && !IsCheckedCopmlete) {
      setDeleteTaskId(task.id);
    }
  };

  //タスク削除
  const handlerdeleteTask = (id) => {
    setTasks((prev) => prev.filter((prevTask) => prevTask.id !== id));
  };

  //inputされるたびに、task.nameを更新
  const handlerChangeTaskName = (e, task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, name: e.target.value } : t))
    );
  };

  //inputされるたびに、task.deadlineを更新
  const handlerChangeDeadline = (e, task) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, deadline: e.target.value } : t
      )
    );
  };

  //タスク名編集モード
  const handlerEditTaskNameMode = (task) => {
    setTmpTaskName(task.name);
    setEditTaskNameId(task.id);
  };

  //期限日編集モード
  const handlerEditDeadlineMode = (task) => {
    // e.stopPropagation();
    setTmpDeadline(task.deadline);
    setEditDeadlineId(task.id);
  };

  const handleCompleteEditTaskName = (task) => {
    //空文字なら編集前のtaskに戻す
    if (task.name === '') {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, name: tmpTaskName } : t))
      );
      setEditTaskNameId(null);
      return;
    }
    setEditTaskNameId(null);
  };

  const handleCompleteEditDeadline = (task) => {
    //空文字なら編集前のtaskに戻す
    if (task.deadline === '') {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, deadline: tmpDeadline } : t
        )
      );
      setEditDeadlineId(null);
      return;
    }
    setEditDeadlineId(null);
  };
  return (
    <>
      <div className="p-8">
        <div className="p-4 mb-8 flex justify-end">
          <label>
            <input
              type="checkbox"
              className="mt-[3px] mr-[3px] mb-[3px] ml-[4px
              ]"
              onChange={() => setIsCheckedComplete((prev) => !prev)}
              checked={IsCheckedCopmlete}
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
            //deleteTaskIdを持つtaskはレンダーの際に、checkedがtrueになってしまい、fileterでopacity-0がつかないまま
            //除外されてしまうので、task.id === delelteTaskIdで弾かれないようにする。
            .filter((task) => {
              if (!IsCheckedCopmlete) {
                return !task.checked || task.id === deleteTaskId;
              }
              return true;
            })
            .map((task) => {
              return (
                <li key={task.id}>
                  <div
                    ref={divRef}
                    className={`${
                      deleteTaskId === task.id ? 'opacity-0' : ''
                    } flex items-center w-full border-b border-[#f0f0f0] transition-opacity duration-800`}
                  >
                    <div className="flex justify-center flex-1 p-4 border-r border-[#f0f0f0]">
                      <label
                        className={
                          task.checked
                            ? labelClassName + ' bg-[#7a72ff]'
                            : labelClassName
                        }
                      >
                        <input
                          type="checkbox"
                          className={'border-0 appearance-none absolute'}
                          onChange={() => handlerfadeout(task)}
                          checked={task.checked}
                        />
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="check"
                          className="svg-inline--fa fa-check"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="currentColor"
                            d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 
                               12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 
                               0-45.3s32.8-12.5 45.3 0L160 338.7 
                               393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                          />
                        </svg>
                      </label>
                    </div>
                    {editTaskNameId === task.id ? (
                      <div className="cursor-pointer flex-4 p-4 border-r border-[#f0f0f0]">
                        <input
                          type="text"
                          className="p-2 rounded-[8px] border border-[#f0f0f0] w-full"
                          value={task.name}
                          ref={editTaskNameRef}
                          onChange={(e) => handlerChangeTaskName(e, task)}
                          onBlur={() => {
                            handleCompleteEditTaskName(task);
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer flex-4 p-4 border-r border-[#f0f0f0]"
                        onClick={(e) => handlerEditTaskNameMode(e, task)}
                      >
                        {task.name}
                      </div>
                    )}
                    {editDeadlineId === task.id ? (
                      <input
                        type="date"
                        className="p-2 rounded-[8px] border border-[#f0f0f0] "
                        ref={editDeadlineRef}
                        onChange={(e) => handlerChangeDeadline(e, task)}
                        onBlur={() => {
                          handleCompleteEditDeadline(task);
                        }}
                      />
                    ) : (
                      <div
                        className="cursor-pointer flex-1 p-4 border-r border-[#f0f0f0]"
                        onClick={(e) => handlerEditDeadlineMode(e, task)}
                      >
                        {task.deadline}
                      </div>
                    )}
                    <div className="text-[12px] flex justify-center flex-1 p-4 border-r border-[#f0f0f0]">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="cursor-pointer"
                        onClick={() => handlerdeleteTask(task.id)}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
        </div>
      </div>
    </>
  );
}
