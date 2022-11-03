import React from "react";

type SeparatorProps = {
  label?: string;
};
const Separator = ({ label = "OR" }: SeparatorProps) => {
  return (
    <div className="flex items-center my-3.5">
      <div className="h-px bg-gray-300 flex-1 "></div>
      <span className="px-4 text-xs font-semibold text-gray-600">{label}</span>
      <div className="h-px bg-gray-300 flex-1 "></div>
    </div>
  );
};

export default Separator;
