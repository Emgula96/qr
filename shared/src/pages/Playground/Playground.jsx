/* eslint-disable indent */
import './playground.scss';
import { Link } from 'react-router-dom';
import TicketPrinter from './TicketPrintTEST';
const generateImageUrl = (deviceId, zoneId) => {
  const bucketUrl = 'https://kiosk-maps.s3.us-east-2.amazonaws.com';
  const kiosk = `k${deviceId.trim()}`;
  const sanitizedZoneId = zoneId.replace(/\s+/g, '');
  return `${bucketUrl}/${kiosk}-${sanitizedZoneId}.png`;
};

function Playground() {
  return (
    <>
      <Link to="/find-session" className="find-sessions-button">
        Go Back
      </Link>
      <TicketPrinter />
    </>
  );
}

export default Playground;
