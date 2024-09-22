import { FaBullhorn, FaCalendarAlt, FaChalkboardTeacher, FaHome, FaMoneyBillAlt, FaUser, FaUsers } from "react-icons/fa";
import { IMenuLink } from "../components/Sidenav/components/Navbar/components/MenuLink";

export const menuLinks: IMenuLink[] = [
    {
        href: "/dashboard",
        Icon: FaHome,
        label: "Dashboard",
    },
    {
        href: "/estudantes",
        Icon: FaUsers,
        label: "Estudantes"
    },
    {
        href: "/professores",
        Icon: FaChalkboardTeacher,
        label: "Professores"
    },
    {
        href: "/gerenciar-turma",
        Icon: FaCalendarAlt,
        label: "Gerenciar Turma"
    }
    , {
        href: "/calendario",
        Icon: FaCalendarAlt,
        label: "Calendário"
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