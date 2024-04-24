import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Page from '../../components/Page'
import Content from '../../components/Content'
import service from '../../service'
import './print-badge.scss'

function PrintBadge() {
  const [qrSrc, setQrSrc] = useState('')
  const location = useLocation()

  // Get the query params
  const queryParams = new URLSearchParams(location.search)
  const userId = queryParams.get('userId')
  const eventId = queryParams.get('eventId')

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
        <div className='qr-button qr-button-center'>
          <Link to={{
            pathname: '/find-session',
          }}>
            <button>Find Session</button>
          </Link>
        </div>
      </Content>
    </Page>
  )
}

export default PrintBadge
