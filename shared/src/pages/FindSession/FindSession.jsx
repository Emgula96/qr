import { Link } from 'react-router-dom'
import Page from '../../components/Page'
import TimeStamp from '../../components/TimeStamp'
import Content from '../../components/Content'
import FormField from './FormField'
import './find-session.scss'

function FindSession() {
    return (
        <Page>
            <TimeStamp />
            <Content>
                <div className='qr-inner-content-wrapper'>
                    <form>
                        <h2 className='qr-inner-content-heading'>Search for Session</h2>
                        <FormField label='E-mail Address' htmlFor='email-field' placeholder='Enter E-mail' type='email' note="We'll never share your email with anyone else." />
                        <FormField label='First Name' htmlFor='fname-field' placeholder='Enter First Name' type='text' />
                        <FormField label='Last Name' htmlFor='lname-field' placeholder='Enter Last Name' type='text' />
                        <FormField label='Phone Number' htmlFor='phone-field' placeholder='Enter Phone Number' type='tel' required={false} />
                        <div className='find-session-submission'>
                            <div>
                                <div className='qr-button qr-button-end'>
                                    <Link to="/session-info">
                                        <button>Find Session</button>
                                    </Link>
                                </div>
                                <p className='text-danger'><em>* indicates a required field</em></p>
                            </div>
                        </div>
                    </form>
                </div>
            </Content>
        </Page>
      )
}

export default FindSession