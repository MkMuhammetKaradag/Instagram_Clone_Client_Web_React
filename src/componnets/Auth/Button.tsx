import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button = ({ type = "submit", children, ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      {...props}
      className="h-[32px] mt-1 w-full flex  items-center px-4  justify-center gap-x-2 rounded-sm font-semibold bg-brand text-white text-sm disabled:opacity-50"
    >
      {children}
    </button>
  );
};

export default Button;
