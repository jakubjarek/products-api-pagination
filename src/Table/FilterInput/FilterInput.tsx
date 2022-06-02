import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import { useTableContext } from '../context/TableContext';

function FilterInput() {
  const [filterValue, setFilterValue] = useState('');
  const [searchParams] = useSearchParams();
  const { changeCurrentFilter } = useTableContext();

  useEffect(() => {
    const filter = searchParams.get('filter');
    filter && setFilterValue(filter);
  }, [searchParams]);

  // debounce the input
  useEffect(() => {
    const timeout = setTimeout(() => changeCurrentFilter(filterValue), 300);

    return () => clearTimeout(timeout);
  }, [filterValue, changeCurrentFilter]);

  const handleValueChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!isInputValid(value)) return;

    setFilterValue(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        width: '100%',
        px: '1rem',
      }}
    >
      <SearchIcon color="disabled" />
      <InputBase
        value={filterValue}
        onChange={handleValueChange}
        sx={{ width: '100%', py: 1.5 }}
        placeholder="Filter using id"
      />
    </Box>
  );
}

export default FilterInput;

function isInputValid(value: string) {
  if (value === '') return true;
  if (+value < 1 || +value > 12) return false;
  if (isNaN(+value)) return false;
  return true;
}
