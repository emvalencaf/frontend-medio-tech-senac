"use client";
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importar ícones de barra e fechar

// custom components from sidenav
import SideNavHeader from './components/SideNavHeader';
import SideNavFooter from './components/SideNavFooter';

// icons
import NavBar from './components/Navbar';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar a sidebar

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Botão de menu hambúrguer visível apenas em dispositivos móveis */}
            <button 
                className="md:hidden p-4 text-white bg-purple-900" 
                onClick={toggleSidebar}>
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Sidebar responsiva */}
            <aside
                className={`fixed top-0 left-0 w-64 min-h-screen bg-purple-900 text-white flex flex-col transform 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <SideNavHeader title="MedioTec" />
                <NavBar />
                <SideNavFooter />
            </aside>

            {/* Overlay para fechar o menu ao clicar fora (apenas em dispositivos móveis) */}
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>}
        </div>
    );
};

export default Sidebar;
