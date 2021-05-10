import React, { useState, useEffect } from 'react';
import Popup from './components/Popup';
import './App.scss';

function App() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    getMyData();
  }, [isOpen]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const getMyData = async () => {
    const response = await fetch('http://localhost:3000/rovers');
    const json = await response.json();
    setData(json);
  };

  async function postData(url = '', data = {}) {
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('error', error);
    }
  }


  function submit(e) {
    e.preventDefault();
    postData('http://localhost:3000/rovers', {
      id: data.length + 1,
      name: inputValue,
      status: 'Launched',
    });
    togglePopup();
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <div className='window'>
      <video src='/video2.mp4' type='video/mp4' autoPlay loop muted />
      <div className='dashboard'>
        <header className='dashboard__header'>Mars Rovers</header>
        <div className='dashboard__content'>
          {data.map((el) => (
            <p className='dashboard__content--element'>
              <span className='object'>{el.name}</span>
              <br></br>
              <span className='object2'>{el.status}</span>
            </p>
          ))}
        </div>
        <footer className='dashboard__footer'>
          <button className='dashboard__footer--button' onClick={togglePopup}>
            New Rover
          </button>
          {isOpen && (
            <Popup
              togglePopup={togglePopup}
              submit={submit}
              handleInputChange={handleInputChange}
            />
          )}
        </footer>
      </div>
    </div>
  );
}

export default App;