import React from 'react';

export default function Errors({ errors }) {
  return (
    <div>
      {
        errors.map(error => (
          <div className="ui red basic label">
            {error}
          </div>
        ))
      }
    </div>
  );
}
