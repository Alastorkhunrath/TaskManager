

import './menuProfile.css'

import { useUser } from '../../../hooks/useUser'


export const MenuProfile = () => {

  const { userData } = useUser()

  return (
    <div className='flex justify-between items-center named_profile_container'>
        <div className='img_profile'>
            <div className='img_avatar'>
                <img src={'null'} alt="" />
            </div>
        </div>
        <div className='name_hello'>
            <h4>Hello!</h4>
            <h3>{userData?.firstName && userData?.secondName?
            `${userData?.firstName} ${userData?.secondName}`
            : userData?.username}</h3>
        </div>

    </div>
  )
}

 