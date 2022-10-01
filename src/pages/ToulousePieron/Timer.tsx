import { useEffect, useState } from "react";
import { MAX_TIME } from "./Constants";
import { formatTime } from "./util";

export function Timer(props: {startTime: Date}){

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

    let timeForTask = MAX_TIME;
    let timeLeft = timeForTask - diff;

    if (timeLeft < 0){
        timeLeft = 0;
    }

    return <>
        <div
            style={{
                position: 'sticky',
                display: 'inline-block',
                top: 0,
                margin: '0 auto',
                zIndex: 1,
                textAlign: 'center',
            }}
        >
            <div>Hátralévő idő</div>
            <div>{formatTime(timeLeft)}</div>
        </div>
    </>
}