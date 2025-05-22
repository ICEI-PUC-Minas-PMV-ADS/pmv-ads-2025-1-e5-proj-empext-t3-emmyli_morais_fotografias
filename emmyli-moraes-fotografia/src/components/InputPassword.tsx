import { Eye, EyeOff } from "lucide-react";
import React, { InputHTMLAttributes, useState } from "react";

export default function InputPassword(props: InputHTMLAttributes<HTMLInputElement>) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative w-full">
            <input
                {...props}
                type={showPassword ? "text" : "password"}
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d] pr-10"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
        </div>
    );
}