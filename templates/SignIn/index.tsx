"use client";

import React from "react";

import { CredentialSignInParams } from "../../actions/auth/schemas";
import SignInForm from "../../components/SignInForm";
import SignInDEMOButton from "../../components/SignInDEMOButton";
import { dataSignInDemo } from "../../constants/signInDemo";
import { GiTeacher } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import { FaUser } from "react-icons/fa";

export interface ISignInTemplate {
    handleSignIn: (formData: CredentialSignInParams) => void;
}

const SignInTemplate: React.FC<ISignInTemplate> = ({ handleSignIn }) => {

    return (
        <div className="min-h-screen flex items-center gap-5 justify-center bg-gradient-to-r from-purple-500 to-purple-800 ">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-purple-700 mb-8">
                    Seja bem-vindo ao sistema do MédioTec SENAC
                </h2>
                <SignInForm handleSignIn={handleSignIn} />
                {
                    process.env.NEXT_PUBLIC_ENV === "DEVELOPMENT" && (
                        <div className="flex flex-col gap-2 mt-2">
                            {dataSignInDemo.map((signIn) => <SignInDEMOButton
                                Icon={signIn.userType === "TEACHER" ? GiTeacher : (signIn.userType === "STUDENT" ? PiStudent : FaUser)}
                                handleSignIn={handleSignIn}
                                key={signIn.email}
                                {...signIn}
                            />)}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default SignInTemplate;
