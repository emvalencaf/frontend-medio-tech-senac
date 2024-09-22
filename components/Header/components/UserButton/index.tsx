import { IconType } from "react-icons";

export interface IUserMenuButton {
    Icon: IconType;
    label: string;
    onClick: () => void;
    showLabel?: boolean;
    children?: React.ReactNode;
}

const UserMenuButton: React.FC<IUserMenuButton> = ({Icon, label, onClick, children }, showLabel = false) => {
    return (
        <button className="relative" onClick={onClick}>
            <Icon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            <span>
                {!showLabel && label}
            </span>
            {children}
        </button>

    );
}

export default UserMenuButton;