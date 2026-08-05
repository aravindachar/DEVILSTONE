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
import { toPng } from 'html-to-image';

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
    isFocusMode,
    setIsFocusMode,
  } = useApp();

  const panelStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    alignItems: 'flex-end',
    marginBottom: '30px',
    padding: '20px 24px',
    borderRadius: '16px',
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

  const exportFretboardImage = () => {
    const node = document.querySelector('.fretboard-inner-wrapper');
    if (!node) return;

    // Convert the fretboard element to a PNG image
    toPng(node as HTMLElement, {
      backgroundColor: '#0B1020', // Clean dark contrast backdrop
      style: {
        borderRadius: '8px',
        padding: '16px 20px',
        overflow: 'hidden',
      }
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `devilstone-fretboard-${selectedKey}-${selectedScale.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error exporting image:', error);
      });
  };

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

      {/* Unified Console Actions Toolbar */}
      <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto', alignItems: 'center' }}>
        <Button
          variant="secondary"
          onClick={exportFretboardImage}
          style={{ padding: '10px 16px', fontSize: '12px' }}
          title="Export Fretboard to Image"
        >
          Export
        </Button>
        
        {!isFocusMode && (
          <Button
            variant="secondary"
            onClick={() => setIsFocusMode(true)}
            style={{ padding: '10px 16px', fontSize: '12px' }}
          >
            ⛶ Focus Mode
          </Button>
        )}

        <Button
          variant="cyber"
          onClick={strum}
          style={{ padding: '10px 18px', fontSize: '12px' }}
        >
          <span>⚡</span> Strum
        </Button>
      </div>
    </div>
  );
};
export default ControlPanel;
