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

const columns = [
  { id: 'name', label: 'CommonName', minWidth: 170 },
  { id: 'sciname', label: 'ScientificName', minWidth: 100 }
];

function createData(name, sciname) {
    return { name, sciname};
  }
  
  const rows = [
    createData('African Elephant', 'Loxodonta africana'),
    createData('Arctic Wolf', 'Loxodonta africana'),
    createData('African Elephant', 'Loxodonta africana'),
    createData('African Elephant', 'Loxodonta africana'),
    createData('African Elephant', 'Loxodonta africana'),
    createData('African Elephant', 'Loxodonta africana'),
    createData('African Elephant', 'Loxodonta africana'),
    createData('African Elephant', 'Loxodonta africana'),
    createData('African Elephant', 'Loxodonta africana'),
    createData('African Elephant', 'Loxodonta africana'),
    createData('African Elephant', 'Loxodonta africana'),
    createData('African Elephant', 'Loxodonta africana'),
  ];

export default function AnimalsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let navigate = useNavigate()

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
    <Paper sx={{ width: '80%', overflow: '', marginLeft:'30px', marginTop:'50px' }}>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                        console.log(row['name']);
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align='center' component="a" onClick={() => navigate('/animalInfo', {state:{animalName: row['name']}})}>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}