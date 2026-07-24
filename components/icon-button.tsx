import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const IconButton = (props: IconButtonProps) => {
  const { onClick, className, icon } = props;
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center bg-white border-shadow-md p-2 hover:scale-110 transition cursor-pointer",
        className
      )}
    >
      {icon}
    </button>
  );
};
export default IconButton;
