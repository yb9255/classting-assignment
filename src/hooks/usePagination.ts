import { useState } from 'react';

type Props<T> = {
  dataArray: T[];
  pageLimit: number;
};

function usePagination<T>({ dataArray, pageLimit }: Props<T>) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const firstSlice = currentPageIndex * pageLimit;
  const currentPageData = dataArray.slice(firstSlice, firstSlice + pageLimit);
  const totalPageCount = Math.ceil(dataArray.length / pageLimit);

  return {
    currentPageIndex,
    setCurrentPageIndex,
    currentPageData,
    totalPageCount,
  };
}

export default usePagination;
