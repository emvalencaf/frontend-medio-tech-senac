"use client";
// hooks
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAnnouncementModal from '../../../../../hooks/useAnnouncementModal';

// components
import Select from 'react-select';
import toast from 'react-hot-toast';

// icons
import { AiOutlineSend } from 'react-icons/ai';
import { AiOutlineUser, AiOutlineFileText } from 'react-icons/ai'; // Ícones para os campos

// schemas and types
import { AnnouncementFormData, announcementSchema } from '../../../../../actions/announcements/schemas';
import { IAnnouncementEntity } from '../../../../../actions/announcements/types';
import { IClassEntity, IGetClassesResponse } from '../../../../../actions/classes/types';

export interface IClassOptions {
    value: number;
    label: string;
}

// interfaces
export interface IAnnouncementForm {
    handleActionCreate: (data: AnnouncementFormData) => Promise<IAnnouncementEntity | null>;
    handleActionGetClassOptions: () => Promise<IGetClassesResponse | null>;
    handleActionGetClassOptionsForTeachers: (authorId: number) => Promise<IClassEntity[] | null>;
}

const AnnouncementForm: React.FC<IAnnouncementForm> = ({
    handleActionCreate,
    handleActionGetClassOptions,
    handleActionGetClassOptionsForTeachers,
}) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<AnnouncementFormData>({
        resolver: zodResolver(announcementSchema),
    });

    const { onClose, userId, userType } = useAnnouncementModal();

    const [classOptions, setClassOptions] = useState<IClassOptions[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loadingClassOptions, setLoadingClassOptions] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorClassOptions, setErrorClassOptions] = useState<string | null>(null);

    console.log('in announcement form: ', userId, userType);

    useEffect(() => {
        console.log("useEffect is running", userType, userId);
        
        const fetchClasses = async () => {
            setLoadingClassOptions(true);
            setErrorClassOptions(null);
            try {
                let data: IClassEntity[] = [];
                console.log('bora, man');
                if (userType === 'COORDINATOR') {
                    console.log("bora bill")
                    const res = await handleActionGetClassOptions();
                    console.log('in coordinator if, the response was: ', res);
    
                    if (!res || !res.data) return setClassOptions([]);
    
                    data = res.data;
                    console.log('in coordinator if, the data fetched was: ', data);
                } else if (userType === 'TEACHER') {
                    console.log('bora bill, aqui teacher');
                    const res = await handleActionGetClassOptionsForTeachers(Number(userId));
                    console.log('in teacher if, the response was:', res);
    
                    if (!res) return setClassOptions([]);
    
                    data = res;
                    console.log('in teacher if, data fetched was: ', data);
                }
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
    
        if (userType && userId) {
            fetchClasses();
        } else {
            console.log("userType or userId is missing");
        }
    }, [handleActionGetClassOptions, handleActionGetClassOptionsForTeachers, userId, userType]);
    
    const onSubmit = async (data: AnnouncementFormData) => {
        try {
            const res = await handleActionCreate(data);
            console.log('Form data:', res);
            onClose();
            // toast.success('Announcement created successfully!');
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
                    <AiOutlineUser className="mr-2 text-gray-500" /> Título
                </label>
                <input
                    id="title"
                    type="text"
                    {...register('title')}
                    className={`mt-1 block w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
            </div>

            {/* Campo de Conteúdo */}
            <div>
                <label htmlFor="content" className="flex items-center text-sm font-medium text-gray-700">
                    <AiOutlineFileText className="mr-2 text-gray-500" /> Conteúdo
                </label>
                <textarea
                    id="content"
                    rows={4}
                    {...register('content')}
                    className={`mt-1 block w-full border p-2 resize-none min-h-200 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.content ? 'border-red-500' : ''}`}
                />
                {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
            </div>

            {/* Campo de Classes (Select Multi) */}
            <div>
                <label htmlFor="classes" className="block text-sm font-medium text-gray-700">Classes</label>
                <Select
                    isMulti
                    options={classOptions}
                    className="mt-1"
                    onChange={(selectedOptions) => setValue('classes', selectedOptions.map(option => option.value))}
                    styles={{
                        control: (base) => ({
                            ...base,
                            borderColor: errors.classes ? 'red' : base.borderColor,
                        }),
                    }}
                />
                {errors.classes && <span className="text-red-500 text-sm">{errors.classes.message}</span>}
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

export default AnnouncementForm;
