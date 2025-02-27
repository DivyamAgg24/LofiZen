import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface ClockParameters {
    minutes: number,
    seconds: number,
    hours: number,
    setMinutes: Dispatch<SetStateAction<number>>,
    setSeconds: Dispatch<SetStateAction<number>>,
    setHours: Dispatch<SetStateAction<number>>,
    isRunning: boolean,
    setIsRunning: Dispatch<SetStateAction<boolean>>
}

interface ClockTasksParameters {
    name: string,
    stTime: string,
    edTime: string,
    totalTime: string,
}

export const TaskClock = ({ minutes, seconds, setMinutes, setSeconds, isRunning, setIsRunning, hours, setHours }: ClockParameters) => {

    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [clockTask, setClockTask] = useState("")
    const [clockTasks, setClockTasks] = useState<ClockTasksParameters[]>([])


    useEffect(() => {
        const savedTasks = localStorage.getItem("clockTasks");
        if (savedTasks) {
            setClockTasks(JSON.parse(savedTasks));
        }
    }, [])

    useEffect(() => {
        if (clockTasks.length > 0) {
            localStorage.setItem("clockTasks", JSON.stringify(clockTasks));
        }
    }, [clockTasks]);


    const formatTimeForStorage = () => {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return hours + minutes;
    }


    const calculateTotalTime = () => {
        if (hours === 0){
            return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`    
        }
        else{
            return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        }
    }

    const handleAddTask = (endTimeValue: string) => {
        setClockTasks(prevTask => [...prevTask, { name: clockTask, stTime: startTime, edTime: endTimeValue, totalTime: calculateTotalTime()}])
        setClockTask("")
    }

    const handleReset = () => {
        setIsRunning(false)
        setMinutes(0)
        setSeconds(0)
        setHours(0)
    }

    const formatTime = (time: number) => {
        return time.toString().padStart(2, '0')
    }


    const handleStartTimer = () => {
        setIsRunning(true)
        const timeString = formatTimeForStorage()
        setStartTime(timeString)
    }

    const handleEndTimer = () => {
        const endTimeString = formatTimeForStorage()
        setEndTime(endTimeString)
        handleReset()
        handleAddTask(endTimeString)
    }

    return <div className="absolute lg:w-1/2 w-full right-1 top-24 ">
        <div className="relative flex flex-col lg:-top-10 z-60 bg-black/80 justify-center p-2 rounded">
            <div className="text-center gap-x-5 flex justify-between mx-3 items-center">
                <input
                    value={clockTask}
                    className="bg-white/30 w-full rounded border focus:outline-none px-2"
                    onChange={(e) => { setClockTask(e.target.value) }}
                />
                
                <div className="text-lg">{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</div>

                <button className="text-lg border px-2 rounded bg-red-500" onClick={!isRunning ? handleStartTimer : handleEndTimer}> {!isRunning ? "Start" : "Stop"} </button>
            </div>
            <div className="flex flex-col m-3 px-2">
                {clockTasks.length > 0 &&( <div className="mt-4">
                    <div><h2 className="font-bold mb-2">Task History</h2></div>
                    <div className="space-y-3">
                        {clockTasks.map((task, index)=>{
                            return <div key={index} className="grid grid-cols-6 w-full bg-white/10 px-2 rounded py-2 justify-between ">
                                <div className="col-span-3"> {task.name} </div>
                                <div className="text-sm col-span-2 justify-self-end">
                                    {task.stTime.substring(0, 2)}:{task.stTime.substring(2)} - 
                                    {task.edTime ? `${task.edTime.substring(0, 2)}:${task.edTime.substring(2)}` : " --:--"}
                                </div>
                                <button className="justify-self-end">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                    </svg>
                                </button>
                            </div>
                        })}
                    </div>
                </div>)}
            </div>
        </div>
    </div>
}

export default TaskClock