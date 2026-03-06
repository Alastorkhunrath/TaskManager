

import { IoTime } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import './dayCard.css'
import type React from "react";
import { useMemo, useContext } from "react";
import { TasksContext } from "../../context/TaskProvider";



export const TaskList = ({dayTasks}) => {

  const { checkingCompletedTask, deletedTask } = useContext(TasksContext)
  
  const handleCheckBtn = (e: React.ChangeEvent<HTMLInputElement>, taskId: number ) => {
    let checked = e.target.checked
    checkingCompletedTask(taskId, checked) 
  }
  const sortedTasks = useMemo(() => {
    return [...dayTasks].sort((a,b) => {
      if (!a.completed && b.completed){
        return -1
      } else if (!b.completed && a.completed){
        return 1
      }
    })

  },[dayTasks]) 
  return (
    <>
    {
      sortedTasks.map(itemTask => (
        <div className="
          flex flex-col flex-wrap justify-between 
          p-[10px] 
          shadow-xl
          rounded-xl
          hover_scroll"
          style={itemTask.completed? {opacity: '0.5'}: {opacity: '1'}}>
              <div className="flex items-center justify-between task_header">
              <input type="checkbox" onChange={(e) => handleCheckBtn(e, itemTask.id)} checked={itemTask.completed} className=""></input>
                <h4 className='basis-2/3 title_task' style={itemTask.completed? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{itemTask.named}</h4>
              <button className="del_task" onClick={() => deletedTask(itemTask.id)}>
                <IoClose />
              </button>
              </div>
              <div className="flex items-center task_body">
                <IoTime style={{color: 'rgba(95, 51, 225, 1)'}} />
                <label className="basis-2/3" style={{color:  'rgba(171, 148, 255, 1)'}}>
                {`${itemTask.time.hours}:${itemTask.time.minutes}`}
                  </label>
                  <p className={`priority_btn priority_${itemTask.priority} basis-1/3`}>{itemTask.priority}</p>
              </div>
            

        </div>
      ))
    }
        
  
      
    </>
    
  )
}



 