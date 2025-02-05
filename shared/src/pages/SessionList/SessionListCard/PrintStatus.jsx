import PropTypes from 'prop-types';
import { useEffect } from 'react';

const PrintStatus = ({ status, onTryAgain }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 60000); // 60 seconds

    return () => clearTimeout(timer);
  }, []);

  const statusConfig = {
    success: {
      title: 'Badge Print Successful',
      message: 'Your badge has been printed successfully.',
      iconUrl: '../../assets/imgs/success-icon.png',
      showTryAgain: false
    },
    error: {
      title: 'Print Error',
      message: 'There was an error printing your badge. Please try again.',
      iconUrl: '',
      showTryAgain: true
    },
    'out-of-paper': {
      title: 'Printer Out of Paper',
      message: 'The printer is out of paper. Please contact staff for assistance.',
      iconUrl: '',
      showTryAgain: true
    },
    'not-connected': {
      title: 'Printer Not Connected',
      message: 'The printer is not connected. Please check the connection and try again. If the issue persists, please contact staff for assistance.',
      iconUrl: '',
      showTryAgain: true
    },
    'null': {
      title: 'Printer Not Connected',
      message: 'The printer is not connected. Please check the connection and try again. If the issue persists, please contact staff for assistance.',
      iconUrl: '',
      showTryAgain: true
    }
  };

  const config = statusConfig[status.Printed];
  if (!config) return null;

  return (
    <div className="error-state">
      <h2>{config.title}</h2>
      <div className="error-content">
        <div 
          className="error-icon" 
          style={config.iconUrl ? { backgroundImage: `url('${config.iconUrl}')` } : {}}
        />
        <p>{config.message}</p>
      </div>
      <div className="button-container">
        {config.showTryAgain && (
          <button className="print-badge-button" onClick={onTryAgain}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

PrintStatus.propTypes = {
  status: PropTypes.oneOf(['success', 'error', 'out-of-paper', 'not-connected']),
  onTryAgain: PropTypes.func.isRequired,
};

export default PrintStatus; 