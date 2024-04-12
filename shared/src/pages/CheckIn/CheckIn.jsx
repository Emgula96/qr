/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Page from '../../components/Page'
import Content from '../../components/Content'
import TimeStamp from '../../components/TimeStamp'
import service from '../../service'
import './check-in.scss'

const Notes = ({ items }) => {
  const lis = items.split('|')
  return (
    <div>
      <p><b>Note:</b></p>
      <ul className='check-in-wrapper-list'>
        {lis.map((i, key) => {
          return <li key={key}>{i}</li>
        })}
      </ul>
    </div>
  )
}

function CheckIn() {
  const [event, setEvent] = useState()
  const [attendence, setAttendence] = useState()
  
  const location = useLocation()
  
  // Get the query params
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('eventId')
  
  useEffect(() => {
    async function fetchData() {
      const event = await service.getEventById(id)
      const attendence = await service.getAttendence(id)
      setEvent(event)
      setAttendence(attendence)
    }

    fetchData()
  }, [id])  

  return (
    <Page>
      <TimeStamp />
      <Content heading='Session Information' subHeading={''}>
        {!!event && !!attendence && (
          <>
            <div className='scanner'>
              <div className='scanner-content'>
                <span>Scan QR Code to Check-In</span>
                <p><em>Scan QR Code by holding printed badge under camera located at the bottom of this device.</em></p>
              </div>
            </div><div className='check-in-wrapper'>
              <div className='attendee-container'>
                <h2>Attendee Count</h2>
                <div className='count'>
                  <p>{attendence.length}</p>
                  <span>of</span>
                  <p>{event.max_attendees}</p>
                  <span>checked in</span>
                </div>
                <div className='bottom'>
                  <span>Max Attendee Count:</span>
                  <span>{event.max_attendees}</span>
                </div>
              </div>
              <div className='check-in-wrapper-inner'>
                <div className='check-in-wrapper-item'>
                  <p><b>Session ID:</b></p>
                  <p>{event.id}</p>
                </div>
                <div className='check-in-wrapper-item'>
                  <p><b>Room No.:</b></p>
                  <p>{event.room_number}</p>
                </div>
                <div className='check-in-wrapper-item'>
                  <p><b>Presenter:</b></p>
                  <p>{event.presenter}</p>
                </div>
                <div className='check-in-wrapper-item'>
                  <p><b>Facilitator:</b></p>
                  <p>{event.facilitator}</p>
                </div>
                <div className='check-in-wrapper-item'>
                  <p><b>{event.title}</b></p>
                </div>
                <div className='check-in-wrapper-item'>
                  <p><b>Description:</b></p>
                  <p>{event.description}</p>
                </div>
                <div className='check-in-wrapper-item'>
                  <p><b>Credits Available:</b></p>
                  <p>{event.credits}</p>
                </div>
                <div className='check-in-wrapper-item'>
                  <p><b>{event.start_time}</b></p>
                </div>
                <Notes items={event.notes} />
              </div>
            </div>
          </>
        )}
      </Content>
    </Page>
  )
}

export default CheckIn
