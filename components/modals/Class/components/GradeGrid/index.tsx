import { useEffect, useState } from "react";
import { extractUserIdFromBackEndToken, extractUserTypeFromBackEndToken } from "../../../../../utils";
import { useSession } from "next-auth/react";
import useClassModal from "../../../../../hooks/useClassModal";
import { IGradeEntity } from "../../../../../actions/grades/types";
import GradeItem from "./GradeItem";

export interface IGradesGrid {
    handleActionGetAllGradeByTeachingIdAndStudentId:  (teachingAssignmentId: number, studentId: number) => Promise<IGradeEntity[]>;
    handleActionDeleteGrade: (gradeId: number) => Promise<void>;
}

const GradesGrid: React.FC<IGradesGrid> = ({ handleActionGetAllGradeByTeachingIdAndStudentId, handleActionDeleteGrade }) => {
    const session = useSession();
    
    const userType = extractUserTypeFromBackEndToken(String(session.data?.backendToken));
    const userId = extractUserIdFromBackEndToken(String(session.data?.backendToken));

    const [grades, setGrades] = useState<IGradeEntity[]>();
    const { teachingAssignmentId } = useClassModal();

    useEffect(() => {
        const fn = async () => {
            const res = await handleActionGetAllGradeByTeachingIdAndStudentId(Number(teachingAssignmentId), Number(userId));
            
            if (!res)
                return;

            setGrades(res);
        }

        fn();
    }, [handleActionGetAllGradeByTeachingIdAndStudentId, userId, teachingAssignmentId]);

    return (
        <div className="w-full h-full p-4">
            {/* Cabeçalho simulando as colunas da tabela */}
            <div className="flex justify-between bg-purple-600 text-white font-semibold py-2 px-4 rounded-t-md">
                {
                    userType === 'COORDINATOR' && (
                        <div className="w-1/4">ID</div>
                    )
                }
                <div className="w-1/4">Nº da Avaliação</div>
                <div className="w-1/4">Nota</div>
            </div>

            {/* Lista de itens com aparência de tabela */}
            <ul className="w-full">
                {grades && grades.map((grade) => (
                    <GradeItem
                        key={`teachingAssignment-${grade.id}`}
                        grade={grade}
                        handleActionDeleteGrade={handleActionDeleteGrade}
                    />
                ))}
            </ul>
        </div>
    );
}

export default GradesGrid;