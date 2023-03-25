import { useState } from 'react';

import UserForm from '../components/UserForm'
import Game from '../components/Game'
import Scoreboard from '../components/Scoreboard'

function App() {
  const [showGame, setShowGame] = useState(false);

  const handlePlayGame = () => {
    setShowGame(true);
  };

  return (
    <div>
      {showGame ? (
        <Game />
      ) : (
        <UserForm onPlayGame={handlePlayGame} />
      )}
      <Scoreboard />
    </div>
  );
}

export default App;