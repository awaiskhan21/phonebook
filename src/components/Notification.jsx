const Notification = ({msg}) => {
    if(msg === null){
        return null
    }
    return(
        <div className="notificaiton">
            {msg}
        </div>
    )
}

export default Notification