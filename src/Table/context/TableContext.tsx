import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getPageData, getSingleProductData } from 'api/api';
import { DataType } from 'api/types';

interface ContextType {
  state: DataType;
  error?: Error;
  changeCurrentPage: (newPage: string) => void;
  changeCurrentFilter: (newId: string) => void;
}

const TableContext = createContext<ContextType>({} as ContextType);

const initialState: DataType = {
  page: 1,
  per_page: 1,
  total: 1,
  total_pages: 1,
  data: [],
};

export function TableContextProvider({ children }: { children: JSX.Element }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<DataType>(initialState);
  const [error, setError] = useState<Error>();
  const previousPage = useRef('1');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const page = searchParams.get('page');
      const filter = searchParams.get('filter');

      // fetch the api for boundries to validate with
      const { total, total_pages } = await getPageData('1');

      if (
        !isNumberParamValid(page, total_pages) ||
        !isNumberParamValid(filter, total)
      ) {
        navigate('/?page=1', { replace: true });
        changeCurrentPage('1');
        return;
      }

      if (filter) {
        changeCurrentFilter(filter);
        return;
      }

      changeCurrentPage(page ? page : '1');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function changeCurrentPage(newPage: string) {
    try {
      const data = await getPageData(newPage);
      setState(data);
      setSearchParams({ page: newPage });
      previousPage.current = newPage;
    } catch (error) {
      setError(error as Error);
    }
  }

  async function changeCurrentFilter(newId: string) {
    // Take the user back to the previously viewed page
    if (!newId) {
      changeCurrentPage(previousPage.current);
      return;
    }

    try {
      const data = await getSingleProductData(newId);
      if (state.page !== 1) previousPage.current = `${state.page}`;
      setSearchParams({ filter: newId });
      setState(data);
    } catch (error) {
      setError(error as Error);
    }
  }

  return (
    <TableContext.Provider
      value={{ state, error, changeCurrentPage, changeCurrentFilter }}
    >
      {children}
    </TableContext.Provider>
  );
}

export const useTableContext = () => useContext(TableContext);

function isNumberParamValid(
  param: string | null,
  maximum: number,
  minimum = 1
) {
  if (!param) return true; // having no param makes it valid ...kind of
  if (isNaN(+param)) return false;
  if (+param < minimum || +param > maximum) return false;
  return true;
}
