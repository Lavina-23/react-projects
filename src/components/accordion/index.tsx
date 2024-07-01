// single selection accordion

import { useState } from "react";
import "../../App.css";
import data from "./data";

export default function Accordion() {
  const [selected, setSelected] = useState<string | null>(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState<string[]>([]);

  function handleSingleSelection(getCurrentId: string) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId: string) {
    const cpyMultiple = [...multiple];
    const findCurrentId = cpyMultiple.indexOf(getCurrentId);

    if (findCurrentId === -1) cpyMultiple.push(getCurrentId);
    else cpyMultiple.splice(findCurrentId, 1);

    setMultiple(cpyMultiple);
  }

  console.log(multiple);

  return (
    <div className="flex flex-col gap-4 justify-center items-center max-h-full min-h-[100vh] pt-[20px]">
      <h1 className="text-5xl font-bold text-black">Accordion</h1>
      <button
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
        className="bg-blue-50 shadow p-2 rounded-lg text-xs font-bold focus:outline-none"
      >
        {enableMultiSelection
          ? "Enable Single Selection"
          : "Enable Multi Selection"}
      </button>
      <div className="max-w-lg">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div
              key={dataItem.id}
              onClick={
                enableMultiSelection
                  ? () => handleMultiSelection(dataItem.id)
                  : () => handleSingleSelection(dataItem.id)
              }
              className="cursor-pointer text-left"
            >
              <div className="bg-blue-50 flex justify-between p-4 mt-4 rounded-lg">
                <h1 className="text-xl text-black font-bold">
                  {dataItem.question}
                </h1>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`size-6 ${
                      selected === dataItem.id ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="bg-blue-50 mt-[-8px] mb-4 rounded-b-lg rounded-t-none p-4">
                      {dataItem.answer}
                    </div>
                  )
                : selected === dataItem.id && (
                    <div className="bg-blue-50 mt-[-8px] mb-4 rounded-b-lg rounded-t-none p-4">
                      {dataItem.answer}
                    </div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found !</div>
        )}
      </div>
    </div>
  );
}
