import './Solution/General.scss';

import React, { useState } from 'react';

import Exercise from '../exercise/Exercise';
import Button from './Solution/Button/Button';
import ProgressBar from './Solution/ProgressBar/ProgressBar';

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

const Solution = () => {
  const [progress, setProgress] = useState(0.0);
  const [timer, setTimer] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const totalTime = 15;

  const simulateRequest = ( time ) => {
    time = time | 0;
    let currentProgress;
    const _timer= setInterval(() => {
      time++;
      currentProgress = (time * 10 )  / totalTime;
      setProgress(currentProgress);
      setLoading(true);
     if(currentProgress === 90){
        setLoading(false);
        clearInterval(_timer)
      } 
  
    }, 100);

    setTimer(_timer);
   
  }
  const startSimulateRequest = () => {
    setProgress(0);
    
    // TODO: We could remove setTimeOut to avoid an extra second. 
    // For now it is I need to display correctly when the progressbar is hidden and displayed. 
    // Because the animation is delayed when it is required to show the progressbar again.
    setTimeout(() => {
      simulateRequest(0, false);
    }, 1000);
   
  }

  const stopSimulateRequest = () => {
    setProgress(100);
    setLoading(false);
    clearInterval(timer);
  }

  return <div>
    <ProgressBar percent={progress}></ProgressBar>
    <div className="buttons-actions">
      <Button
        className="start-button"
        onClick={startSimulateRequest}
        isLoading={isLoading}
        > { isLoading ? ' Loading...' : 'Start request' }
      </Button>
      <Button
        className="finish-button"
        onClick={stopSimulateRequest}
        > Finish request
      </Button> 
    </div>
  </div>;
};
