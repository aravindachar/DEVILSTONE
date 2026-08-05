import React from 'react';
import type { TuningType } from '../../types/music';
import { TUNING_PRESETS } from '../../constants/musicTheory';
import { Dropdown } from '../UI/Dropdown';
import { useApp } from '../../context/AppContext';

interface TuningSelectProps {
  value: TuningType;
  onChange: (tuning: TuningType) => void;
}

export const TuningSelect: React.FC<TuningSelectProps> = ({ value, onChange }) => {
  const { instrument } = useApp();

  // Filter presets dynamically based on selected instrument
  const filteredTuningNames = Object.keys(TUNING_PRESETS).filter((tuningName) => {
    const isBassTuning = tuningName.includes('Bass');
    return instrument === 'bass' ? isBassTuning : !isBassTuning;
  });

  const options = filteredTuningNames.map((tuning) => ({
    value: tuning,
    label: tuning,
  }));

  return (
    <Dropdown
      label="Tuning"
      value={value}
      onChange={(e) => onChange(e.target.value as TuningType)}
      options={options}
    />
  );
};

export default TuningSelect;
