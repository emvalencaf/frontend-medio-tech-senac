"use client";
// hooks
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useClassModal from '../../../../../hooks/useAnnouncementModal';

// components
import Select from 'react-select';
import toast from 'react-hot-toast';

// icons
import { AiOutlineSend } from 'react-icons/ai';
import { AiOutlineUser, AiOutlineFileText } from 'react-icons/ai'; // Ícones para os campos

// schemas and types
import { ClassFormData, classSchema } from '../../../../../actions/classes/schemas';
import { IClassEntity } from '../../../../../actions/classes/types';
import { IClassEntity } from '../../../../../actions/classes/types';
import { useSession } from 'next-auth/react';

export interface IClassOptions {
    value: number;
    label: string;
}

// interfaces
export interface IClassForm {
    handleActionCreate: (data: ClassFormData) => Promise<IClassEntity | null>;
    handleActionGetClassOptions: (authorId: number) => Promise<IClassEntity[] | null>;
}

const ClassForm: React.FC<IClassForm> = ({
    handleActionCreate,
    handleActionGetClassOptions,
}) => {
    const session = useSession();

    const authorId = Number(session.data?.user?.id);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ClassFormData>({
        resolver: zodResolver(classSchema),
    });

    const { onClose } = useClassModal();

    // const [authorId, setAuthorId] = useState(session.data?.user?.id);// will change with authentication
    const [classOptions, setClassOptions] = useState<IClassOptions[]>([]);
    const [loadingClassOptions, setLoadingClassOptions] = useState(true);
    const [errorClassOptions, setErrorClassOptions] = useState<string | null>(null);

    useEffect(() => {
        const fetchClasses = async () => {
            setLoadingClassOptions(true);
            setErrorClassOptions(null);
            try {
                const data = await handleActionGetClassOptions(authorId);

                if (!data)
                    return setClassOptions([]);

                const options = data.map((classItem: { id: number; name: string }) => ({
                    value: classItem.id,
                    label: classItem.name,
                }));
                setClassOptions(options);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setErrorClassOptions('Failed to fetch classes');
            } finally {
                setLoadingClassOptions(false);
            }
        };

        if (authorId) {
            fetchClasses();
        }
    }, [authorId, handleActionGetClassOptions]);

    const onSubmit = async (data: ClassFormData) => {
        try {
            const res = await handleActionCreate(data);
            console.log('Form data:', res);
            onClose();
            // toast.success('Class created successfully!');
            window.location.reload();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            const errorsMsg = error.message;
            if (Array.isArray(errorsMsg)) {
                errorsMsg.forEach((msg) => {
                    toast.error(msg);
                });
            } else {
                toast.error('Failed to create announcement.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-lg">
            {/* Campo de Título */}
            <div>
                <label htmlFor="title" className="flex items-center text-sm font-medium text-gray-700">
                    <AiOutlineUser className="mr-2 text-gray-500" /> Nome
                </label>
                <input
                    id="title"
                    type="text"
                    {...register('name')}
                    className={`mt-1 block w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div>
                <label htmlFor="title" className="flex items-center text-sm font-medium text-gray-700">
                    <AiOutlineUser className="mr-2 text-gray-500" /> Ano
                </label>
                <input
                    id="title"
                    type="text"
                    {...register('year')}
                    className={`mt-1 block w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.year && <span className="text-red-500 text-sm">{errors.year.message}</span>}
            </div>

            <div>
                <label htmlFor="title" className="flex items-center text-sm font-medium text-gray-700">
                    <AiOutlineUser className="mr-2 text-gray-500" /> Semestre
                </label>
                <input
                    id="title"
                    type="text"
                    {...register('name')}
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
