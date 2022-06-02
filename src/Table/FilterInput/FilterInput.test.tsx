import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { TableContextProvider } from '../context/TableContext';
import FilterInput from './FilterInput';

test("Input shouldn't allow other characters than numbers within boundries", () => {
  render(
    <BrowserRouter>
      <TableContextProvider>
        <FilterInput />
      </TableContextProvider>
    </BrowserRouter>
  );

  const input: HTMLInputElement =
    screen.getByPlaceholderText('Filter using id');

  expect(input.value).toBe('');
  fireEvent.change(input, { target: { value: 'aaabb' } });
  fireEvent.change(input, { target: { value: '?//32../' } });
  fireEvent.change(input, { target: { value: '0' } });
  fireEvent.change(input, { target: { value: '15' } });
  expect(input.value).toBe('');
});

test('Input should get the value from search params', () => {
  const history = createMemoryHistory();

  render(
    <Router location="/?filter=5" navigator={history}>
      <TableContextProvider>
        <FilterInput />
      </TableContextProvider>
    </Router>
  );

  const input: HTMLInputElement =
    screen.getByPlaceholderText('Filter using id');

  expect(input.value).toBe('5');
});
