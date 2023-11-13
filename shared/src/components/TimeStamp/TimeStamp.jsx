import './timestamp.scss'
import PropTypes from 'prop-types'

function TimeStamp() {
    return (
        <div>
            TimeStamp Here
        </div>
      )
}

TimeStamp.propTypes = {
    children: PropTypes.element.isRequired
}
  
export default TimeStamp