import { FaBook, FaBullhorn, FaHome, FaMoneyBillAlt, FaUser, FaUsers } from "react-icons/fa";
import { IMenuLink } from "../components/Sidenav/components/Navbar/components/MenuLink";
import { SiGoogleclassroom } from "react-icons/si";

export const menuLinks: IMenuLink[] = [
    {
        href: "/",
        Icon: FaHome,
        label: "Dashboard",
    },
    {
        href: "/usuarios",
        Icon: FaUsers,
        label: "Estudantes"
    },
    {
        href: '/disciplinas',
        Icon: FaBook,
        label: 'Disciplinas',
    },
    {
        href: "/turmas",
        Icon: SiGoogleclassroom,
        label: "Turmas"
    },
    {
        href: "/financeiro",
        Icon: FaMoneyBillAlt,
        label: "Financeiro",
    },
    {
        href: "/usuarios",
        Icon: FaUser,
        label: "Usuários",
    },
    {
        Icon: FaBullhorn,
        label: 'Comunicados',
        href: '/comunicados'
    },
];