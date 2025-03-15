const Login = ({
    handleLogin,
    username,
    setUsername,
    password,
    setPassword,
}) => {
    return (
        <form onSubmit={handleLogin} className="border-2 border-black w-1/2 mx-auto text-center p-8">
            <div>
                username{" "}
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Log In</button>
        </form>
    );
};

export default Login;