/* eslint-disable indent */
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Page from '../../components/Page';
import Content from '../../components/Content';
import service from '../../util/Functions/service';
import './print-badge.scss';
import FindSessionButton from '../FindSession/FindSessionButton/FindSessionButton';
import Map from '../../assets/imgs/maps/1.png';
const generateImageUrl = (deviceId = '1', zoneId = 'MCC 103') => {
  const bucketUrl = 'https://kiosk-maps.s3.us-east-2.amazonaws.com';
  const kiosk = `k${deviceId?.trim()}`;
  const sanitizedZoneId = zoneId?.replace(/\s+/g, '');
  return `${bucketUrl}/${kiosk}-${sanitizedZoneId}.png`;
};

function PrintBadge() {
  const [qrSrc, setQrSrc] = useState('');
  const [imageError, setImageError] = useState(false);
  const location = useLocation();
  // Get the query params
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const zoneId = queryParams.get('zoneId'); // E.g., "MCC 103"
  const deviceId = queryParams.get('deviceId'); // E.g., "1" for Kiosk 1

  useEffect(() => {
    async function fetchData() {
      const qrSrc = await service.generateQrCode(zoneId, userId);
      setQrSrc(qrSrc);
    }

    fetchData();
  }, [zoneId, userId]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Page>
      <Content>
        <h1 className="welcome-header">Welcome to the Region 4</h1>
        <h2 className="badge-printing-header">Your Badge Is Being Printed</h2>
        <p className="badge-printing-paragraph">
          Your Session is in MC 122{zoneId} See map below for your session
          location.
        </p>
        {/* <div className="print-badge-map-container">
          <img src={qrSrc} alt="QR Code" />
        </div> */}
        <div className="print-badge-map-container">
          {imageError ? (
            <img
              className="print-badge-map-img"
              src={Map}
              onError={handleImageError}
              alt={`Map to ${zoneId}`}
            />
          ) : (
            <img
              src={generateImageUrl(deviceId, zoneId)}
              style={{ maxWidth: 500, maxHeight: 500 }}
              onError={handleImageError}
              alt={`Map to ${zoneId}`}
            />
          )}
        </div>
        <div className="qr-button qr-button-left">
          <Link to="/kiosk" className="find-sessions-button">
            Back to Kiosk
          </Link>
        </div>
      </Content>
    </Page>
  );
}

export default PrintBadge;
