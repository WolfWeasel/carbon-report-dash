import "./CarbonStatus.css";
// import React, { useState } from "react";

// This component monitors the carbon status of the selected period
// The statuses are: Low, High, Critical

function CarbonStatus(props) {

  let mono = 0;
  let di = 0;

  function avg(props) {
    let monCount = 0;
    mono = 0;
    let diCount = 0;
    di = 0;
    props.data.forEach((element) => {
      if (element.gas === "CO") {
        monCount++;
        mono = mono + parseFloat(element.amount);
      } else {
        diCount++;
        di = di + parseFloat(element.amount);
      }
    });
    mono = mono/ monCount;
    di =di/ diCount;
  }
  avg(props);

  return (
    <div className="status">
      <h1>Carbon level status:</h1>
      <div className="stats">
        <h2>
          CO:{" "}
          {mono < 0.2
            ? "Low"
            : mono <= 0.29
            ? "High"
            : mono >= 0.3
            ? "Critical"
            : ""}
        </h2>
        <h2>
          CO-2:{" "}
          {di < 0.2
            ? "Low"
            : di <= 0.29
            ? "High"
            : di >= 0.3
            ? "Critical"
            : ""}
        </h2>
      </div>
    </div>
  );
}
export default CarbonStatus;
