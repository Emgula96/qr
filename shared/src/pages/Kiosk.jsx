import Page from '../components/Page'
import TimeStamp from '../components/TimeStamp'
import Content from '../components/Content'

function Kiosk() {
    return (
        <Page>
            <TimeStamp />
            <Content>
                <div className='kiosk-qr-image'>
                    <img src='https://www.esc4.net/mjsandbox/kiosk%20test/QR%20sample.jpg' />
                </div>
            </Content>
        </Page>
      )
}

export default Kiosk