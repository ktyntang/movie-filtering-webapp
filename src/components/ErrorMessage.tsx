const ErrorMessage = (): JSX.Element => {
    return (
        <div>
            <p>
                Sorry something went wrong. Please refresh the page
                to reload movies.
            </p>
            <button onClick={() => window.location.reload()}>
                Refresh
            </button>
        </div>
    )
}


export default ErrorMessage