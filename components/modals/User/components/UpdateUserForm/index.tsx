import { AiOutlineSend } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Select from 'react-select';
import useUserModal from "../../../../../hooks/useUserModal";
import { UpdateUserFormData, updateUserSchema } from "../../../../../actions/users/schemas";
import { useEffect, useState } from "react";
import { IUserEntity } from "../../../../../actions/users/types";

export interface IOptions {
    value?: 'TEACHER' | 'COORDINATOR' | 'STUDENT';
    label: string;
}

export interface IUpdateUserForm {
    handleActionUpdateUser: (userId: number, userData: UpdateUserFormData) => Promise<IUserEntity | null>;
    handleActionGetUserById: (userId: number) => Promise<IUserEntity | null>;
}

const userTypeOptions: IOptions[] = [
    { value: 'TEACHER', label: 'Professor' },
    { value: 'COORDINATOR', label: 'Coordenador' },
    { value: 'STUDENT', label: 'Estudante' },
];

const UpdateUserForm: React.FC<IUpdateUserForm> = ({
    handleActionUpdateUser,
    handleActionGetUserById,
}) => {
    const { onClose, userId, actionPanelStatus } = useUserModal();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserSchema),
    });

    // Estado local para o valor do Select
    const [selectedUserType, setSelectedUserType] = useState<IOptions | null>(null);

    // Atualiza os campos do formulário com os dados do usuário
    useEffect(() => {
        if (userId && actionPanelStatus === "EDIT") {
            const fetchUserData = async () => {
                try {
                    const userData = await handleActionGetUserById(userId);
                    if (userData) {
                        reset({
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            userType: userData.userType, // Isso atualiza o valor no form
                        });

                        // Encontrar a opção correspondente no `userTypeOptions`
                        const matchedUserType = userTypeOptions.find(option => option.value === userData.userType);
                        
                        // Setando o valor do Select
                        setSelectedUserType(matchedUserType || null);
                    }
                } catch (error) {
                    console.error("Erro ao buscar os dados do usuário:", error);
                    toast.error("Erro ao carregar os dados do usuário.");
                }
            };

            fetchUserData();
        }
    }, [userId, actionPanelStatus, reset, handleActionGetUserById]);

    const onSubmit = async (data: UpdateUserFormData) => {
        try {
            if (!userId) return toast.error("Não foi possível associar a ação a um usuário");

            await handleActionUpdateUser(userId, data);
            onClose();

            toast.success(`A atualização do usuário foi bem-sucedida!`);
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro ao processar a solicitação.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-lg">
            <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                    id="firstName"
                    type="text"
                    {...register('firstName')}
                    className={`mt-1 block w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
            </div>

            <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Sobrenome</label>
                <input
                    id="lastName"
                    type="text"
                    {...register('lastName')}
                    className={`mt-1 block w-full p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
            </div>

            <div>
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700">Tipo de Usuário</label>
                <Select
                    options={userTypeOptions}
                    className="mt-1"
                    onChange={(selectedOption) => {
                        setValue('userType', selectedOption?.value || undefined); // Atualiza o valor no formulário
                        setSelectedUserType(selectedOption); // Atualiza o estado local para renderizar o valor selecionado
                    }}
                    value={selectedUserType} // Valor selecionado
                    isClearable
                    styles={{
                        control: (base) => ({
                            ...base,
                            borderColor: errors.userType ? 'red' : base.borderColor,
                        }),
                    }}
                />
                {errors.userType && <span className="text-red-500 text-sm">{errors.userType.message}</span>}
            </div>

            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <AiOutlineSend className="mr-2" />
                Atualizar Usuário
            </button>
        </form>
    );
};

export default UpdateUserForm;
