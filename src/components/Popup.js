import React from 'react';
import './Popup.scss';

const Popup = ({handleInputChange, togglePopup, submit}) => {
  return (
    <div className='popup-box'>
      <div className='box'>
        <h1 className='h1'>New Rover</h1>
        <p className='h2'>Launch new rover to mars</p>
        <input
          placeholder='Rover Name'
          className='input-rover-name'
          onChange={(e) => handleInputChange(e)}
        ></input>
        <div className='popup-button'>
          <button className='popup-button__one' onClick={(e) => togglePopup(e)}>
            Cancel
          </button>
          <form onSubmit={(e) => submit(e)}>
            <button className='popup-button__one'>Launch</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;