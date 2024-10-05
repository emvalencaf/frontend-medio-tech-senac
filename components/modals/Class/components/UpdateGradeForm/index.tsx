import { AiOutlineSend } from "react-icons/ai";
import useClassModal from "../../../../../hooks/useClassModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Select from 'react-select';
import { IStudentEntity } from "../../../../../actions/students/types";
import { createGradeSchema, IGradeDataForm, IUpdateGradeDataForm, updateGradeSchema } from "../../../../../actions/grades/schemas";
import { IGradeEntity } from "../../../../../actions/grades/types";
import { MdGrade } from "react-icons/md";

export interface IOptions {
    value: number;
    label: string;
}

export interface IUpdateGradeForm {
    handleActionGetAllStudents: (showRels?: boolean, excludeStudentsWithinClass?: boolean, onlyStudentWithClassId?: number, onlyStudentWithTeachingAssignmentId?: number) => Promise<IStudentEntity[] | null>;
    handleActionUpdateGrade: (teachingAssignmentId: number, gradeDTO: IUpdateGradeDataForm) => Promise<IGradeEntity>;
    handleActionGetAllGradeByTeachingIdAndStudentId: (teachingAssignmentId: number, studentId: number) => Promise<IGradeEntity[]>;
}

const UpdateGradeForm: React.FC<IUpdateGradeForm> = ({
    handleActionGetAllStudents,
    handleActionUpdateGrade,
    handleActionGetAllGradeByTeachingIdAndStudentId,
}) => {
    const { onClose, teachingAssignmentId, actionPanelStatus } = useClassModal();

    const [studentOptions, setStudentOptions] = useState<IOptions[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loadingStudentOptions, setLoadingStudentOptions] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorStudentOptions, setErrorStudentOptions] = useState<string | null>(null);

    const [grades, setGrades] = useState<IGradeEntity[]>([]);
    const [gradeOptions, setGradeOptions] = useState<IOptions[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loadingGradeOptions, setLoadingGradeOptions] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorGradeOptions, setErrorGradeOptions] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { register, handleSubmit, formState: { errors }, setValue, getValues, resetField } = useForm<IUpdateGradeDataForm>({
        resolver: zodResolver(updateGradeSchema),
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

    const onChangeStudentId = async () => {

        setLoadingGradeOptions(true);

        try {
            const studentId = getValues("studentId");
            const data = await handleActionGetAllGradeByTeachingIdAndStudentId(Number(teachingAssignmentId), studentId);

            if (!data)
                return setGradeOptions([]);

            const options = data.map((dataItem) => ({
                value: dataItem.id,
                label: `código da nota ${dataItem.id}: ${dataItem.avaliation}`,
            }));

            setGrades(data);
            setGradeOptions(options);
            resetField('gradeId');
            resetField('grade');
            resetField('avaliation');
            resetField('score');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.log(err);
            setErrorGradeOptions('Failed to fetch grades');
        } finally {
            setLoadingGradeOptions(false);
        }
    }
    const onChangeGradeId = async () => {

        const grade = grades.filter((grade) => grade.id === getValues('gradeId'))[0];
        setValue('grade', grade.grade);
        setValue('avaliation', grade.avaliation);
        setValue('score', grade.score);
    }
    
    const onSubmit = async (data: IUpdateGradeDataForm) => {
        try {
            if (!teachingAssignmentId)
                return toast.error('Turma não foi encontrada, tente de novo');


            await handleActionUpdateGrade(teachingAssignmentId, data);

            onClose();

            toast.success(`A atualização da nota do aluno foi bem-sucedida!`);

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
                toast.error(`Não foi possível editar a nota do estudante.`);
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
                    onChange={(selectedOption) => {
                        setValue('studentId', selectedOption ? selectedOption.value : 0)
                        onChangeStudentId();
                    }} // Mapeia a seleção para o valor do teacherId
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
                <label htmlFor="gradeId" className="block text-sm font-medium text-gray-700">Selecione uma avaliação</label>
                <Select
                    options={gradeOptions}
                    className="mt-1"
                    onChange={(selectedOption) => {
                        setValue('gradeId', selectedOption ? selectedOption.value : 0)
                        onChangeGradeId();
                    }} // Mapeia a seleção para o valor do 
                    styles={{
                        control: (base) => ({
                            ...base,
                            borderColor: errors.gradeId ? 'red' : base.borderColor,
                        }),
                    }}
                />
                {errors.gradeId && <span className="text-red-500 text-sm">{errors.gradeId.message}</span>}
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
                Editar Nota
            </button>
        </form>
    );
}

export default UpdateGradeForm;