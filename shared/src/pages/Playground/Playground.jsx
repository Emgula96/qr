/* eslint-disable indent */
import './playground.scss';
import { Link } from 'react-router-dom';
import TicketPrinter from './TicketPrintTEST';


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
