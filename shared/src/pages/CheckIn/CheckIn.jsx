/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import TimeStamp from '../../components/TimeStamp';
import QRCodeScanner from '../../components/QRCodeScanner';
import beep from '../../assets/sounds/beep.wav';
import './check-in.scss';
import Status from '../Status/Status';
import { isLateCheckIn } from './isLateCheckIn';
import { debounce } from '../../util/Functions/debounce';
import { SessionInfo } from '../../components/SessionInfo/SessionInfo';
import { handleQrScan } from '../../util/Functions/handleQrScan';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { RoomInfo } from '../../components/RoomInfo/RoomInfo';
import { AttendeeCount } from '../../components/AttendeeCount/AttendeeCount';
import { useEventData } from './hooks/useEventData';

function CheckIn() {
  const [status, setStatus] = useState(null);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const location = useLocation();
  const roomName = new URLSearchParams(location.search).get('roomname');
  const beepSound = useMemo(() => new Audio(beep), []);

  const { event } = useEventData(roomName);

  const isUserLate = useMemo(() => {
    return isLateCheckIn(event);
  }, [event]);

  const [showScanner, setShowScanner] = useState(false);
  const [scannerInstance, setScannerInstance] = useState(null);

  const isSessionFull = useMemo(() => {
    return event && checkedInCount >= event.capacity;
  }, [checkedInCount, event]);

  useEffect(() => {
    setStatus(isUserLate ? 'Late Check-In' : null);
  }, [isUserLate]);
  //Fires on new scan from QRCodeScanner
  const onNewScanResult = debounce(async (decodedText) => {
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
  }, 500);

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
          <div className="scanner">
            <div className="scanner-content">
              <h2>Scan QR Code to Check-In</h2>
              <p className="scanner-text">
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
                  qrbox={250}
                  disableFlip={false}
                  qrCodeSuccessCallback={onNewScanResult}
                  verbose={true}
                />
              )}
            </div>
          </div>
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
