import { useImperativeHandle, useRef, useEffect } from "react"
import { createPortal } from 'react-dom';

export default function Result({targetTime, ref, remainingTime, onReset}){
    const dialog = useRef();
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    const userLost = remainingTime <= 0;
    const timeInSeconds = (remainingTime / 1000).toFixed(2)

    useImperativeHandle(ref, () => {
        return{
            open(){
                dialog.current.showModal();
            }
        }
    });


    return (
        createPortal(
        <dialog ref={dialog} className="result-modal">
            {userLost ? <h2>You lost</h2> : <h2>You won</h2>}
            {!userLost && <h3>Your score is <strong>{score}</strong></h3>}
            <p>Target time was <strong>{targetTime}</strong> seconds</p>
            {!userLost ? <p>You stopped the timer with <strong>{timeInSeconds} seconds left</strong></p> : <p>You didn't stop the timer fast enough</p>}
            <form method='dialog' onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal') //in index.html
        )
    )
}