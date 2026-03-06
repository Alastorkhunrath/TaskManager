


import { pb } from '../../lib/pocketbase'
import { Navigate } from 'react-router'


export const ProtectedRoute = ({children}) => {

    const isAuthToken = pb.authStore.isValid
   
    if (!isAuthToken){
        return (
            <Navigate to='/login' />
        )
    }


  return (children)
}


