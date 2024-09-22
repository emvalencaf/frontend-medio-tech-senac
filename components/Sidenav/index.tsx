import React from 'react';

// custom components from sidenav
import SideNavHeader from './components/SideNavHeader';
import SideNavFooter from './components/SideNavFooter';

// icons
import NavBar from './components/Navbar';

const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 h-screen bg-purple-900 text-white flex flex-col">
            <SideNavHeader title="MedioTec" />
            <NavBar />
            <SideNavFooter />
        </aside>
    );
};

export default Sidebar;
