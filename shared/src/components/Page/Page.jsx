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
            <img src="/footer.png" />
            </div>
        </div>
      )
}

Page.propTypes = {
    children: PropTypes.element.isRequired
}
  
export default Page