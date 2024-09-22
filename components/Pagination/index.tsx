import React from 'react';

export interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPagination> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border ${currentPage === 1 ? 'text-gray-400' : 'text-blue-500'}`}
      >
        Anterior
      </button>
      <span className="mx-4">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border ${currentPage === totalPages ? 'text-gray-400' : 'text-blue-500'}`}
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
