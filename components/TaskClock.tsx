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
    totalSeconds: number, // Add this to track total seconds for calculations
}

export const TaskClock = ({ minutes, seconds, setMinutes, setSeconds, isRunning, setIsRunning, hours, setHours }: ClockParameters) => {

    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [clockTask, setClockTask] = useState("")
    const [clockTasks, setClockTasks] = useState<ClockTasksParameters[]>([])
    const [activeTaskIndex, setActiveTaskIndex] = useState<number | null>(null)

    useEffect(() => {
        const savedTasks = localStorage.getItem("clockTasks");
        if (savedTasks) {
            setClockTasks(JSON.parse(savedTasks));
        }
    }, [])

    useEffect(() => {
        setTimeout(()=>{
            localStorage.setItem("clockTasks", JSON.stringify(clockTasks));
        }, 100)
    }, [clockTasks]);

    const formatTimeForStorage = () => {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return hours + minutes;
    }

    const secondsToTime = (totalSeconds: number): string => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        
        if (h === 0) {
            return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        } else {
            return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        }
    }

    const calculateTotalTime = () => {
        const currentTotalSeconds = hours * 3600 + minutes * 60 + seconds;
        
        if (activeTaskIndex !== null) {
            const existingSeconds = clockTasks[activeTaskIndex].totalSeconds || 0;
            return secondsToTime(existingSeconds + currentTotalSeconds);
        }
        
        if (hours === 0){
            return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;    
        }
        else{
            return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }
    }

    const calculateTotalSeconds = () => {
        const currentTotalSeconds = hours * 3600 + minutes * 60 + seconds;
        
        if (activeTaskIndex !== null) {
            return (clockTasks[activeTaskIndex].totalSeconds || 0) + currentTotalSeconds;
        }
        
        return currentTotalSeconds;
    }

    const handleAddTask = (clockTask: string, endTimeValue: string) => {
        const totalTimeString = calculateTotalTime();
        const totalSeconds = calculateTotalSeconds();
        
        if (activeTaskIndex !== null) {
            setClockTasks(prevTasks => prevTasks.map((task, i) => 
                i === activeTaskIndex 
                    ? { ...task, edTime: endTimeValue, totalTime: totalTimeString, totalSeconds: totalSeconds } 
                    : task
            ));
            setActiveTaskIndex(null);
        } else if (clockTasks.find(x => x.name === clockTask)) {
            setClockTasks(prevTasks => prevTasks.map((task, i) => 
                task.name === clockTask 
                    ? { ...task, edTime: endTimeValue, totalTime: totalTimeString, totalSeconds: totalSeconds } 
                    : task
            ));
        } else {
            setClockTasks(prevTask => [...prevTask, { 
                name: clockTask, 
                stTime: startTime, 
                edTime: endTimeValue, 
                totalTime: totalTimeString,
                totalSeconds: totalSeconds
            }]);
        }
        setClockTask("");
    }

    const handleReset = () => {
        setIsRunning(false);
        setMinutes(0);
        setSeconds(0);
        setHours(0);
    }

    const formatTime = (time: number) => {
        return time.toString().padStart(2, '0');
    }

    const handleStartTimer = () => {
        setIsRunning(true);
        const timeString = formatTimeForStorage();
        setStartTime(timeString);
    }

    const handleEndTimer = (clockTask: string) => {
        const endTimeString = formatTimeForStorage();
        setEndTime(endTimeString);
        handleAddTask(clockTask, endTimeString);
        handleReset();
    }

    const handleDeleteTask = (index: number) => {
        setClockTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
        if (activeTaskIndex === index) {
            setActiveTaskIndex(null);
        } else if (activeTaskIndex !== null && activeTaskIndex > index) {
            setActiveTaskIndex(activeTaskIndex - 1);
        }
    }

    const handleTaskPlay = (index: number) => {
        setClockTask(clockTasks[index].name);
        setActiveTaskIndex(index);
        handleStartTimer();
    }

    return <div className="absolute lg:w-3/4 w-full right-1 top-24 ">
        <div className="relative flex flex-col lg:-top-10 z-60 bg-black/80 justify-center p-2 rounded">
            <div className="text-center gap-x-5 flex justify-between mx-3 items-center">
                <input
                    value={clockTask}
                    className="bg-white/30 w-full rounded border focus:outline-none px-2"
                    onChange={(e) => { setClockTask(e.target.value) }}
                />
                
                <div className="text-lg">{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</div>

                <button className="text-lg border px-2 rounded bg-red-500" onClick={() => !isRunning ? handleStartTimer() : handleEndTimer(clockTask)}> {!isRunning ? "Start" : "Stop"} </button>
            </div>
            <div className="flex flex-col m-3 px-2">
                {clockTasks.length > 0 &&( <div className="mt-4">
                    <div><h2 className="font-bold mb-2">Task History</h2></div>
                    <div className="space-y-3">
                        {clockTasks.map((task, index)=>{
                            return <div key={index} className={`grid grid-cols-8 w-full bg-white/10 px-2 rounded py-2 justify-between`}>
                                <input className="col-span-3 border bg-transparent px-2 rounded" onChange={e=>{setClockTasks(prevTasks => prevTasks.map((task, i) =>i === index ? { ...task, name: e.target.value } : task))}} value={task.name} />
                                <div className="text-sm col-span-1 col-start-5 justify-self-center">
                                    {task.stTime.substring(0, 2)}:{task.stTime.substring(2)}- 
                                    {task.edTime ? `${task.edTime.substring(0, 2)}:${task.edTime.substring(2)}` : " --:--"}
                                </div>
                                <div className="text-sm col-span-1 justify-self-center"> {task.totalTime} </div>
                                <button onClick={()=>{ handleTaskPlay(index)}} className="justify-self-center col-span-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={() => handleDeleteTask(index)}
                                    className="hover:opacity-75 justify-self-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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