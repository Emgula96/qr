import { Link } from 'react-router-dom'
import Page from '../../components/Page'
import TimeStamp from '../../components/TimeStamp'
import Content from '../../components/Content'
import PropTypes from 'prop-types'
import './session-info.scss'

function SessionInfo({ name, email, phone, region, district, campus, sessionTitle, location}) {
    return (
        <Page>
            <TimeStamp />
            <Content>
                <div className='qr-inner-content-wrapper'>
                    <h2 className='qr-inner-content-heading'>Session Information</h2>
                    <em>Review information below for accuracy.</em>
                    <p className='session-info-label'><strong>Name: </strong>{name}</p>
                    <p className='session-info-label'><strong>E-mail: </strong>{email}</p>
                    <p className='session-info-label'><strong>Phone: </strong>{phone}</p>
                    <p className='session-info-label'><strong>Region: </strong>{region}</p>
                    <p className='session-info-label'><strong>District: </strong>{district}</p>
                    <p className='session-info-label'><strong>Campus: </strong>{campus}</p>
                    <p className='session-info-label'><strong>Session Title: </strong>{sessionTitle}</p>
                    <p className='session-info-label'><strong>Location: </strong>{location}</p>
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

SessionInfo.defaultProps = {
    name: 'First Last Name',
    email: 'email@gmail.com',
    phone: '555-555-5555',
    region: '4',
    district: 'Spring Branch ISD',
    campus: 'Stafford High School',
    sessionTitle: 'STEMulating Design Challenges in Science, Grades 9-12',
    location: 'MCC102',
}

SessionInfo.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    district: PropTypes.string.isRequired,
    campus: PropTypes.string.isRequired,
    sessionTitle: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
}

export default SessionInfo