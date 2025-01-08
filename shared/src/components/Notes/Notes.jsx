import PropTypes from 'prop-types';

export const Notes = ({ items }) => (
  <div>
    <p>
      <b>Note:</b>
    </p>
    <ul className="check-in-wrapper-list">
      {items.split('|').map((i, key) => (
        <li key={key}>{i}</li>
      ))}
    </ul>
  </div>
);

Notes.propTypes = {
  items: PropTypes.string.isRequired,
};
