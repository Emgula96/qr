import PropTypes from 'prop-types';
import './Status.scss';

const Status = ({ status, attendeeName }) => {
  if (!status) return null;

  const getStatusContent = () => {
    switch (status) {
    case 'Success':
      return {
        title: 'Check-In Success',
        message: 'You have checked in successfully for the session below.',
        className: 'status-success',
      };
    case 'Invalid parameters provided':
      return {
        title: 'Check-In Error—Invalid Parameters',
        message: 'Please check your QR code and try again.',
        className: 'status-invalid',
      };
    case 'Payment is required to proceed with check-in':
      return {
        title: 'Check-In Error—Payment Needed',
        message:
          'Your payment is incomplete. Please e-mail a copy of the purchase order to Register@esc4.net. Go to Registration Services on the first floor if you have any questions or need assistance.',
        className: 'status-payment',
      };
    case 'Wrong Session or insufficient permissions':
      return {
        title: 'Check-In Error—Wrong Session',
        message:
        'The QR code scanned does not match this session. Double-check the room number for your session. Please go to Registration Services on the first floor for additional assistance.',
        className: 'status-wrong',
      };
    case 'User has already checked in':
      return {
        title: 'Check-In Error—User Already Checked In',
        message: 'You have already checked in for this session.',
        className: 'status-checked-in',
      };
    case 'Insufficient credit to complete check-in':
      return {
        title: 'Check-In Error—Insufficient Credit',
        message: 'You do not have enough credit to check in for this session.',
        className: 'status-insufficient',
      };
    case 'Late Check-In':
      return {
        title: 'Check-In Error—Late Check-In',
        message:
          'Your session has already begun and you cannot check in late. Please contact the facilitator for more information.',
        className: 'status-late',
      };
    case 'Session Full':
      return {
        title: 'Check-In Error—Session is at capacity',
        message:
          'This session has reached maximum capacity. Please see registration services for assistance.',
        className: 'status-full',
      };
    default:
      return null;
    }
  };

  const statusContent = getStatusContent();

  if (!statusContent) return null;

  return (
    <div className="status-wrapper">
      <h1 className="status-header">Check-In Information</h1>
      <p className="attendee-name">{attendeeName}</p>
      <div className={`status-container ${statusContent?.className}`}>
        <div
          className={status === 'Success' ? 'status-icon-success' : 'status-icon'}
        ></div>
        <div className="status-content">
          <h2
            className={`${
              status === 'Success'
                ? 'status-title-success'
                : 'status-title-error'
            }`}
          >
            {statusContent?.title}
          </h2>
          <p className="status-message">{statusContent?.message}</p>
        </div>
      </div>
    </div>
  );
};

Status.propTypes = {
  status: PropTypes.string,
  attendeeName: PropTypes.string,
};

export default Status;
