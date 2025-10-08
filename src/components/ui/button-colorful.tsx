import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    bgColor?: string;
}

export function ButtonColorful({
    className = "",
    label = "Explore Components",
    bgColor = "bg-orange-500",
    ...props
}: ButtonColorfulProps) {
    return (
        <button
            className={`relative h-12 px-5 overflow-hidden ${bgColor} transition-all duration-200 group rounded-lg inline-flex items-center justify-center shadow-md hover:shadow-lg ${className}`}
            {...props}
        >
            {/* Hover overlay effect */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative flex items-center justify-center gap-2">
                <span className="text-white font-semibold text-base">{label}</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
        </button>
    );
}
