import SearchButton from "./components/SearchButton";
import SearchInput from "./components/SearchInput";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { FaBook, FaUser, FaUserCog } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { useSearchParams } from "next/navigation";

export interface IFormInputs {
    name?: string;
    userType?: string;
    className?: string;
    subjectName?: string;
}

export type SearchFieldsTypes = 'name' | 'userType' | 'className' | 'subjectName';

const UserSearch: React.FC = () => {
    const { handleSubmit, register, watch } = useForm<IFormInputs>();
    const [activeField, setActiveField] = useState<SearchFieldsTypes | null>(null);
    const searchParams = useSearchParams();
    const baseParams = new URLSearchParams(searchParams.toString()); // Clona os parâmetros de busca

    const nameValue = watch('name');
    const userTypeValue = watch('userType');
    const subjectNameValue = watch('subjectName');
    const classNameValue = watch('className');

    const allFieldsFilled = nameValue || userTypeValue || classNameValue || subjectNameValue;

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        if (!allFieldsFilled) {
            return toast.error('Preencha pelo menos um campo de busca');
        }

        try {
            if (data.userType) baseParams.set('userType', data.userType);
            if (data.name) baseParams.set('name', data.name);
            if (data.subjectName) baseParams.set('subjectName', data.subjectName);
            if (data.className) baseParams.set('className', data.className);

            const newSearchParams = baseParams.toString();
            
            window.location.search = newSearchParams; // Atualiza a URL
            
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
                    placeholder="Nome do usuário"
                    Icon={FaUser}
                    isActive={activeField === 'name'}
                    onClick={() => setActiveField(activeField === 'name' ? null : 'name')}
                />
                <SearchInput
                    id="className"
                    register={register}
                    placeholder="Nome da turma"
                    Icon={SiGoogleclassroom}
                    isActive={activeField === 'className'}
                    onClick={() => setActiveField(activeField === 'className' ? null : 'className')}
                />
                <SearchInput
                    id="subjectName"
                    register={register}
                    placeholder="Nome da disciplina"
                    Icon={FaBook}
                    isActive={activeField === 'subjectName'}
                    onClick={() => setActiveField(activeField === 'subjectName' ? null : 'subjectName')}
                />
                <SearchInput
                    id="userType"
                    register={register}
                    placeholder="Tipo de usuário"
                    Icon={FaUserCog}
                    isActive={activeField === 'userType'}
                    onClick={() => setActiveField(activeField === 'userType' ? null : 'userType')}
                />
            </div>
            <SearchButton isEnabled={!!allFieldsFilled} />
        </form>
    );
};

export default UserSearch;