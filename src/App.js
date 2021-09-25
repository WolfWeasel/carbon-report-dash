import './App.css';
import Graph from './components/Graph';
import Table from './components/Table/Table';
import carbonData from './data/MockEmissionsData.json';


function App() {
  return (
    <div className="App">
      <h1>Carbon Report - Dashboard</h1>

      <div className='graphBox'>
        <Graph data={carbonData}/>
      </div>
      <div className='tableBox'>
        <Table data={carbonData}/>
      </div>
    </div>
  );
}

export default App;
