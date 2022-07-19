import {useEffect, useState} from "react";


export default function useTimeout(timeDelay: number) {
    const [time, setTime] = useState(0)
    useEffect(() => {
        function handleTime() {
            setTime(Date.now());
        }
        const handleTimeout = setTimeout(handleTime, timeDelay)

        return function cleanup() {
            clearInterval(handleTimeout)
        };
    }, [time])
    return time;
}