export type DateSortOption = {
    value: 'asc' | 'desc';
    label: string;
};

export type KeywordOption = {
    value: string;
    label: string;
};

export type DateSortOrder = 'desc' | 'asc';

export const keywordOptions: KeywordOption[] = [
    { value: 'urgente', label: 'Urgente' },
    { value: 'importante', label: 'Importante' },
    { value: 'noticia', label: 'Notícia' },
    { value: 'evento', label: 'Evento' },
    { value: 'reuniao', label: 'Reunião' },
];

export const dateSortOptions: DateSortOption[] = [
    { value: 'desc', label: 'Mais recente primeiro' },
    { value: 'asc', label: 'Mais antigo primeiro' },
];