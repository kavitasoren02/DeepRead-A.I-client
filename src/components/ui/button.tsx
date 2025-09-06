import type { ButtonProps } from "../../Service/interface";

const Button = ({ active, onClick, children }: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300
        ${active ? "bg-white shadow-md" : "bg-gray-200 opacity-70"} 
        p-2 lg:p-5 rounded-xl flex items-center justify-center gap-2 lg:gap-4`}
    >
      {children}
    </div>
  );
};

export default Button;
