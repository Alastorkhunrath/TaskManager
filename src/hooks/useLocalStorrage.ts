
import { useState, useEffect, useMemo } from "react"
import { useDateUtils } from "./datesWeek"
import { pb } from "../lib/pocketbase"
import type { DayWeekDate } from "../types/date.types"
import type { Task } from "../types/data.type"


// import { option } from "framer-motion/client"

export const useTasks = () => {

  const {currentDate, filteredTaskData, searchCurrentWeekTasks} = useDateUtils()

    const [tasks, setTasksData] = useState<Task[]>([])
    const [localTasks, setLocalTasks] = useState(() => {
        const cashed = localStorage.getItem('tasks')
        return cashed? JSON.parse(cashed): []
    })

    const fetchTasks = async () => {
      console.log('Current user ID:', pb.authStore.model?.id) 
      try{
        const baseTasks = await pb.collection('tasks').getFullList({
          filter: `userId = "${pb.authStore.model?.id}"`
        })
        
        const transformTasks = baseTasks.map((task) => {
          return {
            id: task.id,
            date: task.dateTask,
            named: task.nameTask,
            priority: task.priority,
            completed: task.completed,
            time: {
              hours: new Date(task.dateTask).getHours(),
              minutes: new Date(task.dateTask).getMinutes()
            }
          }
        })
        setTasksData(transformTasks)
      } catch(err){
        console.log('Что то пошло не так usu')
      }
    }

    useEffect(() => {
      fetchTasks()
    },[])

    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    },[tasks])



      const addTask = async (dateDayItem:DayWeekDate,valueTask:string, priority:string) => {
        const dateTask = new Date(dateDayItem.id)
        console.log(dateTask)
        try {
          const finalTask = await pb.collection('tasks').create({
            userId: pb.authStore.model?.id,
            nameTask: valueTask.trim(),
            completed:false,
            dateTask: dateTask.toISOString(),
            priority: priority || 'low',
          });
  
          const taskSave = {
            id: finalTask.id,
            date: new Date(finalTask.dateTask),
            named: finalTask.nameTask,
            priority: finalTask.priority,
            completed: finalTask.completed,
            time: {
              hours: new Date().getHours(),
              minutes: new Date().getMinutes()
            }
          }
          console.log(taskSave)
          setTasksData(prevTasks => [...prevTasks, taskSave])
        }
        catch(err: any) {
          console.error('Что то пошло не так с добавлением задачи', err)
          console.error('Детали', err.data)
        }
        
      }

      const deletedTask = async (id:string) => {
        await pb.collection('tasks').delete(id)
        setTasksData(prevDataTask => prevDataTask.filter((task) => task.id !== id))
      }


      const checkingCompletedTask = (taskId:number, checked:boolean) => {
        setTasksData((prevDataTask) => {
           return prevDataTask.map(itemTask => itemTask.id === taskId ? {...itemTask, completed: checked}: itemTask)
        })
      }

      const statistics = useMemo(() => {
       
      const {firstDateIsTiming, lastDateIsTiming} = searchCurrentWeekTasks(currentDate)

      const onlyCompletedTasks = tasks.filter(itemTask => itemTask.completed === true)
      const onlyTodayTasks = filteredTaskData(tasks,currentDate)
      const onlyWeekTasks = tasks.filter(itemTask => {
        const taskTime = new Date(itemTask.date).getTime()
        if (firstDateIsTiming <= taskTime && taskTime <= lastDateIsTiming) return itemTask
      })

      return {
          total: tasks.length,
          completedTasks: onlyCompletedTasks.length,
          todayTasks: onlyTodayTasks.length,
          weekTasks: onlyWeekTasks.length,
        }
      },[tasks, currentDate])

      return {
        tasks,
        localTasks,
        statistics,
        setLocalTasks,
        setTasksData,
        addTask,
        deletedTask,
        checkingCompletedTask,
        
      }
}

