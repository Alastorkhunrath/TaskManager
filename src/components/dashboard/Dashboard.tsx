
import { Outlet } from 'react-router'
import  bellIcon  from '../../assets/icons/bell.svg' 
import { MenuNav } from '../menu/menuNav/MenuNav'
import { MenuProfile } from '../menu/menuProfile/MenuProfile'

import { pb } from '../../lib/pocketbase'

import './dashboasrd.css'
import { useNavigate } from 'react-router'

import { GiExitDoor } from "react-icons/gi";
export const Dashboard = () => {

  const menuNavigate = useNavigate()

const logOut = () => {
    pb.authStore.clear()    // Это делает removeItem + очищает память
    menuNavigate('/login')
}

  return (
    <>
    <header>
        <menu>
            <MenuProfile />
            <MenuNav />
            <div>
                <button className='exit_door_btn'  onClick={logOut}>
                  <GiExitDoor />
                </button>
            </div>
        </menu>
    </header>
    <Outlet />
    </>
    
  )
}
