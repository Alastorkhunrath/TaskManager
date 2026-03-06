

import { Calendar } from './components/calendar/Calendar';
import { TodayTask } from './components/todayTask/TodayTask';
import { Timer } from './components/pomodoro/Timer';

import { TaskProvider } from './context/TaskProvider'
import './App.css'

// useLocation - для отслеживания текущего URL
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { Dashboard } from './components/dashboard/Dashboard';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';

import { ProtectedRoute } from './components/auth/ProtectedRoute';

import { pb } from './lib/pocketbase';


// AnimatePresence - для анимации выхода компонентов, motion - для анимированных элементов
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  // Получаем текущий роут для отслеживания переходов
  const location = useLocation()
  
  return (
    <TaskProvider>
    

      {/* mode="wait" - ждет завершения exit анимации перед показом новой страницы */}
      <AnimatePresence mode="wait">
        {/* key меняется при смене роута - запускает анимацию */}
        <Routes location={location} key={location.pathname}> 


{/* авторизация не нужна */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />


{/* Защищённые роуты (авторизация нужна) */}

        
          <Route path='/' element={
            pb.authStore.isValid
            ?  <Navigate to='/dashboard/todayTask' replace />
            : <Navigate to='/login' replace />
           } />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />  
            </ProtectedRoute>
            }>
            
            
            {/* TodayTask - слайд слева */}
            <Route path='todayTask' element={
              <motion.div
                initial={{ x: -300, opacity: 0 }}  // Начало: слева и невидимый
                animate={{ x: 0, opacity: 1 }}     // Анимация: на место и видимый
                exit={{ x: 300, opacity: 0 }}      // Выход: вправо и исчезает
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <TodayTask />
              </motion.div>
            } />
            {/* Calendar - слайд справа */}
            <Route path='calendar' element={
              <motion.div
                initial={{ x: 300, opacity: 0 }}   // Начало: справа и невидимый
                animate={{ x: 0, opacity: 1 }}     // Анимация: на место и видимый
                exit={{ x: -300, opacity: 0 }}     // Выход: влево и исчезает
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Calendar />
              </motion.div>
            } />   
            {/* Pomodoro - эффект увеличения */}
            <Route path='pomodoro' element={
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}  // Начало: маленький и невидимый
                animate={{ scale: 1, opacity: 1 }}    // Анимация: нормальный размер и видимый
                exit={{ scale: 0.8, opacity: 0 }}     // Выход: уменьшается и исчезает
                transition={{ duration: 0.3 }}
              >
                <Timer />
              </motion.div>
            } />   
          </Route>
        </Routes>
      </AnimatePresence>
    </TaskProvider>
  )
}

export default App
