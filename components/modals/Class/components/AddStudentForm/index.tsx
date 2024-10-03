import { AiOutlineSend } from "react-icons/ai";
import useClassModal from "../../../../../hooks/useClassModal";
import { useForm } from "react-hook-form";
import { AddStudentFormData, addStudentSchema } from "../../../../../actions/coordinators/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Select from 'react-select';
import { IStudentEntity } from "../../../../../actions/students/types";
import { IResponseAddStudentForm } from "../../../../../actions/coordinators/types";

export interface IOptions {
    value: number;
    label: string;
}

export interface IAddStudentForm {
    handleActionGetAllStudents: (showRels?: boolean) => Promise<IStudentEntity[] | null>;
    handleActionAddStudentToClass: (studentId: number, classId: number) => Promise<IResponseAddStudentForm | null>;
}

const AddStudentForm: React.FC<IAddStudentForm> = ({
    handleActionAddStudentToClass,
    handleActionGetAllStudents,
}) => {
    const { onClose, classId } = useClassModal();

    const [studentOptions, setStudentOptions] = useState<IOptions[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loadingStudentOptions, setLoadingStudentOptions] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorStudentOptions, setErrorStudentOptions] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<AddStudentFormData>({
        resolver: zodResolver(addStudentSchema),
        defaultValues: {},
    });


    useEffect(() => {
        const fetchStudents = async () => {

            setLoadingStudentOptions(true);

            try {
                const data = await handleActionGetAllStudents();

                if (!data)
                    return setStudentOptions([]);

                const options = data.map((dataItem) => ({
                    value: dataItem.id,
                    label: dataItem.firstName + ' ' + dataItem.lastName,
                }));

                setStudentOptions(options);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                console.log(err);
                setErrorStudentOptions('Failed to fetch students');
            } finally {
                setLoadingStudentOptions(false);
            }
        };

        fetchStudents();
    }, []);

    const onSubmit = async (data: AddStudentFormData) => {
        try {
            if (!classId)
                return toast.error('Turma não foi encontrada, tente de novo');

            await handleActionAddStudentToClass(data.studentId, classId);

            onClose();

            toast.success(`A adição do estudante a turma foi bem-sucedida!`);

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
                toast.error(`A adição do aluno a turma falhou.`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-lg">
            <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Aluno</label>
                <Select
                    options={studentOptions}
                    className="mt-1"
                    onChange={(selectedOption) => setValue('studentId', selectedOption ? selectedOption.value : 0)} // Mapeia a seleção para o valor do teacherId
                    styles={{
                        control: (base) => ({
                            ...base,
                            borderColor: errors.studentId ? 'red' : base.borderColor,
                        }),
                    }}
                />
                {errors.studentId && <span className="text-red-500 text-sm">{errors.studentId.message}</span>}
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
}

export default AddStudentForm;