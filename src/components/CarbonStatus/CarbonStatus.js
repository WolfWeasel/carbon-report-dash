import "./CarbonStatus.css";
import React, { useState } from "react";

// This component monitors the carbon status of the selected period
// The statuses are: Low, High, Critical

// class CarbonStatus extends React.Component {
//     constructor(props) {
//         super(props);
//         avg(props);
//     }
// }

function CarbonStatus(props) {
  const [monoxide, setMonoxideState] = useState(0);
  const [dioxide, setDioxideState] = useState(0);

  function avg(props) {
    let monCount = 0;
    let mono = 0;
    let diCount = 0;
    let di = 0;
    props.data.forEach((element) => {
      if (element.gas === "CO") {
        monCount++;
        mono = mono + parseFloat(element.amount);
      } else {
        diCount++;
        di = di + parseFloat(element.amount);
      }
    });
    console.log(mono / monCount);
    console.log(di / diCount);
    // setMonoxideState(mono / monCount);
    // setDioxideState(di / diCount);
  }
  avg(props);
  return (
    <div>
      <h1>Carbon status:</h1>
      <div className="status">
        {monoxide}
        {dioxide}
        <h2>CO: {monoxide <= 0.1 ? 'Low' : monoxide >= 0.25 ? 'Close' : 'High'}</h2>
        <h2>CO2: {monoxide <= 0.1 ? 'Low' : monoxide >= 0.25 ? 'Close' : 'High'}</h2>
      </div>
    </div>
  );

}
export default CarbonStatus;
