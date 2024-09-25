import React, { useState, useEffect } from 'react';
import data from '../data/yapay-zeka-turkce-mmlu-bolum-sonuclari.json';

const ResultList = () => {
    const [results, setResults] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'descending' });

    useEffect(() => {
        setResults(data);
    }, []);

    const requestSort = (key) => {
        let direction = 'descending';
        if (sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = 'ascending'; 
        }
        setSortConfig({ key, direction }); 
    };
    
    const sortedResults = React.useMemo(() => {
        let sortableItems = [...results];
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
    }, [results, sortConfig]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
        <div style={{ maxHeight: '600px', maxWidth: '1200px', overflowY: 'auto' }}>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                {results.length > 0 && Object.keys(results[0]).map((key, index) => (
                                        <th key={index} onClick={() => requestSort(key)} style={{ cursor: 'pointer' }}>
                                        {key} {sortConfig.key === key ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '↕'}
                                    </th>
                                    ))}
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((result, index) => (
                <tr key={index}>
                  {Object.values(result).map((value, idx) => (
                                            <td key={idx}>{value}</td> 
                                        ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultList;
