import { useState } from "react";
import { TbSquareRoundedArrowRight } from "react-icons/tb";
import { useNavigate } from "react-router";


import { pb } from "../../lib/pocketbase";


export const Register = () => {

    const [login, setLogin] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [confPass, setConfPass] = useState<string>('')

    const navigateReg = useNavigate()


    const hundleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        if (!login || !pass || !confPass) {
            alert('Не все поля заполены!')
            return
        }
        if (pass !== confPass){
            alert('Пороли не совпадают')
            return
        }
        try{
            await pb.collection('users').create({
                email:login,
                password:pass,
                passwordConfirm:confPass
            })

            alert('Вы зарегестрированы')
        } catch(err:any) {
            alert('Ошибка регистрации')
            console.log(err.data)
        }
    }


  return (
   <section className='container height_con_reg'>
           <h1>Register</h1>
           <form onSubmit={hundleSubmit}>
               <div className='form_container'>
                   <input type="email" placeholder='Email/Login' value={login} onChange={(e) => setLogin(e.target.value)} />
                   <input type="password" placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)}/>
                   <input type="password" placeholder='Confirm password' value={confPass} onChange={(e) => setConfPass(e.target.value)} />
                   <button className='letsGo_btn' type="submit">
                       <span className='plug_btn'></span>
                       <span className='text_btn'>
                           Lets's Start 
                       </span>
                       <span className='arrow_btn'>
                           <TbSquareRoundedArrowRight />
                       </span>
                   </button>
                   <button className='reg_btn' type="button" onClick={() => navigateReg('/login')}>
                       login
                   </button>
               </div>
               
           </form>
       </section>
  )
}
