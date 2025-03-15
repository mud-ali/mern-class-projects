const Notification = ({ notification }) => {
    if (!notification) return null;

    const getBackgroundColor = (notifType) => {
        switch (notifType) {
            case "info":
                return "blue";
            case "warning":
                return "orange"
            case "error":
                return "red"
        }
        return "#fff"
    }

    return (
        <div className={`text-center py-3 w-1/3 mx-auto rounded-b-lg bg-${getBackgroundColor(notification.type)}-300`} >
            {notification.message}
        </div>
    );
};

export default Notification;