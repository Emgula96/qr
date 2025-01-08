import { useState, useEffect } from 'react';
import QRCodeScanner from '../QRCodeScanner';
import PropTypes from 'prop-types';
import './scanner.scss';

export function Scanner({ onScan }) {
  const [timeoutId, setTimeoutId] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  //Starts timeout when component mounts
  const handleStartScanning = () => {
    setShowScanner(true);
    const newTimeoutId = setTimeout(() => {
      setShowScanner(false);
    }, 60000);
    setTimeoutId(newTimeoutId);
  };
  //Clears timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div className="scanner">
      <div className="scanner-content">
        <h2>Scan QR Code to Check-In</h2>
        <p className="scanner-text">
          <em>
            Scan QR Code by holding printed badge in front of camera located at
            the top of this device.
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
            qrCodeSuccessCallback={(decodedText) => {
              if (timeoutId) {
                clearTimeout(timeoutId);
              }
              const newTimeoutId = setTimeout(() => {
                setShowScanner(false);
              }, 60000);
              setTimeoutId(newTimeoutId);

              onScan(decodedText);
            }}
            verbose={true}
          />
        )}
      </div>
    </div>
  );
}

Scanner.propTypes = {
  onScan: PropTypes.func.isRequired,
};
