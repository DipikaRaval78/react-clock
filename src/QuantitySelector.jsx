import React from 'react';
import './QuantitySelector.scss'
import { ReactComponent as ArrowUp } from './plus-symbol-button-svgrepo-com.svg';
import {ReactComponent as ArrowDown } from './minus-svgrepo-com.svg';

export default function QuantitySelector({
  name,
  lengthTime,
  isTimerOn,
  incrementLengthTime,
  decrementLengthTime,
}) {
  return (
    <div className={`${name}-container`}>
      <div id={`${name}-label`} className="label">{name} Length</div>
      <button
        id={`${name}-increment`}
        onClick={incrementLengthTime}
        disabled={lengthTime / 60 === 60 || isTimerOn}
      >
        <ArrowUp style={{height:'1em', width:'1em'}} />  
      </button>
      <div id={`${name}-length`} className="length">{lengthTime / 60}</div>
      <button
        id={`${name}-decrement`}
        onClick={decrementLengthTime}
        disabled={lengthTime / 60 === 1 || isTimerOn}
      >
        <ArrowDown style={{height:'1em', width:'1em'}}/>          

      </button>
    </div>
  );
}
