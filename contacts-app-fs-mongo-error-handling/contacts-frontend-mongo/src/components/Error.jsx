const ErrorModal = ({error}) => {
    return (
        <div id="error-modal" style={{"display": error === "" ? "none" : "block"}}>
            An error occurred.
            <br/>
            <span id="err-desc">{error.message}</span>
        </div>
    )
}

export default ErrorModal;