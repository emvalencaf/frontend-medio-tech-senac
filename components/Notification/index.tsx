import { userTypes } from "../../constants/userType";

export interface INotification {
    title: string;
    content: string;
    createdAt: string;
    author: {
        firstName: string;
        userType: 'STUDENT' | 'TEACHER' | 'COORDINATOR';
        lastName: string;
    };
}

const Notification: React.FC<INotification> = ({ title, content, createdAt, author}) => {

    // Formatação da data
    const formattedDate = new Date(createdAt).toLocaleString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="border border-gray-300 bg-white rounded-lg p-4 mb-4 shadow-md">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-700">{content}</p>
            <div className="mt-2 text-sm text-gray-500">
                <span>{`${author.firstName} ${author.lastName}`}</span>
                <span className="mx-1">|</span>
                <span>{userTypes[author.userType] || author.userType}</span>
                <span className="mx-1">|</span>
                <span>{formattedDate}</span>
            </div>
        </div>
    );
}

export default Notification;