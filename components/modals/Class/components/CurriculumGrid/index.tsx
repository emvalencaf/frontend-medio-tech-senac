import { useEffect, useState } from "react";
import useClassModal from "../../../../../hooks/useClassModal";
import { IClassEntity } from "../../../../../actions/classes/types";
import TeachingAssignment, { ITeachingAssignment } from "./TeachingAssignment";
import { useSession } from "next-auth/react";
import { extractUserTypeFromBackEndToken } from "../../../../../utils";


export interface ICurriculumGrid {
    handleActionGetById: (classId: number, showRels?: boolean) => Promise<IClassEntity | null>;
    handleActionDeleteTeachingAssignmentById: (teachingAssignmentId: number) => Promise<void>;
}

const CurriculumGrid: React.FC<ICurriculumGrid> = ({ handleActionGetById, handleActionDeleteTeachingAssignmentById, }) => {
    const session = useSession();
    
    const userType = extractUserTypeFromBackEndToken(String(session.data?.backendToken));

    const [teachingAssignments, setTeachingAssignments] = useState<ITeachingAssignment[]>();
    const { classId } = useClassModal();

    useEffect(() => {
        const fn = async () => {
            const res = await handleActionGetById(Number(classId), true);

            if (!res || !res.TeachingAssignment)
                return;

            const { TeachingAssignment: _teachingAssignments } = res;

            const curated: ITeachingAssignment[] = _teachingAssignments.map((el) => {
                return {
                    id: el.id,
                    teacher: {
                        id: el.teacherId,
                        name: el.teacher?.firstName + ' ' + el.teacher?.lastName,
                    },
                    subject: {
                        id: el.subjectId,
                        name: String(el?.subject?.name),
                    },
                }
            })

            setTeachingAssignments(curated);
        }

        fn();
    }, [classId, handleActionGetById]);

    return (
        <div className="w-full h-full p-4">
            {/* Cabeçalho simulando as colunas da tabela */}
            <div className="flex justify-between bg-purple-600 text-white font-semibold py-2 px-4 rounded-t-md">
                {
                    userType === 'COORDINATOR' && (
                        <div className="w-1/4">ID</div>
                    )
                }
                <div className="w-1/4">Disciplina</div>
                {
                    userType !== "TEACHER" && (
                        <div className="w-1/4">Professor</div>
                    )
                }
                <div className="w-1/4">Ação</div>
            </div>

            {/* Lista de itens com aparência de tabela */}
            <ul className="w-full">
                {teachingAssignments && teachingAssignments.map((teachingAssignment) => (
                    <TeachingAssignment
                        key={`teachingAssignment-${teachingAssignment.id}`}
                        teachingAssignment={teachingAssignment}
                        handleActionDeleteTeachingAssignmentById={handleActionDeleteTeachingAssignmentById}
                    />
                ))}
            </ul>
        </div>
    );
}

export default CurriculumGrid;