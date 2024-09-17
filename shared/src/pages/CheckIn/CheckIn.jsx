/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { parseISO, isPast, addMinutes, subMinutes } from 'date-fns'; // Make sure to install date-fns

import TimeStamp from '../../components/TimeStamp';
import QRCodeScanner from '../../components/QRCodeScanner';
import service from '../../service';
import beep from '../../assets/sounds/beep.wav';
import './check-in.scss';
import Status from '../Status/Status';
import { dummySession } from './CheckInStatusChecks';
import displaySession from './displaySession';

const militaryToReadable = (timeStr = '10:00:00') => {
  // Split the input time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);

  // Determine if it's AM or PM
  const period = hours < 12 ? 'AM' : 'PM';

  // Convert hours to 12-hour format
  const readableHours = hours % 12 || 12;

  // Format the readable time string
  const readableTime = `${readableHours}:${minutes.toString().padStart(2, '0')} ${period}`;

  return readableTime;
};

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

const Notes = ({ items }) => {
  const lis = items.split('|');
  return (
    <div>
      <p>
        <b>Note:</b>
      </p>
      <ul className="check-in-wrapper-list">
        {lis.map((i, key) => (
          <li key={key}>{i}</li>
        ))}
      </ul>
    </div>
  );
};

const Badge = ({ header, message, success }) => {
  const status = success ? 'Success' : 'Error';
  const cls = success ? 'header success' : 'header fail';
  const imgSrc = success
    ? 'https://kiosk-assets-public.s3.amazonaws.com/check.png'
    : 'https://kiosk-assets-public.s3.amazonaws.com/x.png';
  return (
    <>
      <h2>Check In Information</h2>
      <div className="badge-wrapper">
        <img src={imgSrc} width="100" />
        <div className="messages">
          <p className={cls}>
            Check-In {status} — {header}
          </p>
          <div className="details">
            <p>{message}</p>
            {!success && (
              <p>Please contact the facilitator for more information</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function CheckIn() {
  const [event, setEvent] = useState();
  const [checkedIn, setCheckedIn] = useState();
  const [status, setStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomName = queryParams.get('roomname');

  const isLateCheckIn = useMemo(() => {
    if (event && event?.event_dates && event?.event_dates[0]) {
      const { event_date, start_time } = event.event_dates[0];
      const sessionStartTime = parseISO(`${event_date}T${start_time}`);
      const lateThreshold = addMinutes(
        sessionStartTime,
        event.late_threshold || 0
      );

      return isPast(lateThreshold);
    }
    return false;
  }, [event, currentTime]);

  const fetchEvent = async () => {
    try {
      console.log('Fetching event...');
      const todayEvents = await service.getEventByRoomAndTime(
        roomName,
        currentTime.toLocaleDateString('en-CA')
      );
      const session = displaySession(todayEvents);
      console.log(session);
      setEvent(session);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  useEffect(() => {
    if (isLateCheckIn) {
      setStatus('Late Check-In');
    } else {
      setStatus(null);
    }
  }, [isLateCheckIn]);

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

  const onNewScanResult = debounce((decodedText) => {
    console.log(`Code matched = ${decodedText}`);

    const parseScan = (text) => {
      // Split the string into key-value pairs
      const pairs = text.split(',');

      // Create an object to store the parsed data
      const dataObj = {};

      // Iterate over each pair and split into key and value
      pairs.forEach((pair) => {
        const [key, value] = pair.split('=');
        dataObj[key] = value;
      });

      return dataObj;
    };

    const { userId, sessionId } = parseScan(decodedText);

    service
      .checkInUser(sessionId, userId)
      .then((checkedIn) => {
        const checkLateCheckIn = (session, currentTime) => {
          if (session && session.late_threshold) {
            const sessionStartTime = new Date(session.startTime);
            const latenessThreshold = parseInt(session.late_threshold);
            const lateThresholdTime = new Date(
              sessionStartTime.getTime() + latenessThreshold * 60000
            );

            if (currentTime > lateThresholdTime) {
              setStatus('Late Check-In');
            } else {
              setStatus(null);
            }
          }
        };

        // Assuming the session data is available in the checkedIn object
        if (checkedIn && checkedIn.session) {
          checkLateCheckIn(checkedIn.session, new Date());
        }
        setCheckedIn(checkedIn);
        beepSound.play();

        if (isLateCheckIn) {
          setStatus('Late Check-In');
        } else {
          setStatus(null);
        }
      })
      .catch((err) => {
        console.error(err);
        setStatus('Check-In Error');
      })
      .finally(() => {
        setTimeout(() => {
          setCheckedIn(null);
        }, 4000);
      });
  }, 500);

  const beepSound = useMemo(() => {
    return new Audio(beep);
  }, []);
  const handleManualRefresh = () => {
    const manualFetchEvent = async () => {
      try {
        fetchEvent();
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    manualFetchEvent();
  };

  return (
    <>
      <div className="timestamp-container">
        <TimeStamp isVertical={true} />
      </div>
      {event ? (
        <>
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
                  <QRCodeScanner
                    fps={10}
                    qrbox={354}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                    verbose={true}
                  />
                </div>
              </div>
              <div className="attendee-container">
                <h2>Attendee Count</h2>
                <div className="count">
                  <p>{event.capacity}</p>
                  <span>checked in</span>
                </div>
                <div className="bottom">
                  <div>Max Attendee Count: {event.max_attendees}</div>
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
              <p className="large-text extra-bottom-space">{event.title}</p>
              <p className="large-text extra-bottom-space">
                Session begins at{' '}
                {militaryToReadable(event.event_dates[0].start_time)} (CST)
              </p>
              <p className="large-text extra-bottom-space">
                Session Information
              </p>
              <div className="session-info-grid">
                <div className="session-info-item">
                  <p>
                    <b>Session ID:</b>
                  </p>
                  <p>{event.id}</p>
                </div>
                <div className="session-info-item">
                  <p>
                    <b>Presenter:</b>
                  </p>
                  <p>
                    {event.instructors
                      .map(
                        (instructor) =>
                          `${instructor.first_name} ${instructor.last_name}`
                      )
                      .join(', ')}
                  </p>
                </div>
                <div className="session-info-item">
                  <p>
                    <b>Facilitator:</b>
                  </p>
                  <p>{event.contact_person}</p>
                </div>
                <div className="session-info-item">
                  <p>
                    <b>Description:</b>
                  </p>
                  <p>{event.details}</p>
                </div>
                <div className="session-info-item">
                  <p>
                    <b>Credits Available:</b>
                  </p>
                  <p>{event.certificate_type_id}</p>
                </div>
              </div>
            </div>
            {event?.notes && event?.notes.trim() && (
              <Notes items={event?.notes} />
            )}
          </div>

          <div className="banner-right">
            <img
              src="sidebar.png"
              alt="We've got your back"
              onClick={handleManualRefresh}
              className="banner-image"
            />
          </div>
        </>
      ) : (
        <div class="parent-div">
          <div class="region4logo">
            <img src="region4header.png" alt="R4 Logo" />
          </div>
          <div className="page-footer">
            <img className="page-footer" src="infofooter_wevegotyourback.png" />
          </div>
        </div>
      )}
    </>
  );
}

export default CheckIn;
