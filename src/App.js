import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './App.css';


const columns = [
  {
    name: 'Rating',
    selector: row => row.id,
    width: '80px',
  },
  {
    name: '',
    cell: row => <img src={row.image} width={250} alt={row.name} />,
    selector: row => row.image, 
    width: '300px',
  },
  {
    name: 'Topic',
    selector: row => row.name,
    width: '300px',
  },
  {
    name: 'Detail',
    selector: row => row.detail,
    width: '800px',
  },
  {
    name: 'Location',
    selector: row => row.location,
  },
];

function MyApp() {

  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchData(1, perPage)
  }, [perPage]);
  

  const fetchData = (page, perPage) => {
    fetch(`https://happy-jay-bonnet.cyclic.app/howto`)
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setItems(data.map(item => ({
            id: item.id,
            image: `https://happy-jay-bonnet.cyclic.app/${item.image}`,
            name: item.name,
            detail: item.detail,
            location: item.location
          })));
          setTotalRows(data.length);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  
  

  const handlePageChange = page => {
    fetchData(page, perPage);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    fetchData(page, newPerPage);
  };

  const handleDelete = (row) => {
    console.log('Delete row:', row);
    setItems(prevItems => prevItems.filter(item => item.id !== row.id));
  };
  
  


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='myDataTable'>
        <DataTable
          columns={columns}
          data={items}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
        <div className='actions-container'>
          <button onClick={() => handleDelete(items[0])}>Delete</button>
        </div>
      </div>
    );
  }
}


export default MyApp;