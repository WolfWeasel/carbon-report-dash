import { useState, useMemo } from "react";
import './Table.css';


const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);
  
    const sortedItems = useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    return { items: sortedItems, requestSort, sortConfig };
  };
  
  const Table = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props.data);
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
      <table className='table'>
        <caption className='header'>Carbon Emmissions Data</caption>
        <thead>
          <tr className='tableRow'>
            <th>
              <button
                type="button"
                onClick={() => requestSort('date')}
                className={getClassNamesFor('date')}
              >
                Date
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('gas')}
                className={getClassNamesFor('gas')}
              >
                Gas
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('amount')}
                className={getClassNamesFor('amount')}
              >
                Amount
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr className={`tableRow ${item.amount < 0.2 ? "low" : item.amount >= 0.2 && item.amount <= 0.3 ? "high" : "critical"}`} key={index}>
              <td>{item.date}</td>
              <td>{item.gas}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

export default Table;
