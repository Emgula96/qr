// import { Link } from 'react-router-dom'
import Page from '../../components/Page'
import TimeStamp from '../../components/TimeStamp'
import Content from '../../components/Content'
import './session-info.scss'

function SessionInfo() {
    return (
        <Page>
            <TimeStamp />
            <Content>
                <div className='inner-content-wrapper'>
                    Session Info Goes Here
                </div>
            </Content>
        </Page>
      )
}

export default SessionInfo