import SearchButton from "./components/SearchButton";
import SearchInput from "./components/SearchInput";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { FaUser, FaUserCog } from "react-icons/fa";

export interface IFormInputs {
    name: string;
    userType: string;
}

export type SearchFieldsTypes = 'name' | 'userType';

const UserSearch: React.FC = () => {
    const { handleSubmit, register, watch } = useForm<IFormInputs>();
    const [activeField, setActiveField] = useState<SearchFieldsTypes | null>(null);

    const nameValue = watch('name');
    const userTypeValue = watch('userType');

    const allFieldsFilled = nameValue || userTypeValue;

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
                    Icon={FaUser}
                    isActive={activeField === 'name'}
                    onClick={() => setActiveField(activeField === 'name' ? null : 'name')}
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