import { useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { Html5QrcodeScanner } from 'html5-qrcode'

const qrcodeRegionId = 'html5qr-code-full-region'

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
  let config = {}
  if (props.fps) {
    config.fps = props.fps
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip
  }
  return config
}

const QRCodeScanner = (props) => {
  useEffect(() => {
    if (!props.isScanning) {
      return;
    }

    const config = createConfig(props)
    const verbose = props.verbose === true
    if (!(props.qrCodeSuccessCallback)) {
      throw 'qrCodeSuccessCallback is required callback.'
    }
    
    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose)
    
    html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback)

    // Expose scanner instance to parent component
    if (props.onLoad) {
      props.onLoad(html5QrcodeScanner);
    }

    // Handle video pausing
    if (props.shouldPauseVideo) {
      html5QrcodeScanner.pause(true);
    }

    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error('Failed to clear html5QrcodeScanner. ', error)
      })
    }
  }, [props.isScanning, props.shouldPauseVideo])

  return (
    <div id={qrcodeRegionId} />
  )
}

QRCodeScanner.defaultProps = {
  qrCodeErrorCallback: () => {},
  isScanning: false,
  shouldPauseVideo: false, // Add default value for shouldPauseVideo
}

QRCodeScanner.propTypes = {
  verbose: PropTypes.bool.isRequired,
  qrCodeSuccessCallback: PropTypes.func.isRequired,
  qrCodeErrorCallback: PropTypes.func,
  isScanning: PropTypes.bool,
  shouldPauseVideo: PropTypes.bool, // Add prop type for shouldPauseVideo
  onLoad: PropTypes.func, // Add this new prop type
}

export default QRCodeScanner
