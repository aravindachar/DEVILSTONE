'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { NOTES } from '../../utils/theoryEngine';
import type { NoteName, CagedShape, DisplayMode } from '../../types/music';
import { THEME } from '../../constants/theme';
import TuningSelect from './TuningSelect';
import ScaleSelect from './ScaleSelect';
import Dropdown from '../UI/Dropdown';
import Button from '../UI/Button';

export const ControlPanel: React.FC = () => {
  const {
    selectedTuning,
    setSelectedTuning,
    selectedKey,
    setSelectedKey,
    selectedScale,
    setSelectedScale,
    displayMode,
    setDisplayMode,
    cagedShape,
    setCagedShape,
    strum,
  } = useApp();

  const panelStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    alignItems: 'flex-end',
    marginBottom: '30px',
    backgroundColor: THEME.colors.cardBackground,
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    padding: '24px 28px',
    borderRadius: '24px',
    boxShadow: THEME.colors.primaryGlow === 'none' ? undefined : '0 10px 40px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    transition: 'all 0.3s ease',
  };

  const keyOptions = NOTES.map((n) => ({ value: n, label: n }));
  const modeOptions = [
    { value: 'notes', label: 'Notes (C, D, E)' },
    { value: 'intervals', label: 'Intervals (R, 3rd, 5th)' },
  ];
  const cagedOptions = [
    { value: 'None', label: 'None (Full Scale)' },
    { value: 'C', label: 'C Shape Chord' },
    { value: 'A', label: 'A Shape Chord' },
    { value: 'G', label: 'G Shape Chord' },
    { value: 'E', label: 'E Shape Chord' },
    { value: 'D', label: 'D Shape Chord' },
  ];

  return (
    <div 
      style={panelStyle}
      className="glass-panel"
    >
      <TuningSelect value={selectedTuning} onChange={setSelectedTuning} />

      <div style={{ display: 'flex', gap: '10px' }}>
        <Dropdown
          label="Key"
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value as NoteName)}
          options={keyOptions}
          style={{ width: '75px' }}
        />
        <ScaleSelect value={selectedScale} onChange={setSelectedScale} />
      </div>

      <Dropdown
        label="Interval Display"
        value={displayMode}
        onChange={(e) => setDisplayMode(e.target.value as DisplayMode)}
        options={modeOptions}
        style={{ minWidth: '180px' }}
      />

      <Dropdown
        label="CAGED Shape Overlay"
        value={cagedShape}
        onChange={(e) => setCagedShape(e.target.value as CagedShape)}
        options={cagedOptions}
        style={{ minWidth: '170px' }}
      />

      <Button
        variant="cyber"
        onClick={strum}
        style={{
          marginLeft: 'auto',
          alignSelf: 'stretch',
          marginTop: 'auto',
          fontSize: '12px',
          padding: '10px 20px',
        }}
      >
        <span>⚡</span> STRUM SCALE / CHORD
      </Button>
    </div>
  );
};
export default ControlPanel;
