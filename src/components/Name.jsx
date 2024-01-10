const Name = ({x , deleteTheContact }) => {
    // console.log(x)
    return(
        <div>
            {x.name} {x.number} 
            <button onClick={deleteTheContact}>delete</button>
        </div>
            
    )
}

export default Name