
const PersonForm =  ({ newName, newNumber, handleNameChange, handleNumberchange, addName }) =>{
    
    return(
        <div>
            <form onSubmit={ addName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                
                <div>
                    number: <input value={newNumber} onChange={handleNumberchange} / >
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm