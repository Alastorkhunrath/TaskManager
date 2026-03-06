import './menuNav.css'

import  home  from '../../../assets/icons/home.svg'
import  calendar  from '../../../assets/icons/calendar.svg'
import  profileTwoUsers  from '../../../assets/icons/profile-2user.svg'

import { IoTimer } from "react-icons/io5";


import { useNavigate } from 'react-router'



export const MenuNav = () => {

    const menuNavigate = useNavigate()

  return (
    <nav className='nav'>
        <button className='nav_btn' onClick={() => {
            menuNavigate('/dashboard/todayTask')
        }}>
            <img src={home} alt="" />
        </button>
        <button className='nav_btn' onClick={() => {
            menuNavigate('/dashboard/calendar')
        }}>
            <img src={calendar} alt="" />
        </button>
        <button className='nav_btn time_icon' onClick={() => {
            menuNavigate('/dashboard/pomodoro')
        }}>
            <IoTimer />
        </button>
        <button className='nav_btn'>
            <img src={profileTwoUsers} alt="" />
        </button>
    </nav>
  )
}
