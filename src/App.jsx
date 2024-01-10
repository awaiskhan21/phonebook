import { useState , useEffect } from 'react'
import axios from 'axios'
import Name from './components/name'
import PersonForm from './components/PersonForm'
import personServices from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber , setNewNumber] = useState('')
  const [Search , setSearch] = useState('')
  const [notification , setNotification] = useState(null)
  
  useEffect( () => {
    console.log('effect')
    // const eventHandler = response => {
    //   console.log('promise fulfilled')
    //   setPersons(response.data)    
    // }
    // const promise  = axios.get("http://localhost:3001/persons")
    // promise .then(eventHandler)
    personServices.getAll().then(initialPersone => setPersons(initialPersone))
  },[])

//event handler for submit
  const addName = (event) => {
    event.preventDefault()
    // console.log("event" , event)
    // console.log("target" , event.target)
    // console.log("target" , event.target.id)
    // console.log("target" , event.target.name)
    const isPresent = persons.some((person) => person.name === newName);
    const isNoSame = persons.some((person) => person.number === newNumber)

    if(isPresent === false){
      const nameObject ={
        name : newName,
        number : newNumber
      }
      personServices.create(nameObject).then(returnPerson => {
        console.log("return data" , returnPerson)
        console.log("data" , returnPerson.data)
        setPersons(persons.concat(returnPerson))
        setNewName("")
        setNewNumber("")
      })
      

      // setPersons(persons.concat(nameObject))
      // setNewName("")
      // setNewNumber("")
    }
    else if(isPresent && !isNoSame){
//it is for changing the number
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one ?`)){
        const person = persons.find((person) => person.name === newName) //finding that contact
        const changedContact = {...person , number : newNumber}          //updating it  
      // updating it in backend
        personServices.update(person.id , changedContact).then(returnPerson =>{
          setPersons(persons.map(x => x.id !== person.id ? x :returnPerson ))
          setNewName("")
          setNewNumber("")
        })
      }
    }
    else{
      alert(`${newName} is alread added to the phonebook`)
      setNewName("")
      setNewNumber("")
    }
  } 

//deleting the contact info
const deleteTheContact = (x) =>{
  const id = x.id
  if(window.confirm(`Delete ${x.name}`)){
    axios.delete(`http://localhost:3001/persons/${id}`).then(response =>{
      setPersons(persons.filter((x) => x.id !== id))
      console.log(`delete the contact info of ${response.data.name}`)
    })
  }
}


//handle name change
  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

//handle number change
  const handleNumberchange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

//handle search
  const handleSearch = (event) => {
    console.log("searching for" , event.target.value.toLowerCase())
    setSearch(event.target.value.toLowerCase())
  }

  const filterPersons =persons.filter(
    (person) => person.name && person.name.toLowerCase().startsWith(Search) //we are checking if name is define or not
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={notification} />
      <div>
        Search : <input value={Search} onChange={handleSearch} />
      </div>
        <h2>add new </h2>
        <PersonForm
            newName={newName}
            newNumber={newNumber}
            addName={addName}
            handleNameChange={handleNameChange}
            handleNumberchange={handleNumberchange}
        />
        <h2>Numbers</h2>
      <div>
        { filterPersons.map((person) => 
          < Name key={person.name} x={person} deleteTheContact = {() => deleteTheContact(person)} />
        )}
      </div>
    </div>
  )
}

export default App