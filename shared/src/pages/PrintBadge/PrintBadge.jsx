import Page from '../../components/Page'
import TimeStamp from '../../components/TimeStamp'
import Content from '../../components/Content'
import './print-badge.scss'

function PrintBadge() {
    return (
        <Page>
            <TimeStamp />
            <Content>
                <h2>Here is a map to your session.</h2>
                <p>Your badge is being printed. See map below for your session location.</p>
                <div className='print-badge-map-container'>
                    <div className='print-badge-map'>
                        <img src='https://esc4.net/mjsandbox/kiosk%20test/images/Map%20to%20102%20copy.jpg' />
                    </div>
                </div>
            </Content>
        </Page>
      )
}

export default PrintBadge