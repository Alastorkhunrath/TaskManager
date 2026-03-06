import './auth.css'
import { TbSquareRoundedArrowRight } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useState } from 'react';

import { pb } from '../../lib/pocketbase';

export const Login = () => {

    const [login, setLogin] = useState<string>('')
    const [pass, setPass] = useState<string>('')

    const navigateLogin = useNavigate()

    const hundleSubmit = async(e: React.FormEvent) => {
            e.preventDefault()
            if (!login || !pass ) {
                alert('Не все поля заполены!')
                return
            }
            try{
                await pb.collection('users').authWithPassword(login, pass)
                alert('Вы вошли')
                navigateLogin('/dashboard/todayTask')
            } catch(err:any) {
                alert('Ошибка входа')
                console.log(err.data)
            }
        }

  return (
    <section className='container height_con'>
        <h1>Login</h1>
        <form onSubmit={hundleSubmit}>
            
            <div className='form_container'>
                <input type="email" placeholder='Email/Login' value={login} onChange={(e) => setLogin(e.target.value)} />
                <input type="password" placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)} />
                <button className='letsGo_btn' type='submit'>
                    <span className='plug_btn'></span>
                    <span className='text_btn'>
                        Lets's Start 
                    </span>
                    <span className='arrow_btn'>
                        <TbSquareRoundedArrowRight />
                    </span>
                </button>
                <button className='reg_btn' type='button' onClick={() => navigateLogin('/register')}>
                    Register
                </button>
            </div>
            
        </form>
    </section>
  )
}
