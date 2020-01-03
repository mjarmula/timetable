import React from 'react';

export default function Field({
  id, name, value, onDelete,
}) {
  return (
    <div>
      <div>
        <label>{name}</label>
        <p>{value}</p>
        <button type="button" className="ui button">
          {I18n.t('common.edit')}
        </button>
        <button
          onClick={() => onDelete(id)}
          type="button"
          className="ui button negative"
        >
          {I18n.t('common.destroy')}
        </button>
      </div>
      <div className="ui divider" />
    </div>
  );
}
