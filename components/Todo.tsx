import { useEffect, useState } from "react"

interface Task{
    todo: string,
    completed: boolean
}

export const TodoList = () => {
    const [todo, setTodo] = useState("")
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(()=>{
        const savedTasks = localStorage.getItem("todos");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, [])

    useEffect(() => {
        if (tasks.length > 0){
            localStorage.setItem("todos", JSON.stringify(tasks));
        }
    }, [tasks]);

    const handleAddTask = () => {
        if (todo.trim() !== "") {
            setTasks(prevTasks => [...prevTasks, { todo: todo, completed: false }])
            setTodo("") // Clear input after adding
        }
    }

    const handleToggleComplete = (index: number) => {
        setTasks(prevTasks => 
            prevTasks.map((task, i) => 
                i === index ? { ...task, completed: !task.completed } : task
            )
        )
    }

    const handleDeleteTask = (index: number) => {
        setTasks(prevTasks => prevTasks.filter((_, i) => i !== index))
    }

    return (
        <div className="absolute max-h-[400px] flex flex-col top-10 -right-4 z-50 bg-black/80 justify-center p-2 rounded text-white min-w-[250px]">
            <div className="flex p-2 gap-x-3">
                <input 
                    value={todo}
                    placeholder="Add your todo here" 
                    className="bg-transparent border focus:outline-none px-2 flex-1" 
                    onChange={(e) => setTodo(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <button 
                    className="border px-2 rounded bg-red-500 hover:bg-red-600" 
                    onClick={handleAddTask}
                >
                    Add
                </button>
            </div>
            <div className="overflow-y-auto scheme-dark">
                {tasks && tasks.map((task, index) => (
                    <div key={index} className="flex justify-between px-2 pt-3">
                        <div className="flex gap-x-2">
                            <div className="flex items-center">
                                <button 
                                    className="border border-white w-4 h-4 flex items-center justify-center"
                                    onClick={() => handleToggleComplete(index)}
                                >
                                    {task.completed && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div className={task.completed ? "line-through text-gray-400" : ""}>
                                {task.todo}
                            </div>
                        </div>
                        <button 
                            onClick={() => handleDeleteTask(index)}
                            className="hover:opacity-75"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodoList