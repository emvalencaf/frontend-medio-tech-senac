import { menuLinks } from "../../../../../../constants/menuLinks";
import MenuLink from "../MenuLink";

const MenuLinks: React.FC = () => {
    return (
        <ul className="pl-14">
            {menuLinks.map(menuLink => <MenuLink key={menuLink.href} {...menuLink} />)}
        </ul>
    );
}

export default MenuLinks;