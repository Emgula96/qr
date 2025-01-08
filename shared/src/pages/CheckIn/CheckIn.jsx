/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import TimeStamp from '../../components/TimeStamp';
import QRCodeScanner from '../../components/QRCodeScanner';
import service from '../../util/Functions/service';
import beep from '../../assets/sounds/beep.wav';
import './check-in.scss';
import Status from '../Status/Status';
import displaySession from './displaySession';
import { militaryToReadable } from '../../util/Functions/militaryToReadable';
import { isLateCheckIn } from './isLateCheckIn';
import { debounce } from '../../util/Functions/debounce';
import { Notes } from '../../components/Notes/Notes';
import { SessionInfo } from '../../components/SessionInfo/SessionInfo';
import { handleQrScan } from '../../util/Functions/handleQrScan';

function CheckIn() {
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState(null);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const location = useLocation();
  const roomName = new URLSearchParams(location.search).get('roomname');
  const beepSound = useMemo(() => new Audio(beep), []);
  const isUserLate = useMemo(() => {
    return isLateCheckIn(event);
  }, [event]);

  const sessionStartTime = useMemo(() => 
    militaryToReadable(event?.event_dates[0]?.start_time),
  [event]
  );

  const fetchEvent = async () => {
    try {
      const todayEvents = await service.getEventByRoomAndTime(
        roomName,
        currentTime.toLocaleDateString('en-CA')
      );
      console.log('todayEvents', todayEvents);
      const newEventData = displaySession(todayEvents);
      
      // Only reset attnd count if the event ID has changed
      if (newEventData?.id !== event?.id) {
        setCheckedInCount(0);
      }
      
      setEvent(newEventData);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  useEffect(() => {
    setStatus(isUserLate ? 'Late Check-In' : null);
  }, [isUserLate]);

  useEffect(() => {
    // Fetch event immediately on component mount
    fetchEvent();

    // Set up interval to fetch event every 3 minutes
    const intervalId = setInterval(fetchEvent, 3 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [roomName]);

  useEffect(() => {
    // Update current time every minute
    const timerId = setInterval(() => setCurrentTime(new Date()), 60 * 1000);

    return () => clearInterval(timerId);
  }, []);

  const isSessionFull = useMemo(() => {
    return event && checkedInCount >= event.capacity;
  }, [checkedInCount, event]);
  const onNewScanResult = debounce(
    async (decodedText) => {
      if (isSessionFull) {
        setStatus('Session Full');
        return;
      }
      const scanResult = await handleQrScan(decodedText, event, beepSound, setStatus, isUserLate);
      if (scanResult?.success && checkedInCount < event?.capacity) {
        setCheckedInCount((prevCount) => {
          return prevCount + 1;
        });
      }
    },
    500
  );

  if (!event) {
    return (
      <div className="parent-div">
        <div className="region4logo">
          <img src="region4header.png" alt="R4 Logo" />
        </div>
        <div className="page-footer">
          <img className="page-footer" src="infofooter_wevegotyourback.png" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="timestamp-container">
        <TimeStamp isVertical={true} />
      </div>
      <div className="check-in-wrapper">
        <div className="left">
          <div className="scanner">
            <div className="scanner-content">
              <h2>Scan QR Code to Check-In</h2>
              <p className="scanner-text">
                <em>
                  Scan QR Code by holding printed badge in front of camera
                  located at the top of this device.
                </em>
              </p>
              <div className="qr-code-scanner">
                <QRCodeScanner
                  fps={10}
                  qrbox={250}
                  disableFlip={false}
                  qrCodeSuccessCallback={onNewScanResult}
                  verbose={true}
                />
              </div>
            </div>
          </div>
          <div className="attendee-container">
            <h2>Attendee Count</h2>
            <div className="count">
              <p>{isSessionFull ? "Session at Capacity" : `${checkedInCount} / ${event?.capacity}`}</p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="room-name-container">
            <h3 className="room-name">Room:</h3>
            <div className="room-name-divider">
              <h3 className="room-name-text">{event?.event_dates[0]?.room?.label}</h3>
            </div>
          </div>
          {status && (
            <Status status={status} attendeeName={'Test Attendee'} />
          )}
          <p className="large-text extra-bottom-space">{event?.title}</p>
          <p className="large-text extra-bottom-space">
            Session begins at {sessionStartTime} (CST)
          </p>
          <p className="large-text extra-bottom-space">
            Session Information
          </p>
          <div className="session-info-container">
            <SessionInfo event={event} />
            </div>
            <div className="info-footer">
              <img className='logo' src="region4header.png" />
          </div>

        </div>
        {event?.notes && event?.notes.trim() && (
          <Notes items={event?.notes} />
        )}
      </div>
    </>
  );
}

export default CheckIn;