/* eslint-disable indent */
import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Page from '../../components/Page'
import Content from '../../components/Content'
import service from '../../service'
import './playground.scss'
import DeviceManagerAndTicketPrinter from './DeviceManagerAndTicketPrinter'
const generateImageUrl = (deviceId, zoneId) => {
    const bucketUrl = 'https://kiosk-maps.s3.us-east-2.amazonaws.com'
    const kiosk = `k${deviceId.trim()}`
    const sanitizedZoneId = zoneId.replace(/\s+/g, '')
    return `${bucketUrl}/${kiosk}-${sanitizedZoneId}.png`
}

function Playground() {
    const [qrSrc, setQrSrc] = useState('')
    const [imageError, setImageError] = useState(false)
    const location = useLocation()
    // Get the query params
    const queryParams = new URLSearchParams(location.search)
    const userId = queryParams.get('userId')
    const zoneId = queryParams.get('zoneId') // E.g., "MCC 103"
    const deviceId = queryParams.get('deviceId') // E.g., "1" for Kiosk 1

    const handleImageError = () => {
        setImageError(true)
    }



    return (
        <DeviceManagerAndTicketPrinter/>      );
}

export default Playground