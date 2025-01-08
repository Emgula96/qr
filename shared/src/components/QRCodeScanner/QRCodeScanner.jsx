import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Html5QrcodeScanner } from 'html5-qrcode';

const qrcodeRegionId = 'html5qr-code-full-region';

const createConfig = (props) => {
  let config = {
    // Basic scanner config
    fps: props.fps || 10,
    qrbox: props.qrbox || 150,
    disableFlip: props.disableFlip,

    // Video constraints to control scanner size
    videoConstraints: {
      width: { exact: 540 },
      height: { exact: 310 },
      facingMode: 'environment',
    },
  };

  return config;
};

const QRCodeScanner = (props) => {
  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw 'qrCodeSuccessCallback is required callback.';
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error('Failed to clear html5QrcodeScanner. ', error);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      id={qrcodeRegionId}
      style={{
        width: '540px',
        height: '280px',
        margin: '0 auto', // Centers the scanner horizontally
      }}
    />
  );
};

QRCodeScanner.defaultProps = {
  qrCodeErrorCallback: () => {},
  fps: 10,
  disableFlip: false,
  verbose: false,
};

QRCodeScanner.propTypes = {
  verbose: PropTypes.bool,
  qrCodeSuccessCallback: PropTypes.func.isRequired,
  qrCodeErrorCallback: PropTypes.func,
  fps: PropTypes.number,
  disableFlip: PropTypes.bool,
};

export default QRCodeScanner;
