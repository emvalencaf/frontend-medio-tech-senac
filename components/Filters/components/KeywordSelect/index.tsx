import React from 'react';
import Select from 'react-select';

// Defina o tipo para as opções de palavras-chave
type KeywordOption = {
    value: string;
    label: string;
};

interface KeywordSelectProps {
    selectedKeywords: KeywordOption[];
    setSelectedKeywords: React.Dispatch<React.SetStateAction<KeywordOption[]>>;
}

// Exemplo de palavras-chave - você pode substituir isso com dados reais de seu backend
const keywordOptions: KeywordOption[] = [
    { value: 'urgente', label: 'Urgente' },
    { value: 'importante', label: 'Importante' },
    { value: 'noticia', label: 'Notícia' },
    { value: 'evento', label: 'Evento' },
    { value: 'reuniao', label: 'Reunião' },
];

const KeywordSelect: React.FC<KeywordSelectProps> = ({ selectedKeywords, setSelectedKeywords }) => {
    const handleChange = (selectedOptions: readonly KeywordOption[]) => {
        setSelectedKeywords(selectedOptions as KeywordOption[]);
    };

    return (
        <Select
            isMulti
            name="keywords"
            options={keywordOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={selectedKeywords}
            onChange={handleChange}
            placeholder="Selecione palavras-chave..."
        />
    );
};

export default KeywordSelect;