const GreetingLogout = ({ userObject, handleLogout }) => {
    return (
        <div className="mx-auto w-1/6 text-center flex justify-around items-center">
            <em className="block">Welcome, {userObject.name}!</em>
            <button
                className="block" 
                onClick={handleLogout}
            >Log out</button>
        </div>
    );
};

export default GreetingLogout;