 
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Page from '../../components/Page'
import TimeStamp from '../../components/TimeStamp'
import Content from '../../components/Content'
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
  const deviceId = queryParams.get('deviceId')
  
  useEffect(() => {
    async function fetchData() {
      const userInfo = await service.getUserAndFirstEvent(email, firstName, lastName)
    //   {
    //     "user_pk": 1810227,
    //     "sid": "B115CD51-2D4B-4E2E-9B0D-3E2D1B367758",
    //     "fname": "Susan",
    //     "mname": null,
    //     "lname": "Parker",
    //     "email": "sparker@esc4.net",
    //     "event_id": 1607641,
    //     "obj_id": 1666765,
    //     "limit": 150,
    //     "credithours": 0,
    //     "regstart": "2022-05-01T00:00:00.000Z",
    //     "regend": "2023-05-11T00:00:00.000Z",
    //     "attendee_pk": 2616877,
    //     "credits": 0,
    //     "fee": 0,
    //     "attended": false,
    //     "paid": true,
    //     "cancelled": false,
    //     "cancel_date": null
    // }
      console.log(userInfo)
      setUser(userInfo)
    }

    fetchData()
  }, [email, firstName, lastName])  

  return (
    <Page>
      <TimeStamp />
      <div class="center-container">
        <h1>Welcome to Region 4</h1>
        <p><strong>Print QR Code here or go to session room to check-in.</strong></p>
      </div>
      <Content>
        {
          !!user && (
            <div className='qr-inner-content-wrapper'>
              <h2 className='qr-inner-content-heading'>Session Information</h2>
              <em>Review information below for accuracy.</em>
              <p className='session-info-label'><strong>Name: </strong>{user.fname} {user.lname}</p>
              <p className='session-info-label'><strong>E-mail: </strong>{user.email}</p>
              <p className='session-info-label'><strong>Phone: </strong>{user.phone}</p>
              <p className='session-info-label'><strong>Region: </strong>{user.region}</p>
              <p className='session-info-label'><strong>District: </strong>{user.district}</p>
              <p className='session-info-label'><strong>Campus: </strong>{user.campus}</p>
              <p className='session-info-label'><strong>Session Title: </strong>{user.event_title}</p>
              <p className='session-info-label'><strong>Location: </strong>{user.location}</p>
              <div className='qr-button qr-button-multi'>
                <Link to={{pathname:'/find-session', search:`deviceId=${deviceId}`}}>
                  <button>Find Session</button>
                </Link>
                <Link to={{
                  pathname: '/print-badge',
                  search: `userId=${user.user_id}&eventId=${user.event_id}&deviceId=${deviceId}`
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

// SessionInfo.propTypes = {
//   name: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
//   phone: PropTypes.string.isRequired,
//   region: PropTypes.string.isRequired,
//   district: PropTypes.string.isRequired,
//   campus: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   location: PropTypes.string.isRequired,
// }

export default SessionInfo
