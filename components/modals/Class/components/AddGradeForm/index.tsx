import { AiOutlineSend } from "react-icons/ai";
import useClassModal from "../../../../../hooks/useClassModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Select from 'react-select';
import { IStudentEntity } from "../../../../../actions/students/types";
import { createGradeSchema, IGradeDataForm } from "../../../../../actions/grades/schemas";
import { IGradeEntity } from "../../../../../actions/grades/types";
import { MdGrade } from "react-icons/md";

export interface IOptions {
    value: number;
    label: string;
}

export interface IAddGradeForm {
    handleActionGetAllStudents: (showRels?: boolean, excludeStudentsWithinClass?: boolean, onlyStudentWithClassId?: number, onlyStudentWithTeachingAssignmentId?: number) => Promise<IStudentEntity[] | null>;
    handleActionCreateGrade: (assignmentId: number, gradeDTO: IGradeDataForm) => Promise<IGradeEntity>;
}

const AddGradeForm: React.FC<IAddGradeForm> = ({
    handleActionGetAllStudents,
    handleActionCreateGrade,
}) => {
    const { onClose, teachingAssignmentId, actionPanelStatus } = useClassModal();

    const [studentOptions, setStudentOptions] = useState<IOptions[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loadingStudentOptions, setLoadingStudentOptions] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorStudentOptions, setErrorStudentOptions] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IGradeDataForm>({
        resolver: zodResolver(createGradeSchema),
        defaultValues: {},
    });


    useEffect(() => {
        const fetchStudents = async () => {

            setLoadingStudentOptions(true);

            try {
                const data = await handleActionGetAllStudents(undefined, undefined, undefined, teachingAssignmentId);

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
    }, [actionPanelStatus, teachingAssignmentId, handleActionGetAllStudents]);

    const onSubmit = async (data: IGradeDataForm) => {
        try {
            if (!teachingAssignmentId)
                return toast.error('Turma não foi encontrada, tente de novo');

            await handleActionCreateGrade(teachingAssignmentId, data);

            onClose();

            toast.success(`${actionPanelStatus === 'CREATE_GRADE' ? 'O lançamento da nota' : 'A atualização da nota'} do aluno foi bem-sucedida!`);

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
                toast.error(`Não foi possível lançar a nota do estudante.`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-lg">
            <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Selecione um aluno</label>
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
            <div>
                <label htmlFor="avaliation" className="flex items-center text-sm font-medium text-gray-700">
                    <MdGrade className="mr-2 text-gray-500" /> Avaliação
                </label>
                <input
                    id="avaliation"
                    type="number"
                    max={3}
                    min={1}
                    {...register('avaliation')}
                    className={`mt-1 block w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.avaliation ? 'border-red-500' : ''}`}
                />
                {errors.avaliation && <span className="text-red-500 text-sm">{errors.avaliation.message}</span>}
            </div>
            <div>
                <label htmlFor="grade" className="flex items-center text-sm font-medium text-gray-700">
                    <MdGrade className="mr-2 text-gray-500" />Nota (Menção)
                </label>
                <input
                    id="grade"
                    type="text"
                    {...register('grade')}
                    className={`mt-1 block w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.grade ? 'border-red-500' : ''}`}
                />
                {errors.grade && <span className="text-red-500 text-sm">{errors.grade.message}</span>}
            </div>
            <div>
                <label htmlFor="score" className="flex items-center text-sm font-medium text-gray-700">
                    <MdGrade className="mr-2 text-gray-500" />Nota Numérica
                </label>
                <input
                    id="score"
                    type="number"
                    max={10}
                    min={0}
                    step={0.01}
                    {...register('score')}
                    className={`mt-1 block w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.score ? 'border-red-500' : ''}`}
                />
                {errors.score && <span className="text-red-500 text-sm">{errors.score.message}</span>}
            </div>
            {/* Botão de Enviar */}
            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <AiOutlineSend className="mr-2" />
                Lançar Nota
            </button>
        </form>
    );
}

export default AddGradeForm;