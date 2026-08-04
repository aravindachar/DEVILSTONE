import React from 'react';
import type { TuningType } from '../../types/music';
import { TUNING_PRESETS } from '../../constants/musicTheory';
import { Dropdown } from '../UI/Dropdown';

interface TuningSelectProps {
  value: TuningType;
  onChange: (tuning: TuningType) => void;
}

export const TuningSelect: React.FC<TuningSelectProps> = ({ value, onChange }) => {
  const options = Object.keys(TUNING_PRESETS).map((tuning) => ({
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
