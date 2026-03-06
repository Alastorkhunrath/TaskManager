
import './dayCard.css'



import { DayHeader } from './DayHeader'
import { TaskList } from './TaskList'
import NewCard from '../newCard/NewCard'

import { AnimatePresence } from 'framer-motion'

export const DayCard = ({dateDayItem, setOpenCreateTask, openBtnCurr, tasks}) => {


  const openedBtn = (id) => {
    const newIdBtn = id
    setOpenCreateTask(newIdBtn)
  }

  return (
    <div className="flex flex-col w-full max-w-60 min-w-64 basis-64 day_weekly_header">

        
        <DayHeader dateDayItem={dateDayItem} />

        <AnimatePresence>
          {openBtnCurr === dateDayItem.id? <NewCard dateDayItem={dateDayItem} setOpenCreateTask={setOpenCreateTask} />: null}
        </AnimatePresence>
      
          <button className='mt-5 mb-5 custom_task_btn' onClick={() => openedBtn(dateDayItem.id)}>Create Task</button>
          <div className='task_list_container'>
            <TaskList dayTasks={tasks} /> 
          </div>
       

        

        
       

    </div>
  )
}
