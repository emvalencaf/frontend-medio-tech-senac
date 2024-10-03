import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function StudentsPage() {
    const session = await auth();

    if (!session)
        return redirect('/');


    return (
<div>

</div>
    );
}