import Link from "next/link";
import { getAnnouncements } from "../../actions/announcements";
import AnnouncementTemplate from "../../templates/Announcement";
import { AiOutlineWarning } from "react-icons/ai";

export default async function AnnouncementPage({ searchParams }) {
    const queryparams = {
        title: searchParams?.title,
        author: searchParams?.author,
        order: searchParams?.order || 'desc',
        page: searchParams?.page || 1,
        limit: searchParams?.limit || 10,
    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6Ikpvw6NvIENhbXBvcyIsInVzZXJUeXBlIjoiVEVBQ0hFUiIsImlhdCI6MTUxNjIzOTAyMn0.QTT5gfXh1DWWZr_p55brzGYTNUSidIUicGBsH90gXzw"; // token will be replaced

    try {
        const res = await getAnnouncements(token, queryparams);
        console.log(res);

        return (
            <AnnouncementTemplate
                announcements={res?.data || []}
                currentPage={res?.currentPage || 1}
                totalPages={res?.totalPages || 1}
            />
        );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Erro ao obter anúncios:", error);

        // Página de erro estilizada
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
                    <AiOutlineWarning className="text-red-500 mx-auto text-6xl mb-4" /> {/* Ícone de aviso */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Erro ao carregar anúncios</h1>
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
