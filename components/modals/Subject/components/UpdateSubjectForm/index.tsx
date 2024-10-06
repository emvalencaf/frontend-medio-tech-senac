import { AiOutlineSend } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import useSubjectModal from "../../../../../hooks/useSubjectModal";
import { IUpdateSubjectFormData, updateSubjectSchema } from "../../../../../actions/subjects/schemas";
import { useEffect } from "react";
import { ISubjectEntity } from "../../../../../actions/subjects/types";

export interface IOptions {
    value: string;
    label: string;
}

export interface IUpdateSubjectForm {
    handleActionUpdateSubject: (userId: number, userData: IUpdateSubjectFormData) => Promise<ISubjectEntity | null>;
    handleActionGetSubjectById: (userId: number) => Promise<ISubjectEntity | null>;
}

const UpdateSubjectForm: React.FC<IUpdateSubjectForm> = ({
    handleActionUpdateSubject,
    handleActionGetSubjectById,
}) => {
    const { onClose, subjectId, actionPanelStatus } = useSubjectModal();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUpdateSubjectFormData>({
        resolver: zodResolver(updateSubjectSchema),
    });

    // Atualiza os campos do formulário com os dados do usuário
    useEffect(() => {
        if (subjectId && actionPanelStatus === 'EDIT') {
            const fetchSubjectData = async () => {
                try {
                    const subjectData = await handleActionGetSubjectById(subjectId);

                    if (subjectData)
                        reset({
                            name: subjectData.name,
                            description: subjectData.description
                        });
                } catch(err) {
                    console.error("Erro ao buscar os dados da disciplina:", err);
                    toast.error("Erro ao carregar os dados do disciplina.");
                }
            }

            fetchSubjectData();
        }
    }, [subjectId, actionPanelStatus, reset, handleActionGetSubjectById]);

    const onSubmit = async (data: IUpdateSubjectFormData) => {
        try {
            if (!subjectId) return toast.error("Não foi possível associar a ação a um disciplina");

            await handleActionUpdateSubject(subjectId, data);
            onClose();

            toast.success(`A atualização da disciplina foi bem-sucedida!`);
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro ao processar a solicitação.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-lg">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                <input
                    id="description"
                    type="text"
                    {...register('description')}
                    className={`mt-1 block w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>


            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <AiOutlineSend className="mr-2" />
                Atualizar Disciplina
            </button>
        </form>
    );
};

export default UpdateSubjectForm;
