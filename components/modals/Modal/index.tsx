import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

interface ModalProps {
    title: string;
    subtitle?: string;
    onClose: () => void;
    children: React.ReactNode;
    isOpen: boolean;
    footerContent?: React.ReactNode; // Opção para conteúdo dinâmico no footer
}

const Modal: React.FC<ModalProps> = ({ title, subtitle, children, footerContent, onClose, isOpen }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">{title}</h2>
                        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <RiCloseCircleLine className='text-xl' />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="mb-4">
                    {children}
                </div>

                <div className="border-t pt-3">
                    {footerContent && (
                        <>
                            {footerContent}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
