"use client";

import React from "react";
import { IconType } from "react-icons";

interface FloatingInputProps {
    type: string;
    label: string;
    id: string;
    icon: IconType;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingInput: React.FC<FloatingInputProps> = ({ type, label, id, icon: Icon, value, onChange }) => {
    return (
        <div className="relative w-full mb-6 group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className="text-purple-500" />
            </div>
            <input
                type={type}
                id={id}
                className="block py-2.5 px-4 pl-10 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-purple-600 peer"
                placeholder=" "
                value={value}
                onChange={onChange}
            />
            <label
                htmlFor={id}
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] left-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-purple-600"
            >
                {label}
            </label>
        </div>
    );
};

export default FloatingInput;
