'use client';

import Select from 'react-select';
import { DateSortOption, DateSortOrder, KeywordOption, keywordOptions } from '../../constants/filtersOptions';
import { useState } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';


interface FiltersProps {
    onFiltersChange: (keywords: KeywordOption[], dateSort: DateSortOrder) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFiltersChange }) => {
    const [selectedKeywords, setSelectedKeywords] = useState<KeywordOption[]>([]);
    const [dateSortOrder, setDateSortOrder] = useState<DateSortOrder>('desc');

    const handleKeywordChange = (selectedOptions: readonly KeywordOption[]) => {
        const newKeywords = selectedOptions as KeywordOption[];
        setSelectedKeywords(newKeywords);
        onFiltersChange(newKeywords, dateSortOrder);
    };

    const toggleDateSort = () => {
        const newOrder = dateSortOrder === 'desc' ? 'asc' : 'desc';
        setDateSortOrder(newOrder);
        onFiltersChange(selectedKeywords, newOrder);
    };

    return (
        <div className="bg-white p-4 w-1/3 rounded-md shadow-md flex gap-1.5 items-center justify-center">
            <div className="flex items-center">
                <label className="block text-xs font-medium text-gray-700 mr-2">
                    Ordenar por data:
                </label>
                <button
                    onClick={toggleDateSort}
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    title={dateSortOrder === 'desc' ? 'Mais recente primeiro' : 'Mais antigo primeiro'}
                >
                    {dateSortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
                </button>
            </div>
            <div className="mb-4 flex items-center justify-center">
                <Select
                    isMulti
                    name="keywords"
                    options={keywordOptions}
                    className="basic-multi-select flex items-center justify-center"
                    classNamePrefix="select"
                    value={selectedKeywords}
                    onChange={handleKeywordChange}
                    placeholder="Selecione palavras-chave..."
                />
            </div>
        </div>
    );
};

export default Filters;