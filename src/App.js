import React, {useState, useEffect} from 'react';
import Popup from './components/Popup'
import './App.scss';

function App() {

  const [data, setData ] = useState([])
  const [send, setSend ] = useState('')
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
 
  const getMyData = async () => {   
    const response = await fetch('http://localhost:3000/rovers');
    const data = await response.json();
    setData(data);
 } 

  useEffect((e) => {
    getMyData()
  }, [] );

  return (
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
                <input  placeholder='Rover Name' className='input-rover-name'></input>
                <div className='popup-button'>
                <button className='popup-button__one' onClick={togglePopup}>Cancel</button>
                <button className='popup-button__one'>Launch</button>
                </div>
                
              </>}
              handleClose={togglePopup}
            />}
          </footer>
         
    </div>
  );
}

export default App;