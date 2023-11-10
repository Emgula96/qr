import './page.scss'
import PropTypes from 'prop-types'

function Page({ children }) {
    return (
        <div className='page-wrapper'>
            <div className='page-banner'>
                <img src="/accent.png"></img>
            </div>
            {children}
        </div>
      )
}

Page.propTypes = {
    children: PropTypes.element.isRequired
}
  
export default Page