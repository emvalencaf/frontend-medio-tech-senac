import React from 'react';
import { useSearchParams } from 'next/navigation';

export interface IPagination {
    totalPages: number;
    currentPage: number;
}

const Pagination: React.FC<IPagination> = ({ currentPage, totalPages }) => {
    const searchParams = useSearchParams();
    const baseParams = new URLSearchParams(searchParams.toString()); // Clona os parâmetros de busca

    const onPageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;

        baseParams.set('page', page.toString()); // Atualiza o parâmetro da página
        const newSearchParams = baseParams.toString();
        window.location.search = newSearchParams; // Atualiza a URL
    };

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