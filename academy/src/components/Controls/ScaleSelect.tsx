import React from 'react';
import type { ScaleType } from '../../types/music';
import { SCALES } from '../../constants/musicTheory';
import { Dropdown } from '../UI/Dropdown';

interface ScaleSelectProps {
  value: ScaleType;
  onChange: (scale: ScaleType) => void;
}

export const ScaleSelect: React.FC<ScaleSelectProps> = ({ value, onChange }) => {
  const options = Object.keys(SCALES).map((scale) => ({
    value: scale,
    label: scale,
  }));

  return (
    <Dropdown
      label="Scale"
      value={value}
      onChange={(e) => onChange(e.target.value as ScaleType)}
      options={options}
    />
  );
};
export default ScaleSelect;
