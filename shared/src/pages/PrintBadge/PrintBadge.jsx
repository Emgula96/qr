/* eslint-disable indent */
import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Page from '../../components/Page'
import Content from '../../components/Content'
import service from '../../service'
import './print-badge.scss'

const generateImageUrl = (deviceId, eventId) => {
    const bucketUrl = 'https://kiosk-maps.s3.us-east-2.amazonaws.com'
    const kiosk = `k${deviceId.trim()}`
    const sanitizedEventId = eventId.replace(/\s+/g, '')
    return `${bucketUrl}/${kiosk}-${sanitizedEventId}.png`
}

function PrintBadge() {
    const [qrSrc, setQrSrc] = useState('')
    const [imageError, setImageError] = useState(false)
    const location = useLocation()
    // Get the query params
    const queryParams = new URLSearchParams(location.search)
    const userId = queryParams.get('userId')
    const eventId = queryParams.get('eventId') // E.g., "MCC 103"
    const deviceId = queryParams.get('deviceId') // E.g., "1" for Kiosk 1

    useEffect(() => {
        async function fetchData() {
            const qrSrc = await service.generateQrCode(eventId, userId)
            setQrSrc(qrSrc)
        }

        fetchData()
    }, [eventId, userId])

    const handleImageError = () => {
        setImageError(true)
    }

    return (
        <Page>
            <Content>
                <h2>DEMO QR CODE</h2>
                <div className="print-badge-map-container">
                    <img src={qrSrc} alt="QR Code" />
                </div>
                <div className="print-badge-map-container">
                    {imageError ? (
                        <p>
                            Sorry, this map is currently unavailable. Please ask
                            the front desk for location assistance.
                        </p>
                    ) : (
                        <img
                            src={generateImageUrl(deviceId, eventId)}
                            style={{ maxWidth: 500, maxHeight: 500 }}
                            onError={handleImageError}
                            alt={`Map to ${eventId}`}
                        />
                    )}
                </div>
                <div className="qr-button qr-button-center">
                    <Link
                        to={{
                            pathname: '/find-session',
                            search: `deviceId=${deviceId}`,
                        }}
                    >
                        <button>Find Session</button>
                    </Link>
                </div>
            </Content>
        </Page>
    )
}

export default PrintBadge
