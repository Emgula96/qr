import Page from '../components/Page'
import TimeStamp from '../components/TimeStamp'
import Content from '../components/Content'
import './kiosk.scss'

function Kiosk() {
    return (
        <Page>
            <TimeStamp />
            <Content>
                <div className='kiosk-wrapper'>
                    <div className='kiosk-qr-image'>
                        <img src='https://www.esc4.net/mjsandbox/kiosk%20test/QR%20sample.jpg' />
                    </div>
                    <div className='kiosk-button'>
                        <button>Find Session</button>
                    </div>
                </div>
            </Content>
        </Page>
      )
}

export default Kiosk