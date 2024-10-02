import { IconType } from "react-icons";

export interface IActionButton {
    Icon: IconType;
    label: string;
    handleClick: () => void;
    className?: string;
}

const ActionButton: React.FC<IActionButton> = ({ handleClick, label, Icon, className }) => {
    return (
        <button
            type="button"
            className={`flex border rounded-md p-2 items-center justify-center gap-1.5 hover:border-green-400 ${className}`}
            onClick={handleClick}
        >
            <Icon className="text-xl" />
            <span>
                {label}
            </span>
        </button>
    );
}

export default ActionButton;