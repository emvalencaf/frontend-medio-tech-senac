import { FaBook, FaTag, FaUser } from "react-icons/fa";
import SearchButton from "./components/SearchButton";
import SearchInput from "./components/SearchInput";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

export interface IFormInputs {
  title: string;
  tags: string;
  author: string;
}

export type SearchFieldsTypes = 'title' | 'tags' | 'author';

const AnnouncementSearch: React.FC = () => {
  const { handleSubmit, register, watch } = useForm<IFormInputs>();
  const [activeField, setActiveField] = useState<SearchFieldsTypes | null>(null);

  const titleValue = watch('title');
  const tagsValue = watch('tags');
  const authorValue = watch('author');

  const allFieldsFilled = titleValue || tagsValue || authorValue;

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (!allFieldsFilled) {
      return toast.error('Preencha pelo menos um campo de busca');
    }
    
    try {
      // Implement your search logic here
      console.log('Searching for:', data);
      toast.success('Busca realizada com sucesso!');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      toast.error(errorMessage);
    }
  };

  return (
    <form
      className="relative flex items-center bg-gray-100 border border-gray-300 rounded-md max-w-screen-lg mx-auto w-1/2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-4/5">
        <SearchInput
          id="title"
          register={register}
          placeholder="Título"
          Icon={FaBook}
          isActive={activeField === 'title'}
          onClick={() => setActiveField(activeField === 'title' ? null : 'title')}
        />
        <SearchInput
          id="tags"
          register={register}
          placeholder="Palavras-chave"
          Icon={FaTag}
          isActive={activeField === 'tags'}
          onClick={() => setActiveField(activeField === 'tags' ? null : 'tags')}
        />
        <SearchInput
          id="author"
          register={register}
          placeholder="Autor"
          Icon={FaUser}
          isActive={activeField === 'author'}
          onClick={() => setActiveField(activeField === 'author' ? null : 'author')}
        />
      </div>
      <SearchButton isEnabled={!!allFieldsFilled} />
    </form>
  );
};

export default AnnouncementSearch;