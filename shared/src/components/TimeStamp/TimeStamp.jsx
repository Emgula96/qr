import { useState, useEffect } from 'react'
import './timestamp.scss'

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function TimeStamp() {
    const [date, setDate] = useState(new Date())
    const [dateString, setDateString] = useState("")
    const [timeString, setTimeString] = useState("")

    // On mount, set up timers, get current date, etc.
    useEffect(() => {
        // Set the timer
        const timer = setInterval(() => {
            setDate(new Date())
        }, 1000)

        // Set the date
        const d = new Date()
        const dateString = `${weekday[d.getDay()]}, ${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
        setDateString(dateString)

        return () => { clearInterval(timer) }
    }, [])

    // Set time based on interval started on mount, every second
    useEffect(() => {
        const timeString = date.toLocaleTimeString('en', { hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric' });
        setTimeString(timeString)
    }, [date])

    return (
        <div className='timestamp-wrapper'>
            <div className='timestamp-date'>{dateString}</div>
            <div className='timestamp-time'>{timeString}</div>
        </div>
      )
}
  
export default TimeStamp