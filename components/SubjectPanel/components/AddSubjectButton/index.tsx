import React, { useState } from 'react';
import { FaBook } from 'react-icons/fa';


interface AddSubjectButtonProps {
    onClick: () => void;
}

const AddSubjectButton: React.FC<AddSubjectButtonProps> = ({ onClick }) => {
    const [showLabel, setShowLabel] = useState(true);

    return (
        <button
            className="flex items-center justify-center bg-green-500 text-white rounded-full gap-1 p-2 hover:bg-green-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-50"
            onClick={onClick}
            onMouseEnter={() => setShowLabel(true)}
            onMouseLeave={() => setShowLabel(false)}
        >
            <FaBook className="text-xl" />
            <span className={` ${showLabel ? 'opacity-100' : 'opacity-0 hidden md:inline-block'} transition-opacity duration-300 ease-in-out`}>
                Adicionar Disciplina
            </span>
        </button>
    );
};

export default AddSubjectButton;