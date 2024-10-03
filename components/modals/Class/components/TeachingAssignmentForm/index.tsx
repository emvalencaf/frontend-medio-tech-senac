import { AiOutlineSend } from "react-icons/ai";
import useClassModal from "../../../../../hooks/useClassModal";
import { useForm } from "react-hook-form";
import { partialUpdateTeachingAssignmentSchema, TeachingAssignmentFormData, TeachingAssignmentFormDataPartialUpdate, teachingAssignmentSchema } from "../../../../../actions/coordinators/schemas";
import { ITeachingAssignmentEntity } from "../../../../../actions/coordinators/types";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ITeacherEntity } from "../../../../../actions/teachers/types";
import { ISubjectEntity } from "../../../../../actions/subjects/types";
import { useEffect, useState } from "react";
import Select from 'react-select';

export interface IOptions {
    value: number;
    label: string;
}

export interface ITeachingAssignmentForm {
    handleActionCreateTeachingAssignment: (classId: number, data: TeachingAssignmentFormData) => Promise<ITeachingAssignmentEntity | null>;
    handleActionPartialUpdateTeachingAssignment: (assignmentTeachingId: number, data: TeachingAssignmentFormDataPartialUpdate) => Promise<ITeachingAssignmentEntity | null>;
    handleActionGetTeachingAssignmentById: (teachingAssignmentId: number) => Promise<ITeachingAssignmentEntity | null>;
    handleActionGetAllTeachers: (showRels?: boolean) => Promise<ITeacherEntity[] | null>;
    handleActionsGetAllSubjects: () => Promise<ISubjectEntity[] | null>;
    isCreate?: boolean;
    initialValues?: Partial<TeachingAssignmentFormData>;
    classId?: number;
}

const TeachingAssignmentForm: React.FC<ITeachingAssignmentForm> = ({
    handleActionCreateTeachingAssignment,
    handleActionPartialUpdateTeachingAssignment,
    handleActionGetAllTeachers,
    handleActionsGetAllSubjects,
    handleActionGetTeachingAssignmentById,
    classId,
}) => {
    const { onClose, teachingAssignmentId } = useClassModal();
    const [isCreate, setIsCreate] = useState<boolean>(true);
    
    const [selectedTeacherOption, setSelectedTeacherOption] = useState<IOptions>();
    const [selectedSubjectOption, setSelectedSubjectOption] = useState<IOptions>();

    const [subjectOptions, setSubjectOptions] = useState<IOptions[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loadingSubjectOptions, setLoadingSubjectOptions] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorSubjectOptions, setErrorSubjectOptions] = useState<string | null>(null);

    const [teacherOptions, setTeacherOptions] = useState<IOptions[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loadingTeacherOptions, setLoadingTeacherOptions] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorTeacherOptions, setErrorTeacherOptions] = useState<string | null>(null);

    const schema = isCreate ? teachingAssignmentSchema : partialUpdateTeachingAssignmentSchema;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<TeachingAssignmentFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            subjectId: selectedSubjectOption?.value,
            teacherId: selectedTeacherOption?.value,
        },
    });


    useEffect(() => {
        setIsCreate(!teachingAssignmentId); // true se teachingAssignmentId for falsy (novo), false se for truthy (edição)
        
        const fetchAssignmentTeaching = async (id: number) => {
            const res = await handleActionGetTeachingAssignmentById(id);

            if (!res || !res.subject || !res.teacher)
                return;

            setSelectedSubjectOption({
                value: res.subjectId,
                label: res.subject?.name,
            })

            setSelectedTeacherOption({
                value: res.teacherId,
                label: res.teacher.firstName + ' ' + res.teacher.lastName,
            })
        }
        
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        teachingAssignmentId && fetchAssignmentTeaching(teachingAssignmentId);

    }, [teachingAssignmentId]);
    

    useEffect(() => {
        const fetchSubjectsAndTeachers = async (isTeacherOptions: boolean) => {

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            isTeacherOptions ?
                setLoadingTeacherOptions(true)
                : setLoadingSubjectOptions(true);

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            isTeacherOptions ?
                setErrorTeacherOptions(null)
                : setErrorSubjectOptions(null);

            try {
                const data = await (isTeacherOptions ? handleActionGetAllTeachers : handleActionsGetAllSubjects)();

                if (!data)
                    return isTeacherOptions ? setTeacherOptions([]) : setSubjectOptions([]);

                const options = data.map((dataItem) => ({
                    value: dataItem.id,
                    label: isTeacherOptions ? (dataItem as ITeacherEntity).firstName + ' ' + (dataItem as ITeacherEntity).lastName : (dataItem as ISubjectEntity).name,
                }));

                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                isTeacherOptions ? setTeacherOptions(options) : setSubjectOptions(options);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                isTeacherOptions ? setErrorTeacherOptions('Failed to fetch teachers') : setErrorSubjectOptions('Failed to fetch subjects');
            } finally {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                isTeacherOptions ? setLoadingTeacherOptions(false) : setLoadingSubjectOptions(false);
            }
        };

        fetchSubjectsAndTeachers(true); // first fetch teachers options
        fetchSubjectsAndTeachers(false); // then fetch subjects options
    }, [handleActionsGetAllSubjects, handleActionGetAllTeachers]);

    const onSubmit = async (data: TeachingAssignmentFormData) => {
        try {
            console.log(data);
            console.log('in onSubmit: ',isCreate);

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            isCreate ?
                await handleActionCreateTeachingAssignment(Number(classId), data) :
                await handleActionPartialUpdateTeachingAssignment(Number(teachingAssignmentId), data);

            onClose();

            toast.success(`A atribuição de matéria a grade curricular da turma foi bem-sucedida!`);

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
                toast.error(`A atribuição de matéria a grade curricular da turma falhou.`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-lg">
            <div>
                <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700">Selecione um Professor</label>
                <Select
                    options={teacherOptions}
                    value={selectedTeacherOption}
                    className="mt-1"
                    onChange={(selectedOption) => setValue('teacherId', selectedOption ? selectedOption.value: 0)} // Mapeia a seleção para o valor do teacherId
                    styles={{
                        control: (base) => ({
                            ...base,
                            borderColor: errors.teacherId ? 'red' : base.borderColor,
                        }),
                    }}
                />
                {errors.teacherId && <span className="text-red-500 text-sm">{errors.teacherId.message}</span>}
            </div>

            <div>
                <label htmlFor="subjectId" className="block text-sm font-medium text-gray-700">Selecione uma matéria:</label>
                <Select
                    options={subjectOptions}
                    value={selectedSubjectOption}
                    className="mt-1"
                    onChange={(selectedOption) => setValue('subjectId', selectedOption ? selectedOption.value: 0)} // Mapeia a seleção para o valor do teacherId
                    styles={{
                        control: (base) => ({
                            ...base,
                            borderColor: errors.teacherId ? 'red' : base.borderColor,
                        }),
                    }}
                />
                {errors.subjectId && <span className="text-red-500 text-sm">{errors.subjectId.message}</span>}
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

export default TeachingAssignmentForm;