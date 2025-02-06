import { useEffect, useState } from "react"
import { TodoList } from "./Todo"

export const TopbarRight = () => {
    const [clock, setClock] = useState(false)
    const [showTodo, setShowTodo] = useState(false)
    const [minutes, setMinutes] = useState(5)
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    
    useEffect(()=>{
        let timer: NodeJS.Timeout;
        if (isRunning){
            timer = setInterval(()=>{
                if (seconds === 0){
                    if (minutes === 0){
                        setIsRunning(false)
                        clearInterval(timer)
                    } 
                    else{
                        setMinutes(prev=>prev-1)
                        setSeconds(59)
                    }
                }
                else{
                    setSeconds(prev=>prev-1)
                }
            }, 1000)
        }
        return () => clearInterval(timer)
    }, [isRunning, minutes, seconds])
    

    const handleReset = () =>{
        setMinutes(5)
        setSeconds(0)
        setIsRunning(false)
    }
    
    const formatTime = (time: number) => {
        return time.toString().padStart(2, '0')
    }

    return <>
        {clock && (
            <div className="absolute flex flex-col top-10 -right-4 z-60 bg-black/80 justify-center p-2 rounded">
                <div className="text-center flex justify-between mx-3 items-center">
                    <button className="text-lg" onClick={()=>{
                        setMinutes((minutes)=>minutes-5)
                        setSeconds(0)
                        setIsRunning(false)
                    }}>{"<"}</button>
                    <div>{formatTime(minutes)}:{formatTime(seconds)}</div>
                    <button className="text-lg" onClick={()=>{
                        setMinutes((minutes)=>minutes+5)
                        setSeconds(0)
                        setIsRunning(false)
                    }}>{">"}</button>
                </div>
                <div className="flex gap-x-4 mt-3 px-2">
                    <button onClick={()=>{
                        setIsRunning((start)=> !start)
                    }}>
                        {!isRunning ? "Start": "Pause"}
                    </button>
                    <button className="" onClick={handleReset}>Reset</button>
                </div>
            </div>
        )}

        {showTodo && <TodoList />}

        <div>
            <button onClick={()=>{
                setClock((show)=>!show)
                setShowTodo(false)
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </div>
        <div>
            <button onClick={()=>{
                setShowTodo((show)=>!show)
                setClock(false)
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
            </button>
        </div>
    </>
}