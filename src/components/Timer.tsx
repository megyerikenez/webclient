import { useEffect, useState } from "react";
import { formatTime } from "../util";

export function Timer(props: {startTime: Date, maxTime: number}){

    function getDiff(){
        return Date.now() - props.startTime.getTime();
    }

    let [diff, setDiff] = useState(getDiff());

    useEffect(()=>{
        let interval = setInterval(()=>{
            setDiff(getDiff());
        },1000);

        return ()=>{
            clearInterval(interval);
        }
    })

    let timeForTask = props.maxTime;
    let timeLeft = timeForTask - diff;

    if (timeLeft < 0){
        timeLeft = 0;
    }

    return <>
        <div
            className="card"
            style={{
                display: 'inline-block',
                textAlign: 'center',
            }}
        >
            <div>Hátralévő idő</div>
            <div>{formatTime(timeLeft)}</div>
        </div>
    </>
}