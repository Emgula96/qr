import { useState, useEffect } from 'react'
import './timestamp.scss'
// import PropTypes from 'prop-types'

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function TimeStamp() {
    const [date, setDate] = useState("")

    // On mount, set up timers, get current date, etc.
    useEffect(() => {
        const today = new Date()

        const dateString = `${weekday[today.getDay()]}, ${month[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`
        setDate(dateString)
    }, [])

    return (
        <div className='timestamp-wrapper'>
            {date}
        </div>
      )
}
  
export default TimeStamp