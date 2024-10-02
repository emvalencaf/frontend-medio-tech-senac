"use client";

// hooks
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useClassModal from '../../../../../hooks/useAnnouncementModal';

// components
import toast from 'react-hot-toast';

// icons
import { AiOutlineSend } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai'; // Ícones para os campos

// schemas and types
import { ClassFormData, classSchema } from '../../../../../actions/classes/schemas';
import { IClassEntity } from '../../../../../actions/classes/types';



// interfaces
export interface IClassForm {
    handleActionCreate: (data: ClassFormData) => Promise<IClassEntity | null>;
}

const ClassForm: React.FC<IClassForm> = ({
    handleActionCreate,
}) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ClassFormData>({
        resolver: zodResolver(classSchema),
    });

    const { onClose } = useClassModal();

    const onSubmit = async (data: ClassFormData) => {
        try {
            const res = await handleActionCreate(data);
            console.log('Form data:', res);
            onClose();
            toast.success('Class created successfully!');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            const errorsMsg = error.message;
            if (Array.isArray(errorsMsg)) {
                errorsMsg.forEach((msg) => {
                    toast.error(msg);
                });
            } else {
                toast.error('Failed to create class.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-lg">
            {/* Campo de Título */}
            <div>
                <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
                    <AiOutlineUser className="mr-2 text-gray-500" /> Nome
                </label>
                <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className={`mt-1 block w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div>
                <label htmlFor="year" className="flex items-center text-sm font-medium text-gray-700">
                    <AiOutlineUser className="mr-2 text-gray-500" /> Ano
                </label>
                <input
                    id="year"
                    type="number"
                    max={3}
                    min={1}
                    {...register('year')}
                    className={`mt-1 block w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.year && <span className="text-red-500 text-sm">{errors.year.message}</span>}
            </div>

            <div>
                <label htmlFor="semester" className="flex items-center text-sm font-medium text-gray-700">
                    <AiOutlineUser className="mr-2 text-gray-500" /> Semestre
                </label>
                <input
                    id="semester"
                    type="number"
                    max={2}
                    min={1}
                    {...register('semester')}
                    className={`mt-1 block w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.semester && <span className="text-red-500 text-sm">{errors.semester.message}</span>}
            </div>

            {/* Botão de Enviar */}
            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <AiOutlineSend className="mr-2" />
                Enviar
            </button>
        </form>
    );
};

export default ClassForm;
