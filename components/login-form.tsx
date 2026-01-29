"use client";

import { useActionState } from "react";
import { authenticate } from "@/actions/auth";
import Link from "next/link";
import NotebookPaper from "./notebook-paper";

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <NotebookPaper>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-gaegu text-gray-700">Open Your Notebook</h1>
                <p className="text-xl text-gray-500 font-gaegu mt-2">Enter your name to read secrets.</p>
            </div>

            <form action={formAction} className="space-y-6 max-w-md mx-auto">
                <div className="space-y-2">
                    <label className="text-2xl font-gaegu text-gray-600 block" htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="hello@example.com"
                        className="w-full bg-transparent border-b-2 border-dashed border-gray-400 focus:border-gray-800 outline-hidden px-2 py-1 text-xl font-gaegu placeholder-gray-300 transition-colors"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-2xl font-gaegu text-gray-600 block" htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="******"
                        className="w-full bg-transparent border-b-2 border-dashed border-gray-400 focus:border-gray-800 outline-hidden px-2 py-1 text-xl font-gaegu placeholder-gray-300 transition-colors"
                    />
                </div>

                <div className="pt-4">
                    {errorMessage && <p className="text-red-500 text-center font-gaegu mb-4">{errorMessage}</p>}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-gray-800 text-white font-gaegu text-2xl py-2 rounded-full hover:bg-black transition-transform hover:-translate-y-1 disabled:opacity-50"
                    >
                        {isPending ? "Opening..." : "Login"}
                    </button>
                </div>

                <div className="text-center mt-4">
                    <Link href="/signup" className="text-gray-500 font-gaegu hover:text-gray-800 underline decoration-dashed underline-offset-4">
                        New here? Write your name
                    </Link>
                </div>
            </form>
        </NotebookPaper>
    );
}
