// icons
import { FaBell, FaCog } from "react-icons/fa"; // Importação de ícones

// components of Header
import AvatarProfile from "./components/AvatarProfile";
import UserMenu from "./components/UserMenu";
import { IconType } from "react-icons";

// interfaces
export interface IHeader {
    title: string;
    Icon: IconType;
}

const Header: React.FC<IHeader> = ({ title, Icon }) => {
    return (
        <header className="flex justify-between items-center py-4 px-6 w-full bg-white shadow-md">
            {/* Título da Página */}
            <h1 className="text-2xl font-semibold text-gray-800 flex items-center justify-center">{title} <Icon /></h1>
            <UserMenu />
        </header>
    );
}

export default Header;