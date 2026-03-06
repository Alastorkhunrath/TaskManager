
// получить первый и последний день текущей недели,
// попробовать вернуть из функции getWeeklyDayes первый и поселедний день недели


import type { DayWeekDate } from "../types/date.types";
import type { Task } from "../types/data.type";

import { useLayoutEffect, useState } from "react";


export const useDateUtils = () => {

  const [currentDate, setCurrentDate] = useState(new Date());

    const getWeeklyDayes = (currentDate: Date) => {
      const baseDate = currentDate || new Date()
      let numberDay = baseDate.getDay() === 0 ? 7 : baseDate.getDay()
      let firstWeeklyDay = new Date(
        baseDate.getFullYear(), 
        baseDate.getMonth(), 
        baseDate.getDate() - (numberDay - 1))
      let lastWeekDay = new Date(
        baseDate.getFullYear(), 
        baseDate.getMonth(), baseDate.getDate() + (7 - numberDay))
      let weekDayes = []
      for (let i = 0;i<7;i++){
        const day = new Date(firstWeeklyDay)
        day.setDate(firstWeeklyDay.getDate() + i)
        weekDayes.push({id: day.getTime(), 
          date: day, isToday:day.getTime() === baseDate.getTime()? true:false,isTomorrow:false })
      }
      return {firstWeeklyDay, lastWeekDay, weekDayes}
    }

    const addDays = (date: Date, days: number) => {
      const result = new Date(date)
      result.setHours(0, 0, 0, 0) // обнуляем время
      result.setDate(result.getDate() + days)
      return result
    }

    const filteredTaskData = (tasks:Task[], dayWeekTime) => {
      const newFilteredTask:Task[] = []
      let dayWeekDataString = new Date(dayWeekTime).toDateString()
      tasks.forEach(element => {
        if (new Date(element.date).toDateString() === dayWeekDataString){
          newFilteredTask.push(element)
        }
      })
      return newFilteredTask
    }

    const searchCurrentWeekTasks = (currentDate) => {
        const  {firstWeeklyDay: firstWeeklyDay, lastWeekDay: lastWeekDay} = getWeeklyDayes(currentDate)

        const lastDateIsTiming = new Date(lastWeekDay).setHours(23,59,59,999)
        const firstDateIsTiming = new Date(firstWeeklyDay).setHours(0,0,0,0)

        return {
          firstDateIsTiming,lastDateIsTiming
        }

    }
    
    
        return {
            getWeeklyDayes,
            addDays,
            filteredTaskData,
            setCurrentDate,
            searchCurrentWeekTasks,
            currentDate


        }
}


export const useWeeksStorage = () => {
  const [backWeekly, setBackWeekly] = useState<DayWeekDate[]>([])
  const [currentWeekly, setCurrentWeekly] = useState<DayWeekDate[]>([])
  const [nextWeekly, setNextWeekly] = useState<DayWeekDate[]>([])


  return {
    setBackWeekly,
    setCurrentWeekly,
    setNextWeekly,

    backWeekly,
    currentWeekly,
    nextWeekly,
  }
}



export const useWeeksSync = (currentDate: Date) => {
  const { getWeeklyDayes, addDays } = useDateUtils();
  const weeksStorage = useWeeksStorage();


  useLayoutEffect(() => {
    const {weekDayes: backWeekly} = getWeeklyDayes(addDays(currentDate, -7))
    const {weekDayes: setCurrentDate} = getWeeklyDayes(new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()))
    const {weekDayes: nextWeekly} = getWeeklyDayes(addDays(currentDate, 7))

    weeksStorage.setBackWeekly(backWeekly)
    weeksStorage.setCurrentWeekly(setCurrentDate)
    weeksStorage.setNextWeekly(nextWeekly)

  },[currentDate])

  return weeksStorage
}

