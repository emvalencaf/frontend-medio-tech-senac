"use client";

import React, { useState } from "react";

import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import FloatingInput from "../FloatingInput";
import PasswordInput from "../Passwordnput";
import { CredentialSignInParams } from "../../actions/auth/schemas";
import toast from "react-hot-toast";

export interface ISignInForm {
    handleSignIn: (credentials: CredentialSignInParams) => void;
}

const SignInForm: React.FC<ISignInForm> = ({ handleSignIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await handleSignIn({
            email,
            password
        });

        toast.success("Bem-vindo de volta!")
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <FloatingInput
                type="email"
                label="Email"
                id="email"
                icon={AiOutlineUser}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
                label="Senha"
                id="password"
                icon={AiOutlineLock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="w-full py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
            >
                Entrar
            </button>
        </form>
    );
};

export default SignInForm;
