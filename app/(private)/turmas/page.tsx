import { redirect } from "next/navigation";
import { auth, signOut } from "../../../auth";
import ClassesTemplate from "../../../templates/Classes";
import { getAllClasses } from "../../../actions/classes";
import { AiOutlineWarning } from "react-icons/ai";
import Link from "next/link";
import { extractExpiresFromBackEndToken } from "../../../utils";
import { handleSignOut } from "../../../actions/auth";

export interface IClassesPage {
    searchParams: Record<string, string | string[] | undefined>;
}

export default async function ClassesPage({ searchParams }: IClassesPage) {
    const session = await auth();

    if (!session || !session.backendToken)
        return redirect('/login');

    const tokenExpiresAt = extractExpiresFromBackEndToken(session.backendToken);
    console.log(tokenExpiresAt);

    const actionSignOut = async () => {
        "use server";
        await handleSignOut(String(session.backendToken));
        await signOut({
            redirect: true,
            redirectTo: '/login',
        })
    }

    if (Number(tokenExpiresAt) * 1000 <= Date.now())
        return redirect('/login');

    const queryparams = {
        page: searchParams?.page ? Number(searchParams.page) : 1,
        limit: searchParams?.limit ? Number(searchParams.limit) : 7,
    };

    const token = session.backendToken;

    try {
        const res = await getAllClasses(token || '', queryparams);
        console.log(res);

        return (
            <ClassesTemplate
                actionSignOut={actionSignOut}
                classes={res?.data || []}
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
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Erro ao carregar turmas</h1>
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