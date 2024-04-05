import PropTypes from 'prop-types'

function FormField({ label, note, htmlFor, placeholder, type, required, value, onChange }) {
  return (
    <div className='find-session-form-group'>
      <label htmlFor={htmlFor}>
        <strong>{label} </strong>
        {required && <span className='text-danger'>*</span>}
      </label>
      <input type={type} id={htmlFor} placeholder={placeholder} value={value} onChange={onChange} />
      {note && <small className='find-session-note'>{note}</small>}
    </div>
  )
}

FormField.defaultProps = {
  required: true,
  note: '',
  value: '',
  onChange: () => {},
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  note: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
}

export default FormField