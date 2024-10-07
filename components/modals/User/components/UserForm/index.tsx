import { AiOutlineSend } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Select from 'react-select';
import useUserModal from "../../../../../hooks/useUserModal";
import { signUpSchema, UserFormData } from "../../../../../actions/auth/schemas";
import { IUserEntity } from "../../../../../actions/users/types";


export interface IOptions {
    value: 'TEACHER' | 'COORDINATOR' | 'STUDENT';
    label: string;
}

export interface IUserForm {
    handleActionCreateUser: (userData: UserFormData) => Promise<IUserEntity | null>;
}

const userTypeOptions: IOptions[] = [
    { value: 'TEACHER', label: 'Professor' },
    { value: 'COORDINATOR', label: 'Coordenador' },
    { value: 'STUDENT', label: 'Estudante' },
];

const UserForm: React.FC<IUserForm> = ({
    handleActionCreateUser,
}) => {
    const { onClose, actionPanelStatus } = useUserModal();
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserFormData>({
        resolver: zodResolver(signUpSchema), // Usa schema baseado na ação
    });


    const onSubmit = async (data: UserFormData) => {
        try {
            await handleActionCreateUser(data);

            onClose();
            toast.success(`A ${actionPanelStatus === "EDIT" ? "atualização" : "criação"} do usuário foi bem-sucedida!`);
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`mt-1 block w-full p-2 border ${errors?.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors?.email && <span className="text-red-500 text-sm">{errors?.email?.message}</span>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                <input
                    id="password"
                    type="password"
                    {...register('password')}
                    className={`mt-1 block w-full p-2 border ${errors?.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors?.password && <span className="text-red-500 text-sm">{errors?.password?.message}</span>}
            </div>

            <div>
                <label htmlFor="confirmedPassword" className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
                <input
                    id="confirmedPassword"
                    type="password"
                    {...register('confirmedPassword')}
                    className={`mt-1 block w-full p-2 border ${errors.confirmedPassword ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors?.confirmedPassword && <span className="text-red-500 text-sm">{errors.confirmedPassword.message}</span>}
            </div>


            <div>
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700">Tipo de Usuário</label>
                <Select
                    options={userTypeOptions}
                    className="mt-1"
                    onChange={(selectedOption) => setValue('userType', selectedOption?.value || 'STUDENT')}
                    value={userTypeOptions.find(option => option.value === watch('userType'))}
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
                {actionPanelStatus === "EDIT" ? "Atualizar Usuário" : "Criar Usuário"}
            </button>
        </form>
    );
};

export default UserForm;
