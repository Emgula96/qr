import { Link } from 'react-router-dom'
import Page from '../../components/Page'
import TimeStamp from '../../components/TimeStamp'
import Content from '../../components/Content'
import './kiosk.scss'

function Kiosk(props) {
  return (
    <Page>
      <TimeStamp />
      <Content>
        <div className='kiosk-wrapper'>
          <div className='qr-button qr-button-center'>
            <Link to={{pathname:'/find-session', search:`deviceId=${props.deviceId}`}}>
              <button>Find Session</button>
            </Link>
          </div>
        </div>
      </Content>
    </Page>
  )
}

export default Kiosk
