import SearchButton from "./components/SearchButton";
import SearchInput from "./components/SearchInput";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { MdEditCalendar, MdOutlineCalendarMonth } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

export interface IFormInputs {
    name: string;
    year: string;
    semester: string;
}

export type SearchFieldsTypes = 'name' | 'year' | 'semester';

const ClassSearch: React.FC = () => {
    const { handleSubmit, register, watch } = useForm<IFormInputs>();
    const [activeField, setActiveField] = useState<SearchFieldsTypes | null>(null);

    const nameValue = watch('name');
    const yearValue = watch('year');
    const semesterValue = watch('semester');

    const allFieldsFilled = nameValue || yearValue || semesterValue;

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
                    id="name"
                    register={register}
                    placeholder="Nome"
                    Icon={SiGoogleclassroom}
                    isActive={activeField === 'name'}
                    onClick={() => setActiveField(activeField === 'name' ? null : 'name')}
                />
                <SearchInput
                    id="year"
                    register={register}
                    placeholder="Ano"
                    Icon={MdOutlineCalendarMonth}
                    isActive={activeField === 'year'}
                    onClick={() => setActiveField(activeField === 'year' ? null : 'year')}
                />
                <SearchInput
                    id="semester"
                    register={register}
                    placeholder="Semestre"
                    Icon={MdEditCalendar}
                    isActive={activeField === 'semester'}
                    onClick={() => setActiveField(activeField === 'semester' ? null : 'semester')}
                />
            </div>
            <SearchButton isEnabled={!!allFieldsFilled} />
        </form>
    );
};

export default ClassSearch;