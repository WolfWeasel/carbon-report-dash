import './App.css';
import { useState } from 'react';
import Graph from './components/Graph';
import Table from './components/Table/Table';
import carbonData from './data/MockEmissionsData.json';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import CarbonStatus from './components/CarbonStatus/CarbonStatus';


function App() {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  function generateReport() {
    console.log('Report generated');
    console.log(startDate, endDate);
  }

  return (
    <div className="App">
      <h1>Carbon Report - Dashboard</h1>

      <div className='dateSelect'>
         From
        <DatePicker selected={startDate}  onChange={(date) => setStartDate(date)} />
        To
        <DatePicker selected={endDate}  onChange={(date) => setEndDate(date)} />

        <button onClick={ generateReport }>Generate</button>
      </div>

      <div className='graphBox'>
        <Graph data={carbonData}/>
      </div>

      <div className='tableBox'>
        <Table data={carbonData}/>
      </div>

      <div className='emissionIndication'>
        <CarbonStatus data={carbonData}/>
      </div>
    </div>
  );
}

export default App;
