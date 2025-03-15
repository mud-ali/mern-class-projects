import '../App.css'

const Notification = ({ notification }) => {
    if (!notification) return null;

    return (
        <div className={`text-center py-3 w-1/3 mx-auto rounded-b-lg notif-${notification.type}`} >
            {notification.message}
        </div>
    );
};

export default Notification;