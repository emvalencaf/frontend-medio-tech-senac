import React, { useState } from 'react';

// components
import Modal from '../Modal';
import useAnnouncementModal from '../../../hooks/useModal';


const AnnouncementModal: React.FC = () => {
    const { onClose, isOpen } = useAnnouncementModal();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const author = 1;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newAnnouncement = {
            author,
            title,
            content,
        };

        console.log(newAnnouncement);
        // onSubmit(newAnnouncement);
    };

    return (
        <Modal title='Criar Comunicado' subtitle='Escreva o comunicado que você quer passar aos seus alunos' onClose={onClose} isOpen={isOpen}>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                    <label className="block mb-2 text-sm font-medium">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">Conteúdo</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Criar Comunicado</button>
            </form>
        </Modal>
    );
};

export default AnnouncementModal;
