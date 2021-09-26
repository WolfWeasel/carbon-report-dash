import "./App.css";
import { useState } from "react";
import Graph from "./components/Graph";
import Table from "./components/Table/Table";
import carbonData from "./data/MockEmissionsData.json";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import CarbonStatus from "./components/CarbonStatus/CarbonStatus";

function App() {
  const [fromDate, setFromDate] = useState(new Date('2021-07-01'));
  const [toDate, setToDate] = useState(new Date('2021-07-04'));
  const [carbonDataJ, setCarbonDataJ] = useState(carbonData)
  console.log(carbonDataJ);
  let isData = true;

  function stringToDate(dateStr) {
    return new Date(dateStr);
  }
  function generateReport() {
    
    setCarbonDataJ(carbonData.filter((item) => 
    stringToDate(item.date).getTime() >= fromDate.getTime() && stringToDate(item.date) <= toDate.getTime()
      ));
    if(carbonDataJ.length == 0) {
      isData = false;
    } else {
      isData = true;
    }
    console.log(isData);
  }

  return (
    <div className="App">
      <h1>Carbon Report - Dashboard</h1>

      <div className="dateSelect">
            <div className="mar-left">From </div>
            <DatePicker className="input"
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
            />
            <div className="mar-left">To </div>
            <DatePicker className="input"
              selected={toDate}
              onChange={(date) => setToDate(date)}
            />
            <button className="btn" onClick={generateReport}>Generate</button>
          </div>

          <div className="graphBox">
            <Graph data={carbonData} />
          </div>

          <div className="tableBox">
            <Table data={carbonData} />
          </div>

          <div className="emissionIndication">
            <CarbonStatus data={carbonData} />
          </div>
    </div>
  );
}

export default App;
