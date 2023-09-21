import React from 'react';
import './StartStopBtn.scss';
// import { ReactComponent as StartWatchIcon } from '../node_modules/

export default function StartStopBtn({ isTimerOn, startStopTimer }) {
  const btnStyleTimerOn = {
    color: '#fff',
    boxShadow: '#312b2b 0px 0px 40px 40px inset',
  };

  return (
    <button
      id="start_stop"
      className="first"
      onClick={startStopTimer}
      style={isTimerOn ? btnStyleTimerOn : {}}
    >
      {isTimerOn ? 'Pause' : 'Start'}
      {/* <StartWatchIcon className="startwatch-icon" /> */}
    </button>
  );
}
