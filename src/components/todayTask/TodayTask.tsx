import { useDateUtils } from "../../hooks/datesWeek"
import { TaskList } from "../dayCard/TaskList"
import { useContext } from "react"
import { TasksContext } from "../../context/TaskProvider"
import { useEffect } from "react"

import './todayTask.css'


export const TodayTask = () => {
  const { currentDate, filteredTaskData } = useDateUtils()
  const { tasks, statistics } = useContext(TasksContext)
  const compliteTask = filteredTaskData(tasks, currentDate)


  
    useEffect(() => {
      console.log('📊 TodayTask смонтирован')
      
      return () => {
        
        console.log('👋 TodayTask размонтирован') 
      }
    }, [])

  return (
    <section>
      <h2 className="container title">Statistics</h2>
      <div className="container">

        <div className="flex justify-between inner_container">

          <div className="grid grid-cols-2 grid-rows-2 gap-4 statistics max-h-80">
          
          <div className="p-4 staistics_card">
            <h2>Total</h2>
            <h1>{statistics.total}</h1>
          </div>
          <div className="p-4 staistics_card bg_violet">
            <h2>Completed tasks</h2>
            <h1>{statistics.completedTasks}</h1>
          </div>
          <div className="p-4 staistics_card bg_violet">
            <h2>Today task</h2>
            <h1>{statistics.todayTasks}</h1>
          </div>
          <div className="p-4 staistics_card">
            <h2>Week task</h2>
            <h1>{statistics.weekTasks}</h1>
          </div>

        </div>
        <div className="flex justify-center task_today_container">
          <div className="tasks_today">
            <TaskList dayTasks={compliteTask} />
          </div>
        </div>

        </div>

        
        
        
      </div>
      

    </section>
  )
}
