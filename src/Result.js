import React, { useState } from 'react';

export default function Result({ bmiValue, bmiStatus, statusColor }) {
  return (
    <div id="result-area" style={{ backgroundColor: statusColor }}>
      <h4 id="result-title">Your BMI Result</h4>
      <div id="bmi-value">{bmiValue}</div>
      <div id="bmi-status">{bmiStatus}</div>
    </div>
  );
}
