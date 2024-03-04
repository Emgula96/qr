import './content.scss'
import PropTypes from 'prop-types'

function Content({ children, heading, subHeading }) {
    return (
        <div className='content-wrapper'>
            {heading && <h1 className='content-heading'>{heading}</h1>}
            {subHeading && <p className='content-sub-heading'><strong>{subHeading}</strong></p>}
            <div className='content-children'>{children}</div>
        </div>
      )
}

Content.defaultProps = {
    heading: "Welcome to Region 4444555",
    subHeading: "Scan or Print QR Code Badge or Go to Session Room to Check-in.",
}

Content.propTypes = {
    children: PropTypes.element.isRequired,
    heading: PropTypes.string,
    subHeading: PropTypes.string,
}
  
export default Content