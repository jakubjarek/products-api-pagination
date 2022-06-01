import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { CircularProgress } from '@mui/material';

import { PER_PAGE } from 'App/constants';
import { useTableContext } from './context/TableContext';
import FilterInput from './FilterInput/FilterInput';
import Pagination from './Pagination/Pagination';

function FilterableTable() {
  const { state, error } = useTableContext();

  if (error) {
    return <h1 style={{ textAlign: 'center' }}>😕 An error has occured 😕</h1>;
  }

  if (!state.data.length) {
    return (
      <Box
        sx={{
          height: '300px',
          display: 'flex',
          placeContent: 'center',
          placeItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If products length is less than PER_PAGE, fill
  // the space with empty row to avoid layout jumps
  const emptyRowsHeight = (PER_PAGE - state.data.length) * 53;

  return (
    <Box sx={{ maxWidth: '728px', margin: '3rem auto 0' }}>
      <Paper sx={{ width: '100%' }}>
        <FilterInput />
        <Divider />
        <TableContainer component="div">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right">year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state &&
                state.data.map(({ id, color, name, year }) => (
                  <TableRow key={id} sx={{ backgroundColor: color }}>
                    <TableCell sx={{ width: '30%' }} component="th" scope="row">
                      {id}
                    </TableCell>
                    <TableCell sx={{ width: '40%' }} align="right">
                      {name}
                    </TableCell>
                    <TableCell sx={{ width: '30%' }} align="right">
                      {year}
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRowsHeight > 0 && (
                <TableRow
                  sx={{
                    height: emptyRowsHeight,
                    width: '100%',
                  }}
                ></TableRow>
              )}
            </TableBody>
            <Pagination />
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default FilterableTable;
