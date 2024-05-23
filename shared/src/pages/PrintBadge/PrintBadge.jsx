import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Page from '../../components/Page'
import Content from '../../components/Content'
import service from '../../service'
import './print-badge.scss'

const deviceImageMap = {
  1: '/src/assets/imgs/maps/1.png',
  2: '/src/assets/imgs/maps/2.png',
  // Add more mappings as needed
};

function PrintBadge() {
  const [qrSrc, setQrSrc] = useState('')
  const location = useLocation()
  // Get the query params
  const queryParams = new URLSearchParams(location.search)
  const userId = queryParams.get('userId')
  const eventId = queryParams.get('eventId')
  const deviceId = queryParams.get('deviceId')
  console.log(deviceId)
  const mapSrc = deviceImageMap[deviceId] || null;

  useEffect(() => {
    async function fetchData() {
      const qrSrc = await service.generateQrCode(eventId, userId)
      setQrSrc(qrSrc)
    }

    fetchData()
  }, [eventId, userId])

  return (
    <Page>
      <Content>
        <h2>DEMO QR CODE</h2>
        <div className='print-badge-map-container'>
          <img src={qrSrc} />
        </div>
        <div className='print-badge-map-container'>
          <img src={mapSrc} style={{ maxWidth: 500, maxHeight: 500 }} />
        </div>
        <div className='qr-button qr-button-center'>
          <Link to={{pathname:'/find-session', search:`deviceId=${deviceId}`}}>
            <button>Find Session</button>
          </Link>
        </div>
      </Content>
    </Page>
  )
}

export default PrintBadge
