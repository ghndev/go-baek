"use client";

import { useActionState } from "react";
import { type User } from "next-auth";

export default function ConfessionForm({ user }: { user?: User }) {
    // Placeholder for future action
    const [state, formAction, isPending] = useActionState(async () => null, null);

    return (
        <form action={formAction} className="space-y-4">
            <div className="flex flex-col space-y-1">
                <label htmlFor="nickname" className="text-xl pl-2 text-gray-600">to. Everyone</label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    placeholder="From. Anonymous"
                    disabled={!user || isPending}
                    className="w-full bg-transparent border-b-2 border-gray-300 focus:border-gray-500 outline-hidden px-2 py-1 text-2xl font-bold placeholder-gray-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div className="relative">
                <textarea
                    name="content"
                    rows={5}
                    placeholder={user ? "e.g. I've liked you since the first time we met... (Write your secret here)" : "Please login to write a confession."}
                    disabled={!user || isPending}
                    className="w-full bg-gray-50/50 p-4 text-2xl leading-relaxed resize-none border-2 border-gray-100 rounded-lg focus:border-gray-300 outline-hidden placeholder-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100"
                />
                {/* Decorative doodle */}
                <div className="absolute -bottom-2 -right-2 transform rotate-12 opacity-20 pointer-events-none">
                    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 50 Q 50 10 90 50 T 90 90" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                </div>
            </div>

            <div className="text-right">
                <button
                    type="submit"
                    disabled={!user || isPending}
                    className="bg-gray-800 text-white cursor-pointer px-6 py-2 rounded-full text-xl hover:bg-black transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "Sharing..." : "Share Secret"}
                </button>
            </div>
        </form>
    );
}
