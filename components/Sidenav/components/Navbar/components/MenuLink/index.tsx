import Link from "next/link";

import { IconType } from "react-icons";

export interface IMenuLink {
    Icon: IconType;
    href: string;
    label: string;
}

const MenuLink: React.FC<IMenuLink> = ({ Icon, label, href }) => {
    return (
        <li className="p-4 hover:bg-purple-700 rounded-l-full">
            <Link href={href} className="flex items-center space-x-3">
                    <Icon />
                    <span>{label}</span>
            </Link>
        </li>
    );
}

export default MenuLink;