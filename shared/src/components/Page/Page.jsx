import './page.scss'
import PropTypes from 'prop-types'

function Page({ children }) {
    return (
        <div className='page-wrapper'>
            <div className='page-banner'>
                <img src="/accent.png" />
            </div>
            <div className='page-content'>
                {children}
            </div>
            <div className='page-footer'>
            <img className='page-footer' src="https://kiosk-assets-public.s3.amazonaws.com/brand-logo.png" />
            </div>
        </div>
      )
}

Page.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired
}
  
export default Page