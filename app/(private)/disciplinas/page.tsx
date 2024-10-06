import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { getAllSubjects } from "../../../actions/subjects";
import { AiOutlineWarning } from "react-icons/ai";
import Link from "next/link";
import SubjectTemplate from "../../../templates/Subjects";

export interface ISubjectPage {
    searchParams: Record<string, string | string[] | undefined>;
}

export default async function SubjectPage({ searchParams }: ISubjectPage) {
    const session = await auth();

    if (!session)
        return redirect('/login');

    const queryparams = {
        page: searchParams?.page ? Number(searchParams.page) : 1,
        limit: searchParams?.limit ? Number(searchParams.limit) : 7,
    };

    const token = session.backendToken;

    try {
        const res = await getAllSubjects(token || '', queryparams);

        return (
            <SubjectTemplate
                subjects={res?.data || []}
                currentPage={res?.currentPage || 1}
                totalPages={res?.totalPages || 1} />
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Erro ao obter anúncios:", error);

        // Página de erro estilizada
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
                    <AiOutlineWarning className="text-red-500 mx-auto text-6xl mb-4" /> {/* Ícone de aviso */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Erro ao carregar disciplinas</h1>
                    <p className="text-gray-600 mb-4">
                        {error?.message || "Ocorreu um erro desconhecido."}
                    </p>
                    <Link
                        href="/"
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Tentar Novamente
                    </Link>
                </div>
            </div>
        );
    }
}