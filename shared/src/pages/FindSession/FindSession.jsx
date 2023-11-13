// import { Link } from 'react-router-dom'
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
                <div className='find-session-wrapper'>
                    <form>
                        <h2>Search for Session</h2>
                        <FormField label='E-mail Address' htmlFor='email-field' placeholder='Enter E-mail' type='email' note="We'll never share your email with anyone else." />
                        <FormField label='First Name' htmlFor='fname-field' placeholder='Enter First Name' type='text' />
                        <FormField label='Last Name' htmlFor='lname-field' placeholder='Enter Last Name' type='text' />
                        <FormField label='Phone Number' htmlFor='phone-field' placeholder='Enter Phone Number' type='tel' required={false} />
                    </form>
                </div>
            </Content>
        </Page>
      )
}

export default FindSession