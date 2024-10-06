"use client";

import { useSession } from "next-auth/react";
import { menuLinks } from "../../../../../../constants/menuLinks";
import MenuLink from "../MenuLink";
import { extractUserTypeFromBackEndToken } from "../../../../../../utils";

const MenuLinks: React.FC = () => {
    const session = useSession();
    const userType = extractUserTypeFromBackEndToken(String(session.data?.backendToken));

    return (
        <ul className="pl-4 md:pl-8 space-y-2"> {/* Ajuste de padding e espaçamento vertical */}
            {menuLinks.map(menuLink => {
                if (menuLink.href === '/usuarios' && userType !== 'COORDINATOR')
                    return null;

                return <MenuLink key={menuLink.href} {...menuLink} />
            })}
        </ul>
    );
};

export default MenuLinks;
