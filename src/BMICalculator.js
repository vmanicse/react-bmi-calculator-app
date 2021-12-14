import React, { useRef, useState } from 'react';
import Result from './Result';

export default function BMICalculator() {
  const weightElementRef = useRef(null);
  const heightElementRef = useRef(null);
  const [bmiValue, setBmiValue] = useState(null);
  const [bmiStatus, setBmiStatus] = useState(null);
  const [isBmiCalculated, setAsBmiCalculated] = useState(false);
  const [statusColor, setStatusColor] = useState('#5C4BE8');
  const [inputError, setInputError] = useState(false);
  const errorMsgObj = { weightInputErrMsg: '', heightInputErrMsg: '' };
  const [errorMsg, setErrorMsg] = useState(errorMsgObj);
  const errors = [null, '', undefined];

  function calculateBmi() {
    let weightKg = weightElementRef.current.value;
    let heightCm = heightElementRef.current.value;
    if (errors.includes(weightKg) || errors.includes(heightCm) || inputError) {
      setAsBmiCalculated(false);
      setInputError(true);
      return;
    }

    let heightMetre = heightCm / 100;
    let bmi = weightKg / (heightMetre * heightMetre);
    setBmiValue(bmi.toFixed(1));
    setBmiStatus(checkBmiStatus(bmi));
    setAsBmiCalculated(true);
  }

  function reset() {
    weightElementRef.current.value = '';
    heightElementRef.current.value = '';
    setBmiValue(null);
    setBmiStatus(null);
    setAsBmiCalculated(null);
    setStatusColor('#5C4BE8');
    setInputError(false);
    setErrorMsg({ weightInputErrMsg: '', heightInputErrMsg: '' });
  }

  function checkBmiStatus(bmiValue) {
    if (bmiValue < 18.5) {
      setStatusColor('#C7B300');
      return 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setStatusColor('#267726');
      return 'Healthy';
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setStatusColor('#E72F0F');
      return 'Overweight';
    } else if (bmiValue >= 30) {
      setStatusColor('#C11306');
      return 'Obese';
    } else {
      setStatusColor('#5C4BE8');
      return '';
    }
  }

  function validateInput() {
    let height = heightElementRef.current.value;
    let weight = weightElementRef.current.value;
    console.log(height, weight);
    setErrorMsg({
      heightInputErrMsg: isValidHeightInput(height),
      weightInputErrMsg: isValidWeightInput(weight),
    });
    setInputError(
      isValidHeightInput(height) == '' && isValidWeightInput(weight) == ''
        ? false
        : true
    );
  }

  function isValidWeightInput(weight) {
    if (weight != '') {
      if (weight > 140 || weight < 18) return 'Invalid weight input.';
      else return '';
    } else {
      return '';
    }
  }

  function isValidHeightInput(height) {
    if (height != '') {
      if (height > 214 || height < 91) return 'Invalid height input.';
      else return '';
    } else {
      return '';
    }
  }

  return (
    <>
      <div id="BMI-Calculator-Container">
        <label>Height (cm)</label>
        <input
          type="number"
          placeholder="Enter Your Height"
          ref={heightElementRef}
          onInput={validateInput}
        />
        <span className="error-msg">{errorMsg.heightInputErrMsg}</span>
        <label>Weight (kg)</label>
        <input
          type="number"
          placeholder="Enter Your Weight"
          ref={weightElementRef}
          onInput={validateInput}
        />
        <span className="error-msg">{errorMsg.weightInputErrMsg}</span>
        <div id="bmi-calculate-btn-container">
          <button id="bmi-calculate-btn" onClick={calculateBmi}>
            Calculate BMI
          </button>
          <button id="reset-btn" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
      {isBmiCalculated ? (
        <Result
          bmiValue={bmiValue}
          bmiStatus={bmiStatus}
          statusColor={statusColor}
        />
      ) : (
        <></>
      )}
    </>
  );
}
