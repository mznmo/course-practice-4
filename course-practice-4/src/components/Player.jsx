import { useState, useRef } from "react";
import TimerChallenge from "./TimerChallenge";
export default function Player() {

  const player = useRef();
  const [userName, setUserName] = useState('');


  function handleClick(){
    setUserName(player.current.value);
    player.current.value = '';
  }


  return (
    <section id="player">
      <h2>Welcome {userName ? userName : 'unknown entity'}</h2>
      <p>
        <input ref={player} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
