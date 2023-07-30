import React, { useState } from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Logo from './components/Logo';
import Illustration from './components/Illustration';
import NewUser from './components/NewUser';
import UserInput from './components/UserInput';
import Soundscape from './components/Soundscape';
import Language from './components/Language';
import Voice from './components/Voice';
import MeditationPage from './pages/MeditationPage';

function App() {
  const [backgroundMusic, setBackgroundMusic] = useState('rain');
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [goal, setGoal] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleBackgroundMusicChange = (music) => {
    setBackgroundMusic(music);
  };

  const handleVoiceChange = (voice) => {
    setSelectedVoice(voice);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleGoalChange = (goal) => {
    setGoal(goal);
  };

  return (
    <Router>
      <div className="App">
        <Logo />
        <Illustration />
        <NewUser />

        <Routes>
          <Route
            path="/"
            element={
              <MainContent
                backgroundMusic={backgroundMusic}
                onBackgroundMusicChange={handleBackgroundMusicChange}
                selectedVoice={selectedVoice}
                onVoiceChange={handleVoiceChange}
                goal={goal}
                onGoalChange={handleGoalChange}
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
            }
          />
          <Route
            path="/meditation"
            element={
              <MeditationPage
                backgroundMusic={backgroundMusic}
                selectedVoice={selectedVoice}
                goal={goal}
                selectedLanguage={selectedLanguage}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function MainContent({
  backgroundMusic,
  onBackgroundMusicChange,
  selectedVoice,
  onVoiceChange,
  goal,
  onGoalChange,
  selectedLanguage,
  onLanguageChange,
}) {
  return (
    <div className="content">
      <UserInput goal={goal} onGoalChange={onGoalChange} />
      <div className="options">
        <Soundscape backgroundMusic={backgroundMusic} onBackgroundMusicChange={onBackgroundMusicChange} />
        <Language selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} />
        <Voice selectedVoice={selectedVoice} onVoiceChange={onVoiceChange} />
      </div>
      <div className="start-button-container">
        <div className="start-button">
          <Link to="/meditation" className="start-button-text" >
            START MEDITATION
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
