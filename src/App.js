import { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList ] = useState([])
  const [showDoneTasks, setShowDoneTasks] = useState(false)
  const [canEdit, setCanEdit] = useState(false)
  const [editedText, seteditedText ] = useState('')

  function handleChange(e) {
    setInputText(e.target.value);
  }

  function handleClick() {
    setTodoList([...todoList, inputText]);
    setInputText("");
  }

  function handleDone(cardIndex){
    setDoneList([...doneList, todoList[cardIndex]])
    handleDelete(cardIndex)
  }

  function handleDelete(cardIndex){
    // todoList.filter((x, id) => {
    //   return id !== x
    // })
    // let tempArray = todoList.filter((item, itemIndex) => itemIndex !== cardIndex)
    let tempArray = [...todoList]
    tempArray.splice(cardIndex, 1)
    setTodoList(tempArray)
  }

  function handleDeleteDoneList(cardIndex){
    // todoList.filter((x, id) => {
    //   return id !== x
    // })
    // let tempArray = todoList.filter((item, itemIndex) => itemIndex !== cardIndex)
    let tempArray = [...doneList]
    tempArray.splice(cardIndex, 1)
    setDoneList(tempArray)
  }
  
  function handleEdit(cardIndex, initialText){
    // let text = todoList[cardIndex]
    setCanEdit(cardIndex)
    seteditedText(initialText)
    
  }
  
  function handleSave(cardIndex){
    setCanEdit(false)
    console.log(todoList)
    let tempArray = [...todoList]
    tempArray.splice(cardIndex, 1, editedText)
    setTodoList(tempArray)
    console.log(tempArray)
    // seteditedText('')

  }
  

  return (
    <div className="App">
      <div className="input__section">
        <input type="text" onChange={handleChange} value={inputText} />
        <button onClick={handleClick}>Add Todo</button>
        <button onClick={() => {setShowDoneTasks(!showDoneTasks)}}>{showDoneTasks ? 'Close' : 'Show'} Done Tasks</button>
      </div>
      
      <div className="display__section">
        {todoList.length === 0 && <p>NO PENDING TASKS</p>}
          {todoList.map((element, index) => {
            return <div key = {index}>
                      <div className="card" key={index}>
                          {((canEdit === false) || (canEdit !== index)) ? element : 
                          canEdit === index && 
                          <>
                          <input type="text" value = {editedText} onChange = {(e) => {seteditedText(e.target.value)}} />
                          <button onClick={() => {handleSave(index)}}>Save</button>
                          </>}
                          <div className="buttons">
                              <button onClick={() => {handleDelete(index)}}>Delete</button>
                              <button onClick={() => {handleDone(index)}}>Mark Done</button>
                              <button onClick={() => {handleEdit(index, element)}} >Edit</button>
                          </div>
                      </div>
                  </div>;
          })}
          {showDoneTasks && doneList.length !== 0 && <p>DONE TASKS</p>}
          {showDoneTasks && doneList.map((element, index) => {
            return <div key = {index}>
                      <div className="card" key={index}>
                          {element}
                          <div className="buttons">
                              <button onClick={() => {handleDeleteDoneList(index)}}>Delete</button>
                          </div>
                      </div>
                  </div>;
          })}

          
      </div>
    </div>
  );
}

export default App;
