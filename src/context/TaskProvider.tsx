
import { useTasks } from "../hooks/useLocalStorrage";
import { createContext } from "react";


export const TasksContext = createContext(null);


export const TaskProvider = ({children}) => {

    const tasksData = useTasks()

    return (
        <TasksContext.Provider value={tasksData}>
            {children}
        </TasksContext.Provider>
            )


}