import React from 'react';
import Header from './components/Header';
import UserInput from './components/UserInput';
import Soundscape from './components/SoundScape';
import Language from './components/Language';
import Duration from './components/Duration';
import Voice from './components/Voice';
import StartMeditationButton from './components/StartMeditationButton';

function App() {
  return (
    <div className="App">
      <Header />
      <UserInput />
      <div className="options">
        <Soundscape />
        <Language />
        <Duration />
        <Voice />
      </div>
      <StartMeditationButton />
    </div>
  );
}

export default App;