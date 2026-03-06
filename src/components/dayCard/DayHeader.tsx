import { useState } from "react"

import './dayCard.css'

export const DayHeader = ({dateDayItem}) => {



  
  return (
    <div className='day_weekly_header'>
      <h2 className="title_date_week">
        {dateDayItem.date.toLocaleString('en-US',{ weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
      </h2>
    </div>
  )
}
