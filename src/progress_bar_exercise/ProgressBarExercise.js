import './Solution/General.scss';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import Exercise from '../exercise/Exercise';
import Button from './Solution/Button/Button';
import Input from './Solution/Input/Input';
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
  const [timerToBreakpoints, setTimerToBreakpoints] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const totalTime = 30;
  let breakPoints = [];
  const inputRef = useRef();

  useEffect(() => {
   inputRef.current.focus();
  }, []);

  /**
   * Machine to simulate for a fake request.
   * @param {*} time - Time to start the simulator
   */
  const simulateRequest = ( time ) => {
    time = time | 0;
    let currentProgress;
  
    // Get the values from input
    breakPoints = sanitizeInput(inputRef.current.value);
    console.log(breakPoints);

    // Check if there are any breakpoints
    const isAvailableBreakPoints = breakPoints.length > 0;

    // The general timer to simulate requests.
    const _timer= setInterval(() => {
      time++;
      currentProgress = (time * 10 )  / totalTime;
      setProgress(currentProgress);
      setLoading(true);

     // If there is a breakpoint, we will avoid entering here.
     if(!isAvailableBreakPoints && currentProgress === 90){
        setLoading(false);
        clearInterval(_timer);
      } 

      // If there is a breakpoint and we reach 100 percent, we will enter here to stop the timer.
      if(isAvailableBreakPoints && currentProgress === 100){
        setLoading(false);
        clearInterval(_timer);
      } 
      
      // If there is at least one breakpoint, we will enter here to create small blocks within 
      // the current percentage and thus generate a slower animation.
      if(isAvailableBreakPoints){
        let found = breakPoints.find(element => element === currentProgress);
        if(found){
          clearInterval(_timer);
          simulateBreakPoints(time, currentProgress);
        }
      }
    }, 100);

    setTimer(_timer);
  }

  /**
   * Cleaning the breakpoints read from an input
   * @param {*} input - The values from input
   * @returns array - return a new array with values type int.
   */
  const sanitizeInput = (input) => {
    return input.split(',').map( d => { return parseInt(d) }).sort();
  }
  
  /**
   * Create small blocks within the same provided breakpoints.
   * If you typed "10", you could create a few small blocks in each iteration of the timer.
   * example (10.1, 10.3, 10.8)
   * @param {*} time - Time to start the simulator
   * @param {*} currentProgress -
   */
  const simulateBreakPoints = ( time, currentProgress ) => {    
    let i = 0;
    const _timerToBreakpoints = setInterval(() => {
      i++;
      const currentProgressSmallBlock = ( i / time );

      // Numbers are generated like this (0.1, 0.2, 0.6 .... 1)
      // currentProgress + currentProgressSmallBlock = 10.1
      setProgress(currentProgress + currentProgressSmallBlock);
      
      // Since we have only generated from 0.1 to 1, then when we reach 1, thi will continue with the next breakpoint.
      if(currentProgressSmallBlock === 1){
        clearInterval(_timerToBreakpoints);
        simulateRequest(time)
      }
    }, 30);

    setTimerToBreakpoints(_timerToBreakpoints);
    
  }

  /**
   * Just start the timer to invoke the fake request.
   */
  const startSimulateRequest = () => {
    setProgress(0);
    
    // TODO: We could remove setTimeOut to avoid an extra second. 
    // For now it is I need to display correctly when the progressbar is hidden and displayed. 
    // Because the animation is delayed when it is required to show the progressbar again.
    setTimeout(() => {
      simulateRequest(0, false);
    }, 1000);
   
  }

  /**
   * We stop any both timers, the general timer and the timer that generates the small blocks.
   */
  const stopSimulateRequest = () => {
    setProgress(100);
    setLoading(false);
    clearInterval(timer);
    clearInterval(timerToBreakpoints);
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
      <Input 
        ref={inputRef} 
        placeholder="(Optional) 10,20,60,..."  
        disabled={isLoading}
      />
      <Button
        className="finish-button"
        onClick={stopSimulateRequest}
        > Finish request
      </Button>
    </div>
  </div>;
};
