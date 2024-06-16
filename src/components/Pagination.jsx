import React from 'react';

const Pagination = ({ activePage, totalPages, onPageChange }) => {

  const handleClick = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`pagination-item ${activePage === i ? 'active' : ''}`}
          onClick={() => handleClick(i)}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <ul className="flex justify-center gap-2 md:gap-5 list-none mt-8">
      <li
        className={`pagination-item ${activePage === 1 ? 'disabled' : ''}`}
        onClick={() => handleClick(activePage - 1)}
      >
        &lt;
      </li>
      {renderPageNumbers()}
      <li
        className={`pagination-item ${activePage === totalPages ? 'disabled' : ''}`}
        onClick={() => handleClick(activePage + 1)}
      >
        &gt;
      </li>
    </ul>
  );
};

export default Pagination;
