import { FaBell, FaCog, FaDoorOpen, FaSignOutAlt } from "react-icons/fa";
import { IUserMenuButton } from "../components/Header/components/UserButton";
import { handleSignOut } from "../actions/auth";
import { redirect } from "next/navigation";

export const userMenuButtons: IUserMenuButton[] = [
    {
        Icon: FaBell,
        label: 'Alertas',
        onClick: () => {},
    },
    {
        Icon: FaCog,
        label: 'Configurações',
        onClick: () => {},
    },
];
