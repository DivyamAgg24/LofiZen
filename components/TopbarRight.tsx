"use client"
import { useEffect, useState } from "react"
import { TodoList } from "./Todo"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { visibility } from "@/features/todoSlice"
import TaskClock from "./TaskClock"

export const TopbarRight = () => {
    const [clock, setClock] = useState(false)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const showTodo = useAppSelector(state => state.showTodo.show)
    const dispatch = useAppDispatch()


    useEffect(()=>{
        let timer: NodeJS.Timeout;
        if (isRunning){
            timer = setInterval(()=>{
                if (seconds === 59){
                    if (minutes === 59){
                        if (hours === 99){
                            setIsRunning(false)
                            clearInterval(timer)
                        }
                        else{

                            setHours(prev=>prev+1)
                            setMinutes(0)
                            setSeconds(0)
                        }
                    } 
                    else{
                        setMinutes(prev=>prev+1)
                        setSeconds(0)
                    }
                }
                else{
                    setSeconds(prev=>prev+1)
                }
            }, 1000)
        }
        return () => clearInterval(timer)
    }, [isRunning, minutes, seconds])

    return <>
        {clock && <TaskClock minutes={minutes} seconds={seconds} isRunning={isRunning} setMinutes={setMinutes} setSeconds={setSeconds} setIsRunning={setIsRunning} hours={hours} setHours={setHours} />}

        {showTodo && <TodoList />}

        <div>
            <button onClick={()=>{
                setClock((show)=>!show)
                dispatch(visibility(false))
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </div>
        <div>
            <button onClick={()=>{
                dispatch(visibility(!showTodo))
                setClock(false)
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
            </button>
        </div>
    </>
}