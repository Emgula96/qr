import './kioskerror.scss';

function KioskError({ title, message }) {
  return (
    <div className="error-state">
      <h2>{title}</h2>
      <div className="error-content">
        <div className="error-icon"></div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default KioskError;
