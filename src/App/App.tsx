import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { TableContextProvider } from '../Table/context/TableContext';
import Table from '../Table/Table';

function App() {
  return (
    <BrowserRouter>
      <TableContextProvider>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="*" element={<Navigate to="/?page=1" replace />} />
        </Routes>
      </TableContextProvider>
    </BrowserRouter>
  );
}

export default App;
