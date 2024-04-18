/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Page from '../../components/Page'
import Content from '../../components/Content'
import TimeStamp from '../../components/TimeStamp'
import service from '../../service'
import './check-in.scss'

const getDate = (timestamp) => {
  // Create a new Date object from the timestamp
  const date = new Date(timestamp)

  const hours = date.getHours()
  const minutes = date.getMinutes()

  // Convert the hours to 12 hour format
  const hours12 = hours % 12

  // Add an AM or PM indicator
  const ampm = hours >= 12 ? 'p.m.' : 'a.m.'

  // Create a string representing the time in 12 hour format
  const time12 = `${hours12}:${minutes} ${ampm}`

  // Return the time string
  return time12
}

const Notes = ({ items }) => {
  const lis = items.split('|')
  return (
    <div>
      <p><b>Note:</b></p>
      <ul className='check-in-wrapper-list'>
        {lis.map((i, key) => <li key={key}>{i}</li>)}
      </ul>
    </div>
  )
}

const Badge = ({ header, message, success }) => {
  const status = success ? 'Success': 'Error'
  const cls = success ? 'header success' : 'header fail'
  const imgSrc = success ? 'https://kiosk-assets-public.s3.amazonaws.com/check.png' : 'https://kiosk-assets-public.s3.amazonaws.com/x.png'
  return (
    <>
      <h2>Check In Information</h2>
      <div className='badge-wrapper'>
        <img src={imgSrc} width='100' />
        <div className='messages'>
          <p className={cls}>Check-In {status} — {header}</p>
          <div className='details'>
            <p>{message}</p>
            {!success && (
              <p>Please contact the facilitator for more information</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function CheckIn() {
  const [event, setEvent] = useState()
  const [attendence, setAttendence] = useState()
  const [checkedIn, setCheckedIn] = useState()
  
  const location = useLocation()
  
  // Get the query params
  const queryParams = new URLSearchParams(location.search)
  const eventId = queryParams.get('eventId')
  const userId = queryParams.get('userId')
  
  useEffect(() => {
    async function fetchData() {
      const checkedIn = await service.checkInUser(eventId, userId)
      const event = await service.getEventById(eventId)
      const attendence = await service.getAttendence(eventId)
      console.log(checkedIn)
      setCheckedIn(checkedIn)
      setEvent(event)
      setAttendence(attendence)
    }

    fetchData()
  }, [eventId, userId])

  return (
    <Page>
      <TimeStamp />
      <Content>
        {!!event && !!attendence && (
          <>
            <div className='check-in-wrapper'>
              <div className='left'>
                <div className='scanner'>
                  <div className='scanner-content'>
                    <span>Scan QR Code to Check-In</span>
                    <p><em>Scan QR Code by holding printed badge under camera located at the bottom of this device.</em></p>
                  </div>
                </div>
                <div className='attendee-container'>
                  <h2>Attendee Count</h2>
                  <div className='count'>
                    <p>{attendence.length}</p>
                    <span>of</span>
                    <p>{event.max_attendees}</p>
                    <span>checked in</span>
                  </div>
                  <div className='bottom'>
                    <div>Max Attendee Count: {event.max_attendees}</div>
                  </div>
                </div>
              </div>
              <div className='right'>
                {!!checkedIn && (
                  <Badge header={checkedIn.header} success={checkedIn.status} message={checkedIn.message} />
                )}
                <h2>Session Information</h2>
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
                  <p><b>Session begins at {getDate(event.start_time)}</b></p>
                </div>
                <Notes items={event.notes} />
              </div>
            </div>
          </>
        )}
        <div className='qr-button qr-button-start'>
          <Link to={{
            pathname: '/find-session',
          }}>
            <button>Find Session</button>
          </Link>
        </div>
      </Content>
    </Page>
  )
}

export default CheckIn
