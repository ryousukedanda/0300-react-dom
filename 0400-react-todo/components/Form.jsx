import React from 'react';

export default function form() {
  return (
    <>
      <form className="py-2 px-4 mb-8 border border-[#f0f0f0] rounded-[8px]">
        <div className="flex">
          <div className="flex-4 py-2 px-4">
            <label className="block text-[12px] mb-1">タスク</label>
            <input
              type="text"
              name="name"
              className="p-2 rounded-[8px] border border-[#f0f0f0] w-full"
              placeholder="タスク名入力"
            />
          </div>
          <div className="flex-1 py-2 px-4">
            <label className="block text-[12px] mb-1">期限日</label>
            <input
              type="date"
              className="p-2 rounded-[8px] border border-[#f0f0f0] w-full"
            />
          </div>
        </div>
        <div className="p-4 flex justify-end">
          <button className="bg-[#7a72ff] text-[#fefefe] border-0 cursor-pointer rounded-[8px] py-2 px-8 text-[14px] tracking-[.1rem]">
            追加
          </button>
        </div>
      </form>
    </>
  );
}
