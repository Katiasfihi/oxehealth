import React, {useState, useEffect} from 'react';
import Popup from './components/Popup'
import './App.scss';

function App() {

  const [data, setData ] = useState([])
  const [isOpen, setIsOpen] = useState(false);
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





/*
 // Example POST method implementation:
async function postData(url = '', data = {}) {
  console.log('postData')
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then(r => console.log(r.json()))///.then(d => console.log(d))

  return response.json(); // parses JSON response into native JavaScript objects
}
*/





/*
postData('http://localhost:3000/rovers', { answer: 42 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
*/




/*
  function postData () {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React Hooks POST Request Example' })
  };
  fetch('http://localhost:3000/rovers', requestOptions)
  .then (response => response.json())
  .then (data => setPostId(data.name));
  }
 */
  useEffect(() => {
    getMyData()
  }, []);


function submit(e){
  e.preventDefault();
  //postData('http://localhost:3000/rovers', { answer: 42 })
}



function handle(e){
  const newInput = {...input}
  newInput[e.target.id] = e.target.value
  setInput(newInput)
  console.log(newInput)
}


  return (
    <div className='window'>
        <video src='/video2.mp4' type="video/mp4" autoPlay loop muted />
    <div className="dashboard">
      <header className='dashboard__header'>Mars Rovers</header>     
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
    </div>
  );
}

export default App;