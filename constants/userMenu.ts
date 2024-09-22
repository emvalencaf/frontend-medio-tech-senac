import { FaBell, FaCog, FaDoorOpen } from "react-icons/fa";
import { IUserMenuButton } from "../components/Header/components/UserButton";

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
    {
        Icon: FaDoorOpen,
        label: 'Sair',
        onClick: () => {},
    },
];
