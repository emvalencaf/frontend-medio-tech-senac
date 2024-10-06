// components from Navbar
import MenuLinks from "./components/MenuLinks";


const NavBar: React.FC = () => {
    return (
        <nav className="flex-1 overflow-y-auto">
            <MenuLinks />
        </nav>
    );
};

export default NavBar;
