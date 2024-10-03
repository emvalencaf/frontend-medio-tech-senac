'use client';

// hooks
import useClassModal from '../../../hooks/useClassModal';

// components
import Modal from '../Modal';
import ClassForm from './components/ClassForm';

// types
import { IHandleActionClass } from '../../../types/class';
import ActionPanel from './components/ActionPanel';
import { useEffect, useState } from 'react';
import { ClassFormData } from '../../../actions/classes/schemas';
import CurriculumGrid from './components/CurriculumGrid';
import { ITeacherEntity } from '../../../actions/teachers/types';
import { ISubjectEntity } from '../../../actions/subjects/types';
import TeachingAssignmentForm from './components/TeachingAssignmentForm';
import { TeachingAssignmentFormData, TeachingAssignmentFormDataPartialUpdate } from '../../../actions/coordinators/schemas';
import { IResponseAddStudentForm, ITeachingAssignmentEntity } from '../../../actions/coordinators/types';
import { IStudentEntity } from '../../../actions/students/types';
import AddRemoveStudentForm from './components/AddRemoveStudentForm';

export interface IClassModal {
    handleActions: IHandleActionClass;
    handleActionDeleteTeachingAssignmentById: (teachingAssignmentId: number) => Promise<void>;
    handleActionGetAllTeachers: (showRels?: boolean) =>Promise<ITeacherEntity[] | null>;
    handleActionsGetAllSubjects: (classId?: number) => Promise<ISubjectEntity[] | null>;
    handleActionCreateTeachingAssignment: (classId: number, data: TeachingAssignmentFormData) => Promise<ITeachingAssignmentEntity | null>;
    handleActionPartialUpdateTeachingAssignment: (teachingAssignmentId: number, data: TeachingAssignmentFormDataPartialUpdate) => Promise<ITeachingAssignmentEntity | null>;
    handleActionGetTeachingAssignmentById: (teachingAssignmentId: number) => Promise<ITeachingAssignmentEntity | null>;
    handleActionGetAllStudents: (showRels?: boolean, excludeStudentsWithinClass?: boolean, onlyStudentWithClassId?: number) => Promise<IStudentEntity[] | null>;
    handleActionAddStudentToClass: (studentId: number, classId: number) => Promise<IResponseAddStudentForm | null>;handleActionRemoveStudentFromClass: (studentId: number, classId: number) => Promise<IResponseAddStudentForm | null>;
}

const ClassModal: React.FC<IClassModal> = ({
    handleActions,
    handleActionAddStudentToClass,
    handleActionDeleteTeachingAssignmentById,
    handleActionGetTeachingAssignmentById,
    handleActionCreateTeachingAssignment,
    handleActionPartialUpdateTeachingAssignment,
    handleActionGetAllTeachers,
    handleActionGetAllStudents,
    handleActionsGetAllSubjects,
    handleActionRemoveStudentFromClass
}) => {
    const { isOpen, onClose, typeClassModal, actionPanelStatus, classId } = useClassModal();
    const { handleActionCreate, handleActionPartialUpdate, handleActionGetById, handleActionDeleteById } = handleActions;
    const [classValues, setClassValues] = useState<ClassFormData>();

    const title = typeClassModal === 'CREATE_CLASS' ? 'Adicione Turma' : (typeClassModal === "ACTION_CLASS" ? "ALTERE/DELETE TURMA" : 'GRADE CURRICULAR DA TURMA');

    const subtitle = typeClassModal === 'CREATE_CLASS' ? 'Adicione uma turma' : (typeClassModal === "ACTION_CLASS" ? "Altere ou delete uma turma" : 'Veja os professores responsáveis pelas disciplinas');

    useEffect(() => {
        if (actionPanelStatus === 'EDIT') {
            const fn = async () => {
                const res = await handleActionGetById(Number(classId));
                if (!res)
                    return;
                setClassValues({
                    name: res.name,
                    year: res.year,
                    semester: res.semester,
                });
            }

            fn();
        }
    }, [actionPanelStatus, typeClassModal, isOpen, classId, handleActionGetById]);

    return (
        <Modal title={title} subtitle={subtitle} onClose={onClose} isOpen={isOpen}>
            {/* FORM TO CREATE CLASS */}
            {
                typeClassModal === 'CREATE_CLASS' && (
                    <ClassForm handleActionCreate={handleActionCreate} />
                )
            }
            {
                (typeClassModal === 'ACTION_CLASS' && actionPanelStatus === "ASSOCIATE_CLASS") && (
                    <TeachingAssignmentForm
                        handleActionGetAllTeachers={handleActionGetAllTeachers}
                        handleActionsGetAllSubjects={handleActionsGetAllSubjects}
                        handleActionCreateTeachingAssignment={handleActionCreateTeachingAssignment}
                        handleActionPartialUpdateTeachingAssignment={handleActionPartialUpdateTeachingAssignment}
                        classId={classId}
                        handleActionGetTeachingAssignmentById={handleActionGetTeachingAssignmentById}
                    />
                ) 
            }
            {/* ACTION PANEL OF CLASS */}

            {
                (typeClassModal === 'ACTION_CLASS' && actionPanelStatus === 'PANEL') && (
                    <ActionPanel handleActionDeleteById={handleActionDeleteById} />
                )
            }
            {/* FORM TO EDIT CLASS */}
            {
                (typeClassModal === 'ACTION_CLASS' && actionPanelStatus === 'EDIT') && (
                    <ClassForm handleActionPartialUpdate={handleActionPartialUpdate} isCreate={false} classId={classId} initialValues={classValues} />
                )
            }

            {/* FORM TO ADD STUDENT */}

            {
                (typeClassModal === 'ACTION_CLASS' && (actionPanelStatus === 'ADD_STUDENT' || actionPanelStatus === "REMOVE_STUDENT")) && (
                    <AddRemoveStudentForm
                        handleActionAddStudentToClass={handleActionAddStudentToClass}
                        handleActionGetAllStudents={handleActionGetAllStudents}
                        handleActionRemoveStudentFromClass={handleActionRemoveStudentFromClass}
                    />
                )
            }
            
            {/* TO VIEW CLASS SUBJECTS */}
            {
                (typeClassModal === "VIEW_CLASS_SUBJECTS") && (
                    <CurriculumGrid handleActionGetById={handleActionGetById} handleActionDeleteTeachingAssignmentById={handleActionDeleteTeachingAssignmentById} />
                )
            }
        </Modal>
    );
};

export default ClassModal;
