// доделать помодоро таймер

import { VscDebugStart } from "react-icons/vsc";
import { useEffect, useState, useRef } from 'react'
import './time.css'

const RADIUS = 140
const CIRCLE_SIZE = 2 * Math.PI * RADIUS

export const Timer = () => {

  const containerRef = useRef(null)
  const [centerX, setCenterX] = useState<number>(RADIUS)
  const [centerY, setCenterY] = useState<number>(RADIUS)

  // count middle circle in container
  useEffect(() => {
    if (containerRef.current) {
      setCenterX(containerRef.current.clientHeight/2)
      setCenterY(containerRef.current.clientHeight/2)
    }
  },[])
  
  const intervalRef  = useRef<number | null>(null)

  const [isRunning, setIsRunning] = useState<boolean>(() => {
    const saved = localStorage.getItem('startTimer')
    return saved ? JSON.parse(saved).isRunning : false
  })
  const [totalSeconds, setTotalSeconds] = useState(() => {
    const saved = localStorage.getItem('startTimer')
    return saved ? JSON.parse(saved).totalSeconds : 25 * 60
  })
  const [isBreakTime, setIsBreakTime] = useState<boolean>(() => {
    const saved = localStorage.getItem('startTimer')
    return saved ? JSON.parse(saved).isBreakTime : false
  })

  const [workTime, setWorkTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)

  // count min/seconds
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  
  // progress for circle
  const calculateProgress = (times:number) => {
    const maxSeconds = times * 60
    const progress = maxSeconds - totalSeconds
    return CIRCLE_SIZE - (CIRCLE_SIZE * progress) / maxSeconds
  }

  const [strokeOffset, setStrokeOffset] = useState<number>(() => {
    const currentTime = isBreakTime ? breakTime : workTime
    return calculateProgress(currentTime)})

   // circle progress calc
  useEffect(() => {
    const currentTime = isBreakTime ? breakTime : workTime
    setStrokeOffset(() => calculateProgress(currentTime))
  },[totalSeconds,isBreakTime])

  useEffect(() => {
   
    if(totalSeconds === 0 && isRunning){
      setIsRunning(false)
      if(!isBreakTime){
        setIsBreakTime(true)
        setTotalSeconds(breakTime * 60)
      } else{
        setIsBreakTime(false)
        setTotalSeconds(workTime * 60)
      }
    } 
  },[totalSeconds])
  
  // updating value in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('startTimer')
    if (saved){
      const isRunLocal = JSON.parse(saved)
      localStorage.setItem('startTimer', JSON.stringify({...isRunLocal,
        isRunning: isRunning,
        isBreakTime: isBreakTime,
        totalSeconds: totalSeconds
      }))
    }
  },[isRunning])

  const startWorkTimer = () => {
    if (isRunning) return
    setIsRunning(true)
    const now = Date.now()
    localStorage.setItem('startTimer', JSON.stringify({
      startTime: now,
      workTime: workTime,
      isRunning: true,
      isBreakTime: isBreakTime,
      totalSeconds: totalSeconds
    }))
    startInterval()
  }

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setTotalSeconds(prevSec => {
        if (prevSec <= 1){
          clearInterval(intervalRef.current)
          intervalRef.current = null
          return 0
        }
        return prevSec - 1
      })
    },1000)
  }

  const hundleTimeWork = (workTime:number, breakTime:number) => {
    if (isRunning) return
    setTotalSeconds(workTime * 60)
    setWorkTime(workTime)
    setBreakTime(breakTime) 
  }

  useEffect(() => {
    const saved = localStorage.getItem('startTimer')
    if (saved){
      const savedData = JSON.parse(saved)
      if (savedData.isRunning && !intervalRef.current){
        const elapsed = Math.floor((Date.now() - savedData.startTime) / 1000)
        console.log(elapsed)
        const remaining = savedData.totalSeconds - elapsed
        console.log('осталось', remaining)
        if (remaining > 0){
          console.log('время', remaining)
          setTotalSeconds(remaining)
          setWorkTime(savedData.workTime)
          setIsBreakTime(savedData.isBreakTime)
          startInterval()
        } 
      }
    }
  },[])

  const resetTimer = () => {

    clearInterval(intervalRef.current)
    intervalRef.current = null
    localStorage.removeItem('startTimer')
    setTotalSeconds(workTime * 60)
    setIsRunning(false)
    setIsBreakTime(false)
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  },[])


  return (
    <section className='flex flex-col justify-between items-center container_timer'>
      <div className="container_parcent">
          <div className='parcent' ref={containerRef}>
            <svg>
              <circle cx={centerX} cy={centerY} r={RADIUS}></circle>
              <circle 
              cx={centerX} cy={centerY} r={RADIUS} 
              style={
                {stroke:'#5F33E1', 
                strokeDasharray:CIRCLE_SIZE, 
                strokeDashoffset:strokeOffset,
                transition:'1s easy-in-out'
                }
              }>   
                test
              </circle>
            </svg>
            <div className="text_in_circle">
              {`${minutes}:${seconds.toString().padStart(2, '0')}`}
            </div>
          </div>
      </div>
      <div className='timer_start_btn'>
        <button type='button' className="start_timer" onClick={startWorkTimer}
          style={isRunning? {opacity: '0.7', cursor:'default', transform:'scale(0.85)'}: {opacity: '1', cursor:'pointer'}}>
          <VscDebugStart />
        </button>
        <button type="button" className="stop_timer" onClick={resetTimer} 
          style={!isRunning? {opacity: '0.7', cursor:'default',transform:'scale(0.85)'}: {opacity: '1', cursor:'pointer'}}>
          Stop
        </button>
      </div>
      <div className='flex justify-between timer_nav'>
        <button type='button' className="add_time" onClick={() => hundleTimeWork(25,5)}>25/5</button>
        <button type='button' className="add_time" onClick={() => hundleTimeWork(30,10)}>30/10</button>
        <button type='button' className="add_time" onClick={() => hundleTimeWork(45,10)}>45/10</button>
      </div>
    </section>
  )
}
