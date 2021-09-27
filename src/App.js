import "./App.css";
import React from "react";
// import { useState } from "react";
import Graph from "./components/Graph";
import Table from "./components/Table/Table";
import carbonData from "./data/MockEmissionsData.json";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import CarbonStatus from "./components/CarbonStatus/CarbonStatus";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      carbonDataRef: carbonData,
      fromDate: new Date('2021-07-01'),
      toDate: new Date('2021-07-04'),
    }

    this.generateReport = this.generateReport.bind(this);
    // this.stringToDate = this.stringToDate.bind(this);
  }

  generateReport() {
    this.setState({
      carbonData: carbonData
    });
    // console.log(carbonData);
    // console.log(this.state.carbonDataRef);

    // this.setState({carbonDataRef: carbonData});

    
    this.setState({carbonDataRef: carbonData.filter((item) => 
    this.stringToDate(item.date).getTime() >= this.state.fromDate.getTime() && this.stringToDate(item.date) <= this.state.toDate.getTime()
      )});

      console.log(this.state.carbonDataRef);
    // if(this.state.carbonData.length === 0) {
    //   isData = false;
    // } else {
    //   isData = true;
    // }
    // console.log(isData);
  }
  stringToDate(dateStr) {
    return new Date(dateStr);
  }

  render() {

  // let isData = true;

    return (
      <div className="App">
        <h1>Carbon Report - Dashboard</h1>
  
        <div className="dateSelect">
              <div className="mar-left">From </div>
              <DatePicker className="input"
                selected={this.state.fromDate}
                onChange={(date) => this.setState({fromDate: date})}
              />
              <div className="mar-left">To </div>
              <DatePicker className="input"
                selected={this.state.toDate}
                onChange={(date) => this.setState({toDate: date})}
              />
              <button className="btn" onClick={this.generateReport}>Generate</button>
            </div>
  
            <div className="graphBox">
              <Graph data={this.state.carbonDataRef} />
            </div>
  
            <div className="tableBox">
              <Table data={this.state.carbonDataRef} />
            </div>
  
            <div className="emissionIndication">
              <CarbonStatus data={this.state.carbonDataRef} />
            </div>
      </div>
    );
  }

}

export default App;

// function App() {
//   const [fromDate, setFromDate] = useState(new Date('2021-07-01'));
//   const [toDate, setToDate] = useState(new Date('2021-07-04'));
//   const [carbonDataJ, setCarbonDataJ] = useState(carbonData)
//   console.log(carbonDataJ);
//   let isData = true;

//   function stringToDate(dateStr) {
//     return new Date(dateStr);
//   }
//   function generateReport() {
    
//     setCarbonDataJ(carbonData.filter((item) => 
//     stringToDate(item.date).getTime() >= fromDate.getTime() && stringToDate(item.date) <= toDate.getTime()
//       ));
//     if(carbonDataJ.length == 0) {
//       isData = false;
//     } else {
//       isData = true;
//     }
//     console.log(isData);
//   }

//   return (
//     <div className="App">
//       <h1>Carbon Report - Dashboard</h1>

//       <div className="dateSelect">
//             <div className="mar-left">From </div>
//             <DatePicker className="input"
//               selected={fromDate}
//               onChange={(date) => setFromDate(date)}
//             />
//             <div className="mar-left">To </div>
//             <DatePicker className="input"
//               selected={toDate}
//               onChange={(date) => setToDate(date)}
//             />
//             <button className="btn" onClick={generateReport}>Generate</button>
//           </div>

//           <div className="graphBox">
//             <Graph data={carbonData} />
//           </div>

//           <div className="tableBox">
//             <Table data={carbonData} />
//           </div>

//           <div className="emissionIndication">
//             <CarbonStatus data={carbonData} />
//           </div>
//     </div>
//   );
// }

// export default App;
