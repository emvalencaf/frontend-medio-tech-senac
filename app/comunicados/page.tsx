import { getAnnouncements } from "../../actions/announcements";
import AnnouncementTemplate from "../../templates/Announcement";

export default async function AnnouncementPage({ searchParams }) {
    const queryparams = {
        title: searchParams?.title,
        author: searchParams?.author,
        order: searchParams?.order || 'desc',
        page: searchParams?.page || 1,
        limit: searchParams?.limit || 10,
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6Ikpvw6NvIENhbXBvcyIsInVzZXJUeXBlIjoiVEVBQ0hFUiIsImlhdCI6MTUxNjIzOTAyMn0.QTT5gfXh1DWWZr_p55brzGYTNUSidIUicGBsH90gXzw"; // token will be replaced

    const res = await getAnnouncements(token, queryparams);
    console.log(res);

    return <AnnouncementTemplate announcements={res?.data || []} currentPage={res?.currentPage || 1} totalPages={res?.totalPages || 1} />
}
