"use client";

import useWebSocket from "../../hooks/useSocketNotifications";

const NotificationProvider: React.FC = () => {
    useWebSocket();
    return (
        <>
        </>
    );
}

export default NotificationProvider;