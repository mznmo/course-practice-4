import { useState, useRef } from "react";
import Result from './Result';

export default function TimerChallenge({title, targetTime}){

    const timer = useRef();
    const dialog = useRef();

    const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

    if (remainingTime <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset (){
        setRemainingTime(targetTime * 1000);
    }

    function handleStart(){
        timer.current = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 10)
        }, 10);
    }

    function handleStop(){
        clearInterval(timer.current);
        dialog.current.open();
    }

    return(
        <>
       <Result ref={dialog} targetTime={targetTime} userTime={timer.current} remainingTime={remainingTime} onReset={handleReset}/> 
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} Second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? <p>Stop Challenge</p> : <p>Start Challenge</p>}</button>
            </p>
            <p className={timerIsActive ? 'active' : undefined}>{timerIsActive ? <p>Time is running...</p> : <p>Timer inactive</p>}</p>

        </section>
        </>
    )
}