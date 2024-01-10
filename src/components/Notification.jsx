const Notification = ({msg}) => {
    if(msg === null){
        return null
    }
    return(
        <div className="taskState">
            {msg}
        </div>
    )
}

export default Notification