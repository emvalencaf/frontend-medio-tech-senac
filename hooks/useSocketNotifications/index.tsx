import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';
import Notification from '../../components/Notification';

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL); // Altere a URL conforme necessário

type Announcement = {
    title: string;
    content: string;
    author: {
        firstName: string;
        lastName: string;
        userType: 'STUDENT' | 'TEACHER' | 'COORDINATOR';
    };
    createdAt: string;
}

const useSocketNotifications = () => {
    useEffect(() => {
        // Escutando por anúncios recebidos
        socket.on('announcement', (message) => {
            const announcement: Announcement = JSON.parse(message);
            toast.custom(
                <Notification {...announcement} />,
                {
                    duration: 6000,
                    // Outras opções de configuração do toast, se necessário
                }
            );
        });

        // Limpeza na desmontagem do componente
        return () => {
            socket.off('announcement');
        };
    }, []);

    // Retorne qualquer função ou estado que você queira expor
};

export default useSocketNotifications;
