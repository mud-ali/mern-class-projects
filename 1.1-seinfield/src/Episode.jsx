const Episode = (props) => {
    return (
        <p>{props.title} {props.views.toLocaleString("en-us")} </p>
    )
}

export default Episode