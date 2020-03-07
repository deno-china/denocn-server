import React, { FunctionComponent } from 'react';
import './index.less';

export interface PaginationProps {
  page: number;
  total: number;
  size?: number;
  onChange: (page: number, size: number) => void;
}

const Pagination: FunctionComponent<PaginationProps> = ({
  page,
  total,
  size = 20,
  onChange = () => null,
}) => {
  const lastPage = Math.ceil(total / size);
  if (lastPage < 2) return null;

  let start = page > 3 ? page - 2 : 2;
  let end = start + 5;
  if (end > lastPage) {
    end = lastPage;
    start = Math.max(2, end - 5);
  }

  return (
    <ul className="com-pagination">
      <li
        role="button"
        className={page === 1 ? 'active' : ''}
        onClick={() => onChange(1, size)}
      >
        1
      </li>
      {[...Array(end - start > 0 ? end - start : 1).fill(0)].map((_, index) => (
        <li
          className={page === index + start ? 'active' : ''}
          key={index}
          role="button"
          onClick={() => onChange(index + start, size)}
        >
          {index + start}
        </li>
      ))}
      <li
        role="button"
        className={page === lastPage ? 'active' : ''}
        onClick={() => onChange(lastPage, size)}
      >
        {lastPage}
      </li>
    </ul>
  );
};

export default Pagination;
