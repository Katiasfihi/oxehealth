import React, {useState, useEffect} from 'react';
import Popup from './components/Popup'
import './App.scss';

function App() {

  const [data, setData ] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const url = ''
  const [postId, setPostId] = useState(null)
  const [input, setInput] = useState({name: ''})
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
 
  const getMyData = async () => {   
    const response = await fetch('http://localhost:3000/rovers');
    const data = await response.json();
    setData(data);
 } 


  function sendMyData () {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React Hooks POST Request Example' })
  };
  fetch('http://localhost:3000/rovers', requestOptions)
  .then (response => response.json())
  .then (data=> setPostId(data.name));
  }
 
  useEffect(() => {
    getMyData()
    sendMyData()
  }, []);

function submit(e){
  e.preventDefault();
  sendMyData()
}

function handle(e){
  const newInput = {...input}
  newInput[e.target.id] = e.target.value
  setInput(newInput)
  console.log(newInput)
}
  

  return (
    <div className="dashboard">
      <header className='dashboard__header'>Mars Rovers</header>
      <div>hello{postId}</div>
          <div className='dashboard__content'>
          {
              data.map((el)=>
                <p className='dashboard__content--element'>
                  <span className='object'>
                  {el.name}
                  </span>
                  <br></br>
                  <span className='object2'>
                  {el.status}
                  </span>
                </p>
                )
          }
          </div>  
          <footer className='dashboard__footer'>
          <button className='dashboard__footer--button' onClick={togglePopup}>New Rover</button>
            {isOpen && <Popup
              content={<>
                <h1 className='h1'>New Rover</h1>
                <p className='h2'>Launch new rover to mars</p>
                <input  placeholder='Rover Name' className='input-rover-name' onChange={(e)=>handle(e)}></input>
                <div className='popup-button'>
                <button className='popup-button__one' onClick={togglePopup}>Cancel</button>
                <form onSubmit={(e) => submit(e)}>
                <button className='popup-button__one' >Launch</button>
                </form>              
                </div>  
              </>}
              handleClose={togglePopup}
            />}
          </footer>         
    </div>
  );
}

export default App;