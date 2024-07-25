import PropTypes from 'prop-types'
import './Status.scss'

const Status = ({ status, attendeeName }) => {
    if (!status) return null

    const getStatusContent = () => {
        switch (status) {
            case 'Session Full':
                return {
                    title: 'Check-In Error—Session is at capacity',
                    message:
                        'This session has reached maximum capacity. Please see registration services for assistance.',
                    className: 'status-full',
                }
            case 'Late Check-In':
                return {
                    title: 'Check-In Error—Late Check-In',
                    message:
                        'Your session has already begun and you cannot check in late. Please contact the facilitator for more information.',
                    className: 'status-late',
                }
            case 'No Payment':
                return {
                    title: 'Check-In Error—Payment Needed',
                    message:
                        'Your payment is incomplete. Please e-mail a copy of the purchase order to Register@esc4.net. Go to Registration Services on the first floor if you have any questions or need assistance.',
                    className: 'status-payment',
                }
            case 'Wrong Session':
                return {
                    title: 'Check-In Error—Wrong Session',
                    message:
                        'The QR code scanned does not match this session. Double-check the room number for your session. Please go to Registration Services on the first floor for additional assistance.',
                    className: 'status-wrong',
                }
            default:
                return null
        }
    }

    const statusContent = getStatusContent()

    if (!statusContent) return null

    return (
        <div className="status-wrapper">
            <h1 className="status-header">Check-In Information</h1>
            <p className="attendee-name">{attendeeName}</p>
            <div className={`status-container ${statusContent.className}`}>
                <div className="status-icon"></div>
                <div className="status-content">
                    <h2 className="status-title">{statusContent.title}</h2>
                    <p className="status-message">{statusContent.message}</p>
                </div>
            </div>
        </div>
    )
}

Status.propTypes = {
    status: PropTypes.string,
    attendeeName: PropTypes.string,
}

export default Status
