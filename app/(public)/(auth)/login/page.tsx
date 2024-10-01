
import SignInTemplate from "../../../../templates/SignIn";


import { redirect } from "next/navigation";

import { CredentialSignInParams } from "../../../../actions/auth/schemas";

import { signIn } from "../../../../auth";


export default async function SignUpPage() {

    const handleSignIn = async (credentials: CredentialSignInParams) => {
        "use server";

        await signIn("credentials", credentials);

        redirect('/');
    }

    return <SignInTemplate handleSignIn={handleSignIn} />
}
