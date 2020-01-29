import React from 'react';
import { PropTypes } from 'prop-types';

export default function EditField({
  name,
  value,
  handleNameChange,
  handleValueChange,
  handleSave,
}) {
  return (
    <div className="ui form">
      <div className="field">
        <div className="two fields">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input type="text" value={name} onChange={handleNameChange} />
          </div>
          <div className="field">
            <label htmlFor="Value">Value</label>
            <input type="text" value={value} onChange={handleValueChange} />
          </div>
        </div>
      </div>
      <div className="field">
        <button
          className="ui right floated button"
          onClick={handleSave}
          type="button"
        >
          Save
        </button>
      </div>
    </div>
  );
}

EditField.prototype.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleValueChange: PropTypes.func.isRequired,
};
