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
import {dummySession} from './CheckInStatusChecks';


function CheckIn() {
  const [event, setEvent] = useState(dummySession);
  const [status, setStatus] = useState(null);
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

  const [showScanner, setShowScanner] = useState(false);
  const [scannerInstance, setScannerInstance] = useState(null);

  const fetchEvent = async () => {
    try {
      const todayEvents = await service.getEventByRoomAndTime(
        roomName,
        currentTime.toLocaleDateString('en-CA')
      );
      setEvent(displaySession(todayEvents));
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

    // Set up interval to fetch event every 15 minutes
    const intervalId = setInterval(fetchEvent, 15 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [roomName]);

  useEffect(() => {
    // Update current time every minute
    const timerId = setInterval(() => setCurrentTime(new Date()), 60 * 1000);

    return () => clearInterval(timerId);
  }, []);

  const onNewScanResult = debounce(
    (decodedText) => handleQrScan(decodedText, event, beepSound, setStatus, isUserLate),
    500
  );

  const handleStartScanning = () => {
    setShowScanner(true);
    
    // Auto-stop after 10 seconds
    setTimeout(() => {
      setShowScanner(false);
      if (scannerInstance) {
        scannerInstance.stop().catch((err) => {
          console.error('Failed to stop scanner:', err);
        });
      }
    }, 45000);
  };

  // Add scanner instance ref callback
  const onScannerLoad = (instance) => {
    setScannerInstance(instance);
  };

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
      <div className="room-name-container">
        <h3 className="room-name">Room No:</h3>
        <div className="room-name-divider">
          <h3 className="room-name-number">{event?.event_dates[0]?.room?.label}</h3>
        </div>
      </div>

      <div className="check-in-wrapper">
        <div className="left">
          <div className="scanner">
            <div className="scanner-content">
              <h2>Scan QR Code to Check-In</h2>
              <p>
                <em>
                  Scan QR Code by holding printed badge in front of camera
                  located at the top of this device.
                </em>
              </p>
              {!showScanner ? (
                <div className="scanner-start-container">
                  <button 
                    className="scanner-start-button"
                    onClick={handleStartScanning}
                  >
                    Start Scanning
                  </button>
                </div>
              ) : (
                <QRCodeScanner
                  fps={10}
                  qrbox={354}
                  disableFlip={false}
                  qrCodeSuccessCallback={onNewScanResult}
                  verbose={true}
                  isScanning={true}
                  onLoad={onScannerLoad}
                />
              )}
            </div>
          </div>
          <div className="attendee-container">
            <h2>Attendee Count</h2>
            <div className="count">
              <p>{event?.capacity}</p>
            </div>
          </div>
        </div>
        <div className="center">
          {status && (
            <Status status={status} attendeeName={'Test Attendee'} />
          )}
          <p className="large-text">
            <strong>Room No:</strong> {roomName ? roomName : 'Test-room'}
          </p>
          <p className="large-text extra-bottom-space">{event?.title}</p>
          <p className="large-text extra-bottom-space">
            Session begins at {sessionStartTime} (CST)
          </p>
          <p className="large-text extra-bottom-space">
            Session Information
          </p>
          <SessionInfo event={event} />
        </div>
        {event?.notes && event?.notes.trim() && (
          <Notes items={event?.notes} />
        )}
        <div className="banner-right">
          <img
            src="sidebar.png"
            alt="We've got your back"
            onClick={fetchEvent}
            className="banner-image"
          />
        </div>
      </div>
    </>
  );
}

export default CheckIn;