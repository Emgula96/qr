/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import TimeStamp from '../../components/TimeStamp';
import beep from '../../assets/sounds/beep.wav';
import './check-in.scss';
import Status from '../../components/Status/Status';
import { isLateCheckIn } from './isLateCheckIn';
import { debounce } from '../../util/Functions/debounce';
import { SessionInfo } from '../../components/SessionInfo/SessionInfo';
import { handleQrScan } from '../../util/Functions/handleQrScan';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { RoomInfo } from '../../components/RoomInfo/RoomInfo';
import { AttendeeCount } from '../../components/AttendeeCount/AttendeeCount';
import { useEventData } from './hooks/useEventData';
import { Scanner } from '../../components/Scanner/Scanner';

function CheckIn() {
  const [status, setStatus] = useState(null);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const location = useLocation();
  const roomName = new URLSearchParams(location.search).get('roomname');
  console.log(roomName);
  const beepSound = useMemo(() => new Audio(beep), []);

  const { event } = useEventData(roomName);

  const isUserLate = useMemo(() => {
    return isLateCheckIn(event);
  }, [event]);

  const isSessionFull = useMemo(() => {
    return event && checkedInCount >= event.capacity;
  }, [checkedInCount, event]);

  useEffect(() => {
    setStatus(isUserLate ? 'Late Check-In' : null);
  }, [isUserLate]);

  const handleScan = debounce(async (decodedText) => {
    if (isSessionFull) {
      setStatus('Session Full');
      return;
    }
    const scanResult = await handleQrScan(
      decodedText,
      event,
      beepSound,
      setStatus,
      isUserLate
    );
    if (scanResult?.success && checkedInCount < event?.capacity) {
      setCheckedInCount((prevCount) => prevCount + 1);
    }
  }, 1000);

  if (!event) {
    return (
      <div className="parent-div">
        <Header />
        <Footer />
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
          <Scanner onScan={handleScan} />
          <AttendeeCount
            checkedInCount={checkedInCount}
            capacity={event?.capacity}
          />
        </div>
        <div className="right">
          <RoomInfo roomLabel={event?.event_dates[0]?.room?.label} />
          {status && <Status status={status} attendeeName={'Test Attendee'} />}
          <SessionInfo event={event} />
          <div className="region-4-logo">
            <img className="logo" src="region4header.png" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckIn;
