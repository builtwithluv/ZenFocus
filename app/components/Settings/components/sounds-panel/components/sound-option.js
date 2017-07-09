import React from 'react';
import PropTypes from 'prop-types';

const SoundOption = ({
  label,
  selectedSound,
  sounds,
  onChange,
}) => (
  <div className="mb-2">
    <span>{label}: </span>
    <div className="pt-select">
      <select value={selectedSound} onChange={onChange}>
        {sounds.map(sound => {
          const { id, title } = sound;
          return <option key={`${label}-${id}`} value={id}>{title}</option>;
        })}
      </select>
    </div>
  </div>
);

SoundOption.propTypes = {
  label: PropTypes.string.isRequired,
  selectedSound: PropTypes.string.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
};

export default SoundOption;
