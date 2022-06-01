import TableRow from '@mui/material/TableRow';
import { TableFooter, TablePagination } from '@mui/material';

import { useTableContext } from '../context/TableContext';

function Pagination() {
  const { state, changeCurrentPage } = useTableContext();
  const { page, per_page, total } = state;

  const handlePageChange = (e: unknown, newPage: number) =>
    changeCurrentPage(`${newPage + 1}`);

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[]} // disable selecting number of items per page
          rowsPerPage={per_page}
          count={total}
          page={page - 1} // page indexing starts at 0
          onPageChange={handlePageChange}
        />
      </TableRow>
    </TableFooter>
  );
}

export default Pagination;
