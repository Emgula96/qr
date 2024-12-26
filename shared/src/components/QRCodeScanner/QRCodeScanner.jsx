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
    // Don't initialize scanner if scanning is not enabled
    if (!props.isScanning) {
      return;
    }

    const config = createConfig(props)
    const verbose = props.verbose === true
    if (!(props.qrCodeSuccessCallback)) {
      throw 'qrCodeSuccessCallback is required callback.'
    }
    
    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose)
    
    // Set up timeout to stop scanning after 45 seconds
    const timeoutId = setTimeout(() => {
      html5QrcodeScanner.clear().catch(error => {
        console.error('Failed to clear html5QrcodeScanner after timeout. ', error)
      })
    }, 45000)

    html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback)

    return () => {
      clearTimeout(timeoutId)
      html5QrcodeScanner.clear().catch(error => {
        console.error('Failed to clear html5QrcodeScanner. ', error)
      })
    }
  }, [props.isScanning]) // Add isScanning to dependency array

  return (
    <div id={qrcodeRegionId} />
  )
}

QRCodeScanner.defaultProps = {
  qrCodeErrorCallback: () => {},
  isScanning: false, // Add default value for isScanning
}

QRCodeScanner.propTypes = {
  verbose: PropTypes.bool.isRequired,
  qrCodeSuccessCallback: PropTypes.func.isRequired,
  qrCodeErrorCallback: PropTypes.func,
  isScanning: PropTypes.bool, // Add prop type for isScanning
}

export default QRCodeScanner
