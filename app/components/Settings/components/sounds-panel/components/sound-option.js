import React from 'react';
import PropTypes from 'prop-types';

const SoundOption = ({
  label,
  selectedSound,
  sounds,
  onChange,
}) => (
  <div className="mb-2">
    <span className="d-inline-block w-exact-125">{label}: </span>
    <div className="pt-select">
      <select value={selectedSound} onChange={onChange}>
        {sounds.map(sound => {
          let { id, title } = sound;
          if (!id && !title) {
            id = sound.props.id;
            title = sound.props.title;
          }
          return <option key={`${label}-${id}`} value={id}>{title}</option>;
        })}
      </select>
    </div>
  </div>
);

SoundOption.propTypes = {
  label: PropTypes.string.isRequired,
  selectedSound: PropTypes.string.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.instanceOf(HTMLAudioElement)),
  onChange: PropTypes.func.isRequired,
};

export default SoundOption;
