 
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Page from '../../components/Page'
import TimeStamp from '../../components/TimeStamp'
import Content from '../../components/Content'
import PropTypes from 'prop-types'
import service from '../../service'
import './session-info.scss'

function SessionInfo() {
  const [user, setUser] = useState()
  
  const location = useLocation()
  
  // Get the query params
  const queryParams = new URLSearchParams(location.search)
  const email = queryParams.get('email')
  const firstName = queryParams.get('firstName')
  const lastName = queryParams.get('lastName')
  
  useEffect(() => {
    async function fetchData() {
      const userInfo = await service.getUserAndFirstEvent(email, firstName, lastName)
      setUser(userInfo)
    }

    fetchData()
  }, [email, firstName, lastName])  

  return (
    <Page>
      <TimeStamp />
      <Content>
        {
          !!user && (
            <div className='qr-inner-content-wrapper'>
              <h2 className='qr-inner-content-heading'>Session Information</h2>
              <em>Review information below for accuracy.</em>
              <p className='session-info-label'><strong>Name: </strong>{user.first_name} {user.last_name}</p>
              <p className='session-info-label'><strong>E-mail: </strong>{user.email}</p>
              <p className='session-info-label'><strong>Phone: </strong>{user.phone}</p>
              <p className='session-info-label'><strong>Region: </strong>{user.region}</p>
              <p className='session-info-label'><strong>District: </strong>{user.district}</p>
              <p className='session-info-label'><strong>Campus: </strong>{user.campus}</p>
              <p className='session-info-label'><strong>Session Title: </strong>{user.title}</p>
              <p className='session-info-label'><strong>Location: </strong>{user.location}</p>
              <div className='qr-button qr-button-multi'>
                <Link to={{
                  pathname: '/find-session',
                }}>
                  <button>Find Session</button>
                </Link>
                <Link to={{
                  pathname: '/print-badge',
                  search: `userId=${user.user_id}&eventId=${user.event_id}`
                }}>
                  <button>Print Badge</button>
                </Link>
              </div>
            </div>
          )
        }
      </Content>
    </Page>
  )
}

SessionInfo.defaultProps = {}

SessionInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  district: PropTypes.string.isRequired,
  campus: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
}

export default SessionInfo
