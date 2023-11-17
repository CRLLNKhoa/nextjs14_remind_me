"use client"
import React, { useEffect, useState } from "react";

export default function ProgressBar() {
    const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  }, []);

  const fillerStyles = {
    width: `${completed}%`,
  }
  return (
    <div className="relative pt-1">
    <div className="flex mb-2 items-center justify-between">
      <div>
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
          Đang tải danh sách công việc
        </span>
      </div>
      <div className="text-right">
        <span className="text-xs font-semibold inline-block text-emerald-600">
         {completed}%
        </span>
      </div>
    </div>
    <div className="overflow-hidden relative h-2 mb-4 text-xs flex rounded bg-emerald-200">
    <div style={fillerStyles} className={`h-2 rounded bg-emerald-600 absolute left-0 duration-500`}>
    </div>
    </div>
  </div>
  );
}
