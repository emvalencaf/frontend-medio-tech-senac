import Link from "next/link";

import { IconType } from "react-icons";

export interface IMenuLink {
    Icon: IconType;
    href: string;
    label: string;
}

const MenuLink: React.FC<IMenuLink> = ({ Icon, label, href }) => {
    return (
        <li className="p-2 md:p-4 hover:bg-purple-700 rounded-l-full">
            <Link href={href} className="flex items-center space-x-2 md:space-x-3">
                <Icon className="w-5 h-5 md:w-6 md:h-6" /> {/* Ajustar o tamanho do ícone */}
                <span className="text-sm md:text-base">{label}</span> {/* Ajustar o tamanho do texto */}
            </Link>
        </li>
    );
};


export default MenuLink;
