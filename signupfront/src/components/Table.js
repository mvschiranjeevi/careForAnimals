import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

const columns = [
  { id: 'commonName', label: 'CommonName', minWidth: 170 },
  { id: 'sciName', label: 'ScientificName', minWidth: 100 }
];

  
  const rows = [
    {name:"African Elephant",sciname:"Loxodonta africana"},
    // createData('African Elephant', 'Loxodonta africana'),
    // createData('Arctic Wolf', 'Loxodonta africana'),
    // createData('African Elephant', 'Loxodonta africana'),
    // createData('African Elephant', 'Loxodonta africana'),
    // createData('African Elephant', 'Loxodonta africana'),
    // createData('African Elephant', 'Loxodonta africana'),
    // createData('African Elephant', 'Loxodonta africana'),
    // createData('African Elephant', 'Loxodonta africana'),
    // createData('African Elephant', 'Loxodonta africana'),
    // createData('African Elephant', 'Loxodonta africana'),
    // createData('African Elephant', 'Loxodonta africana'),
    // createData('African Elephant', 'Loxodonta africana'),
  ];

export default function AnimalsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let navigate = useNavigate()
  const [animals,setAnimals]=React.useState(null);

  React.useEffect( () => {
    Axios.get(`http://localhost:4000/app/getAnimals`).then((response) => {
      setAnimals(response.data);
      console.log(response);
    });
}, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick=()=>{

  }

  return (
    <>
    {animals && <Paper sx={{ width: '80%', overflow: '', marginLeft:'30px', marginTop:'50px' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='center'
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {animals
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                        console.log(row['commonName']);
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align='center' component="a" onClick={() => navigate('/animalInfo', {state:{animalName: row['commonName']}})}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={animals.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>}
    </>
  );
}