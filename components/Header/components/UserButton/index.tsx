"use client";

import { useSession } from "next-auth/react";
import { IconType } from "react-icons";

export interface IUserMenuButton {
    Icon: IconType;
    label: string;
    onClick: (token?: string) => void | Promise<void>;
    showLabel?: boolean;
    children?: React.ReactNode;
}

const UserMenuButton: React.FC<IUserMenuButton> = ({Icon, label, onClick, children }, showLabel = false) => {
    const session = useSession();

    const token = session.data?.backendToken;

    const handleClick = () => {
        console.log('aqui tá funcionando ao menos?')
        if (label === "Sair")
            onClick(token);
    }

    return (
        <button className="relative" onClick={handleClick}>
            <Icon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            <span>
                {!showLabel && label}
            </span>
            {children}
        </button>

    );
}

export default UserMenuButton;