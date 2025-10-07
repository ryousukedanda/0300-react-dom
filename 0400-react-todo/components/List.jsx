import React from 'react';

export default function List() {
  return (
    <>
      <div className="p-8">
        <div className="p-4 mb-8 flex justify-end">
          <label>
            <input
              type="checkbox"
              className="mt-[3px] mr-[3px] mb-[3px] ml-[4px
              ]"
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
        <div className="list-none p-0"></div>
      </div>
    </>
  );
}
