import { Link } from 'react-router-dom'
import Page from '../../components/Page'
import TimeStamp from '../../components/TimeStamp'
import Content from '../../components/Content'
import PropTypes from 'prop-types'
import './session-info.scss'

function SessionInfo() {
    return (
        <Page>
            <TimeStamp />
            <Content>
                <div className='qr-inner-content-wrapper'>
                    <h2 className='qr-inner-content-heading'>Session Information</h2>
                    <em>Review information below for accuracy.</em>
                    <p className='session-info-label'><strong>Name: </strong>Bryan Wheeler</p>
                    <p className='session-info-label'><strong>E-mail: </strong>bryan.wheeler@esc4.net</p>
                    <p className='session-info-label'><strong>Phone: </strong>555-555-5555</p>
                    <p className='session-info-label'><strong>Region: </strong>4</p>
                    <p className='session-info-label'><strong>District: </strong>Spring Branch ISD</p>
                    <p className='session-info-label'><strong>Campus: </strong>Stafford High School</p>
                    <p className='session-info-label'><strong>Session Title: </strong>STEMulating Design Challenges in Science, Grades 9-12</p>
                    <p className='session-info-label'><strong>Location: </strong>MCC102</p>
                    <div className='qr-button qr-button-center'>
                        <Link to="/print-badge">
                            <button>Print Badge</button>
                        </Link>
                    </div>
                </div>
            </Content>
        </Page>
      )
}

export default SessionInfo