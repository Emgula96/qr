import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Page from '../../components/Page'
import Content from '../../components/Content'
import service from '../../service'
import './print-badge.scss'

function PrintBadge() {
  const [qrSrc, setQrSrc] = useState('')
  const location = useLocation()

  // Get the query params
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id')

  useEffect(() => {
    async function fetchData() {
      const qrSrc = await service.generateQrCode(id)
      setQrSrc(qrSrc)
    }

    fetchData()
  }, [id])

  return (
    <Page>
      <Content>
        <h2>DEMO QR CODE</h2>
        <div className='print-badge-map-container'>
          <img src={qrSrc} />
        </div>
      </Content>
    </Page>
  )
}

export default PrintBadge