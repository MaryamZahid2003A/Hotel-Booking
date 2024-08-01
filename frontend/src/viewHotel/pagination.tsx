import React from 'react';

type PaginationProps = {
  page: number;
  pages: number;
  onpageChange: (newPage: number) => void;
};

export default function Pagination({ page, pages, onpageChange }: PaginationProps) {
  const pageNo: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pageNo.push(i);
  }

  return (
    <div className='flex flex-row justify-center mt-10 mb-5'>
      <div className='flex flex-row mt-10 mb-10'>
        {pageNo.map((number) => (
          <div key={number} className='flex flex-row bg-slate-500 ml-5'>
            <ul className={` flex flex-row ${page === number ? 'bg-gray-100' : ''}`}></ul>
            <button onClick={() => onpageChange(number)} className='specificPage'>
              {number}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
