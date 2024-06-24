/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Page from '../../components/Page'
import Content from '../../components/Content'
import TimeStamp from '../../components/TimeStamp'
import QRCodeScanner from '../../components/QRCodeScanner'
import service from '../../service'
import beep from '../../assets/sounds/beep.wav'
import './check-in.scss'

const getDate = (timestamp) => {
  // Create a new Date object from the timestamp (which is already in UTC)
  const date = new Date(timestamp);

  // Get hours and minutes in 12-hour format with AM/PM indicator
  let hours = date.getUTCHours(); // Use getUTCHours() to get hours in UTC
  const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Use getUTCMinutes() for minutes in UTC

  // Convert the hours to 12-hour format and handle midnight and noon cases
  const hours12 = hours % 12 || 12;

  // Add an AM or PM indicator
  const ampm = hours >= 12 ? 'p.m.' : 'a.m.';

  // Create a string representing the time in 12-hour format
  const time12 = `${hours12}:${minutes} ${ampm}`;

  // Return the time string
  return time12;
};

const debounce = (callback, wait) => {
  let timeoutId = null
  return (...args) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback(...args)
    }, wait)
  }
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

  const beepSound = useMemo(() => {
    return new Audio(beep)
  }, [])

  const onNewScanResult = debounce((decodedText) => {
    console.log(`Code matched = ${decodedText}`)
    const url = new URL(decodedText)
    const userId = url.searchParams.get('userId')

    service.checkInUser(eventId, userId).then((checkedIn) => {
      setCheckedIn(checkedIn)
      beepSound.play()
    }).catch((err) => {
      console.error(err)
    }).finally(() => {
      setTimeout(() => {
        setCheckedIn(null)
      }, 4000)
    })
  }, 500)
  
  useEffect(() => {
    async function fetchData() {
      const queryParams = new URLSearchParams(location.search)
      const roomName = queryParams.get('roomname') ? queryParams.get('roomname') : 'Classroom'
      const mockEvent = {
        id: '1836497',
        room_number: roomName,
        presenter: '',
        facilitator: 'Amanda Galvan',
        title: 'Region 4 All-Staff Meeting',
        description: 'All-Staff Meeting',
        credits: '(0) Contact Hours',
        start_time: '2024-06-26T08:00:00Z',  // ISO 8601 format
        notes: '',
        max_attendees: 50
      };
      // const event = await service.getEventById(1)
      const event = mockEvent
      const attendence = await service.getAttendence(eventId)
      setEvent(event)
      setAttendence(attendence)
    }

    fetchData()
  }, [eventId])

  return (
    <>
      <TimeStamp isVertical={true}/>
        {!!event && !!attendence && (
          <>
            <div className='check-in-wrapper'>
              <div className='left'>
                <div className='scanner'>
                  <div className='scanner-content'>
                    <span>Scan QR Code to Check-In</span>
                    <p><em>Scan QR Code by holding printed badge under camera located at the bottom of this device.</em></p>
                    <QRCodeScanner
                      fps={10}
                      qrbox={354}
                      disableFlip={false}
                      qrCodeSuccessCallback={onNewScanResult} 
                    />
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
              <div className='center'>
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
                {event.notes && event.notes.trim() && <Notes items={event.notes} />}
              </div>
              <div className="banner right">
                <img src="sidebar.png" alt="Image 1" className="banner-image" />
              </div>
            </div>
          </>
        )}
        {/* <div className='qr-button qr-button-start left'>
          <Link to={{
            pathname: '/find-session',
          }}>
            <button>Find Session</button>
          </Link>
        </div> */}
      </>
  )
}

export default CheckIn
