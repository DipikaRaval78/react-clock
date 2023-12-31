import { useEffect, useState, useRef } from 'react';
import './App.scss';
import CircularTimer from './CircularTimer';
import QuantitySelector from './QuantitySelector';
import StartStopBtn from './StartStopBtn';

const initialTimerLabelState = 'Session';
const initialIsTimerOnState = false;

const initialSessionLengthState = 1500;
const initialBreakLengthState = 300;

let interval;

function App() {
  const [timerLabel, setTimerLabel] = useState(initialTimerLabelState);
  const [timeLeft, setTimeLeft] = useState(initialSessionLengthState);
  const [currentLengthTime, setCurrentLengthTime] = useState(
    initialSessionLengthState
  );

  const [sessionLengthTime, setSessionLengthTime] = useState(
    initialSessionLengthState
  );
  const [breakLengthTime, setBreakLengthTime] = useState(
    initialBreakLengthState
  );

  const [isTimerOn, setIsTimerOn] = useState(initialIsTimerOnState);
  const [circularTimerAnimation, setCircularTimerAnimation] = useState(null);

  const audioEl = useRef(null);

  useEffect(() => {
    console.log('switchToTimer: ', timerLabel);

    if (timerLabel === initialTimerLabelState) {
      setTimeLeft(sessionLengthTime);
      setCurrentLengthTime(sessionLengthTime);
    } else {
      setTimeLeft(breakLengthTime);
      setCurrentLengthTime(breakLengthTime);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerLabel]);

  useEffect(() => {
    if (isTimerOn) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => {
          return timeLeft - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }, [isTimerOn]);

  useEffect(() => {
    console.log('timeLeft: ', timeLeft);
    if (timeLeft === 0) {
      playAudio();
      switchTimer();
    }

    function switchTimer() {
      if (timerLabel === initialTimerLabelState) {
        setTimerLabel('Break');
        setTimeLeft(sessionLengthTime);
      } else {
        setTimerLabel('Session');
        setTimeLeft(breakLengthTime);
      }
    }
    function playAudio() {
      let playPromise = audioEl.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            setTimeout(() => {
              audioEl.current.pause();
              audioEl.current.currentTime = 0;
            }, 1000);
          })
          .catch((error) => {
            console.error('Error while play audio...', error);
          });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const incrementSessionLengthTime = (e) => {
    const newSessionLengthTime = sessionLengthTime + 60;
    setSessionLengthTime(newSessionLengthTime);
    if (timerLabel === initialTimerLabelState) {
      setTimeLeft(newSessionLengthTime);
      setCurrentLengthTime(newSessionLengthTime);
    }
  };

  const decrementSessionLengthTime = (e) => {
    const newSessionLengthTime = sessionLengthTime - 60;
    setSessionLengthTime(newSessionLengthTime);
    if (timerLabel === initialTimerLabelState) {
      setTimeLeft(newSessionLengthTime);
      setCurrentLengthTime(newSessionLengthTime);
    }
  };

  const incrementBreakLengthTime = (e) => {
    const newBreakLengthTime = breakLengthTime + 60;
    setBreakLengthTime(newBreakLengthTime);
    if (timerLabel !== initialTimerLabelState) {
      setTimeLeft(newBreakLengthTime);
      setCurrentLengthTime(newBreakLengthTime);
    }
  };

  const decrementBreakLengthTime = (e) => {
    const newBreakLengthTime = breakLengthTime - 60;
    setBreakLengthTime(newBreakLengthTime);
    if (timerLabel === !initialTimerLabelState) {
      setTimeLeft(newBreakLengthTime);
      setCurrentLengthTime(newBreakLengthTime);
    }
  };

  const startStopTimer = (e) => {
    const toggleTimer = !isTimerOn;
    setIsTimerOn(toggleTimer);
    toggleTimer
      ? circularTimerAnimation.play()
      : circularTimerAnimation.pause();
  };

  const resetTimer = (e) => {
    setIsTimerOn(false);
    setTimerLabel(initialTimerLabelState);
    setSessionLengthTime(initialSessionLengthState);
    setBreakLengthTime(initialBreakLengthState);
    setTimeLeft(initialSessionLengthState);

    circularTimerAnimation.currentTime = 0;
    circularTimerAnimation.pause();

    if (!audioEl.current.paused) {
      audioEl.current.pause();
      audioEl.current.currentTime = 0;
    }
  };

  return (
    <div className="App">
      <div className="pomodoro-wrapper">
        <CircularTimer
          timerLabel={timerLabel}
          timeLeft={timeLeft}
          isTimerOn={isTimerOn}
          currentLengthTime={currentLengthTime}
          setAnimation={setCircularTimerAnimation}
          resetTimer={resetTimer}
        />
        <div className="timer-controls">
          <QuantitySelector
            name="session"
            lengthTime={sessionLengthTime}
            isTimerOn={isTimerOn}
            incrementLengthTime={incrementSessionLengthTime}
            decrementLengthTime={decrementSessionLengthTime}
          />
          <StartStopBtn isTimerOn={isTimerOn} startStopTimer={startStopTimer} />
          <QuantitySelector
            name="break"
            lengthTime={breakLengthTime}
            isTimerOn={isTimerOn}
            incrementLengthTime={incrementBreakLengthTime}
            decrementLengthTime={decrementBreakLengthTime}
          />
        </div>
        <audio id="beep" preload="auto" ref={audioEl}>
          <source src="/src/assets/BeepSound.wav" type="audio/wav" />
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    </div>
  );
}

export default App;
