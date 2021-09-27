import "./App.css";
import React from "react";
import Graph from "./components/Graph/Graph";
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
  }

  generateReport() {
    this.setState({
      carbonData: carbonData
    });

    this.setState({carbonDataRef: carbonData.filter((item) => 
    this.stringToDate(item.date).getTime() >= this.state.fromDate.getTime() && this.stringToDate(item.date) <= this.state.toDate.getTime()
      )});

      console.log(this.state.carbonDataRef);
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
