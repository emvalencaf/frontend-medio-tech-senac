'use client';

import { DateSortOrder } from '../../constants/filtersOptions';
import { useState } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IClassFilters {}

const ClassFilters: React.FC<IClassFilters> = ({  }) => {
    const [dateSortOrder, setDateSortOrder] = useState<DateSortOrder>('desc');

    const toggleDateSort = () => {
        const newOrder = dateSortOrder === 'desc' ? 'asc' : 'desc';
        setDateSortOrder(newOrder);
    };

    return (
        <div className="bg-white p-4 w-1/3 rounded-md shadow-md flex gap-1.5 items-center justify-center">
            <div className="flex items-center">
                <label className="block text-xs font-medium text-gray-700 mr-2">
                    Ordenar por ano:
                </label>
                <button
                    onClick={toggleDateSort}
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    title={dateSortOrder === 'desc' ? 'Mais recente primeiro' : 'Mais antigo primeiro'}
                >
                    {dateSortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
                </button>
            </div>
            <div className="flex items-center">
                <label className="block text-xs font-medium text-gray-700 mr-2">
                    Ordenar por semestre:
                </label>
                <button
                    onClick={toggleDateSort}
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    title={dateSortOrder === 'desc' ? 'Mais recente primeiro' : 'Mais antigo primeiro'}
                >
                    {dateSortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
                </button>
            </div>
        </div>
    );
};

export default ClassFilters;