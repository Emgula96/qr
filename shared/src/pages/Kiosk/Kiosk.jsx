import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Page from '../../components/Page'
import TimeStamp from '../../components/TimeStamp'
import Content from '../../components/Content'
import './kiosk.scss'

function Kiosk() {
    const [header, setHeader] = useState()

    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(`${import.meta.env.VITE_FRONT_END_SERVER_URL}/v1/users`)
            const header = await resp.json()
            setHeader(header.data)
        }
        fetchData()
    }, [])

    return (
        <Page>
            <TimeStamp />
            <Content heading={header}>
                <div className='kiosk-wrapper'>
                    <div className='kiosk-qr-image'>
                        <img src='https://www.esc4.net/mjsandbox/kiosk%20test/QR%20sample.jpg' />
                    </div>
                    <div className='qr-button qr-button-center'>
                        <Link to="/find-session">
                            <button>Find Session</button>
                        </Link>
                    </div>
                </div>
            </Content>
        </Page>
      )
}

export default Kiosk