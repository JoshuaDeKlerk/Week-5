import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function capitalizeAndReplaceHyphens(str) {
  return str.replace(/\b\w/g, firstLetter => firstLetter.toUpperCase()).replace(/-/g, ' ');
}

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [breed, setBreed] = useState(null);

  useEffect(() => {
    fetchRandomDog();
  }, []);

  const fetchRandomDog = () => {
    axios.get('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        console.log(response.data);
        setImageUrl(response.data.message);

        const urlArr = response.data.message.split("/");
        const breedName = urlArr[urlArr.length - 2]; 
        const formattedBreed = capitalizeAndReplaceHyphens(breedName);
        setBreed(formattedBreed);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };

  const handleRandomizeClick = () => {
    fetchRandomDog();
  };

  return (
    <div className='pageContainer'>
      <div className="DogCard">
      <h1>Dog Image</h1>
      {imageUrl && <img src={imageUrl} alt="Dog" />}
      {breed && <p>{breed}</p>}
      <div className="buttonCont">
        <button onClick={handleRandomizeClick} className="randomize-button">Randomize</button>
      </div>
    </div>
    </div>
    
  );
}

export default App;
