
import { useState, useContext } from 'react';
import './newCard.css'
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { TasksContext } from '../../context/TaskProvider';


import { motion } from 'framer-motion'; 


const NewCard = ({dateDayItem,setOpenCreateTask}) => {

    const {addTask} = useContext(TasksContext)
    const [valueTask, setValueTask] = useState<string>('')
    const [activePriorityBtn, setActivePriorityBtn] = useState<string>('')

  return (
    <motion.div 
        initial={{y: -207,opacity: 0}}
        animate={{y: 0, opacity: 1}} 
        exit={{y: -207, opacity: 0}}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
    className="new_task_container">
        <div className='contaainer_close_btn'> 
        <h3>New Task</h3>
            <button className='btn_close' onClick={() => setOpenCreateTask(null)}><IoClose /></button>
        </div>
        
        <div className='input_container'>
            <input autoFocus type="text" id="name_task" placeholder='Title task' value={valueTask} onChange={(e) => setValueTask(e.target.value)} />
        </div>
        <h4>Priority</h4>
        <div className="priority_btns">
            <button className={`priority_btn priority_low ${activePriorityBtn === 'low'? 'low': ''} cursor_point`} type="button"
                onClick={(e) => setActivePriorityBtn('low')}>
                low
            </button>
            <button className={`priority_btn priority_medium ${activePriorityBtn === 'medium'? 'medium': ''} cursor_point`} type="button"
                onClick={(e) => setActivePriorityBtn('medium')}>
                medium</button>
            <button className={`priority_btn priority_high ${activePriorityBtn === 'high'? 'high': ''} cursor_point`} type="button"
                onClick={(e) => setActivePriorityBtn('high')}>
                high
            </button>
        </div>

        <div className="btn_ok">
            <button className='fa_check' onClick={() => {
                addTask(dateDayItem,valueTask,activePriorityBtn)
                setOpenCreateTask(null)
                }}>
                <FaCheck style={{color:'rgba(95, 51, 225, 1)'}} />
            </button>
            
        </div>

    </motion.div>
  )
}

export default NewCard