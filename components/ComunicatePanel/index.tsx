"use client";
import React, { useState } from 'react';

const ComunicatePanel = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState('');

    const addAnnouncement = () => {
        if (newAnnouncement.trim()) {
            setAnnouncements([...announcements, newAnnouncement]);
            setNewAnnouncement('');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Painel de Comunicados</h2>
            <div className="mb-4">
                <input
                    type="text"
                    value={newAnnouncement}
                    onChange={(e) => setNewAnnouncement(e.target.value)}
                    placeholder="Digite um novo comunicado"
                    className="border rounded-lg p-2 w-full"
                />
                <button
                    onClick={addAnnouncement}
                    className="mt-2 bg-blue-500 text-white rounded-lg px-4 py-2"
                >
                    Adicionar
                </button>
            </div>
            <ul className="space-y-2">
                {announcements.map((announcement, index) => (
                    <li key={index} className="p-2 border rounded-md bg-gray-100">
                        {announcement}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ComunicatePanel;
