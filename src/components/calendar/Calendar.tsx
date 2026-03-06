import { RiArrowLeftWideFill, RiArrowRightWideFill  } from "react-icons/ri";
import { DayCard } from "../dayCard/DayCard";

import { TasksContext } from "../../context/TaskProvider";

import { useDateUtils, useWeeksSync} from "../../hooks/datesWeek";
import { useContext, useState } from "react";

import type { Task } from "../../types/data.type";

export const Calendar = () => {

    const {addDays, filteredTaskData,currentDate, setCurrentDate } = useDateUtils();
    const { currentWeekly, backWeekly,nextWeekly } = useWeeksSync(currentDate);

    const { tasks }:Task[] = useContext(TasksContext)

    const [openBtnCurr, setOpenBtnCurr] = useState(null)
    const [_slideIn, setSlideIn] = useState<number>(33.3)

    const [animtaionSlide, setAnimationSlide] = useState<boolean>(false)
    const [animtaionDirection, setAnimationDirection] = useState<string>('')

    const [btnActive, setBtnActive] = useState(true)
    
      const setNextDateWeek = () => {
        
        if (btnActive){
          setAnimationSlide(true)
          setAnimationDirection('next')
        }
        setBtnActive(false)
      }
    
      const setBackDateWeek = () => {
        if (btnActive){
          setAnimationSlide(true)
          setAnimationDirection('back')
        }
        setBtnActive(false)
      }

  return (
    <>
      <main>
        <section className='calendar'>
          <div className='w-full'>
            <div className='calendar_header'>
            <h2 className="title">Tasks</h2>
            <div className='btn_slide'>
              <button onClick={setBackDateWeek}>
                <RiArrowLeftWideFill />
              </button>
              <button onClick={setNextDateWeek}>
                <RiArrowRightWideFill />
              </button>
            </div>
            
            </div>
            <hr />
            <div className='width_max height scroll-none'>
              <div className={`flex justify-between slider_coontainer stoke-slide scroll_slider ${animtaionSlide? 'slide-'+ animtaionDirection : ''}`} onTransitionEnd={(e) => {

                if (!animtaionSlide) return

                if (animtaionSlide) {
                  setAnimationSlide(false)  
                }
                if (animtaionDirection === 'next'){
                  setCurrentDate(prev => addDays(prev, 7))
                } else if (animtaionDirection === 'back') {
                  setCurrentDate(prev => addDays(prev, -7))
                }
                setSlideIn(33.3)
                setAnimationDirection('')
                setBtnActive(true)}}>


                <div className='flex weekly back_weekly justify-around'>

                {backWeekly.map(item => {
                  const task = filteredTaskData(tasks,item.date)
                  return  <DayCard dateDayItem={item}
                  setOpenCreateTask={setOpenBtnCurr}
                  openBtnCurr={openBtnCurr}
                  tasks={task}
                  />
                })}
                </div>
                <div className='flex weekly current_weekly justify-around'>
                {currentWeekly.map(item => {
                  const task = filteredTaskData(tasks, item.date)
                  return  <DayCard dateDayItem={item}
                  setOpenCreateTask={setOpenBtnCurr}
                  openBtnCurr={openBtnCurr}
                  tasks={task}
                  />
                })}
                </div>
                <div className='flex weekly next_weekly justify-around'>
                {nextWeekly.map(item => {
                  const task = filteredTaskData(tasks,item.date)
                  return  <DayCard dateDayItem={item}
                  setOpenCreateTask={setOpenBtnCurr}
                  openBtnCurr={openBtnCurr}
                  tasks={task}
                  />
                })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
