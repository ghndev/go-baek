"use client";

import { useActionState } from "react";
import { register } from "@/actions/auth";
import Link from "next/link";
import NotebookPaper from "./notebook-paper";

export default function SignupForm() {
    const [state, formAction, isPending] = useActionState(register, undefined);

    return (
        <NotebookPaper>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-gaegu text-gray-700">Join the Club</h1>
                <p className="text-xl text-gray-500 font-gaegu mt-2">Write your name in the notebook to join.</p>
            </div>

            <form action={formAction} className="space-y-6 max-w-md mx-auto">
                <div className="space-y-2">
                    <label className="text-2xl font-gaegu text-gray-600 block" htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Nickname"
                        className="w-full bg-transparent border-b-2 border-dashed border-gray-400 focus:border-gray-800 outline-hidden px-2 py-1 text-xl font-gaegu placeholder-gray-300 transition-colors"
                    />
                    {state?.errors?.properties?.name?.errors?.[0] && <p className="text-red-500 text-sm font-gaegu">{state.errors.properties.name.errors[0]}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-2xl font-gaegu text-gray-600 block" htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="hello@example.com"
                        className="w-full bg-transparent border-b-2 border-dashed border-gray-400 focus:border-gray-800 outline-hidden px-2 py-1 text-xl font-gaegu placeholder-gray-300 transition-colors"
                    />
                    {state?.errors?.properties?.email?.errors?.[0] && <p className="text-red-500 text-sm font-gaegu">{state.errors.properties.email.errors[0]}</p>}
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
                    {state?.errors?.properties?.password?.errors?.[0] && <p className="text-red-500 text-sm font-gaegu">{state.errors.properties.password.errors[0]}</p>}
                </div>

                <div className="pt-4">
                    {state?.message && <p className="text-red-500 text-center font-gaegu mb-4">{state.message}</p>}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-gray-800 text-white font-gaegu text-2xl py-2 rounded-full hover:bg-black transition-transform hover:-translate-y-1 disabled:opacity-50"
                    >
                        {isPending ? "Writing..." : "Sign Up"}
                    </button>
                </div>

                <div className="text-center mt-4">
                    <Link href="/login" className="text-gray-500 font-gaegu hover:text-gray-800 underline decoration-dashed underline-offset-4">
                        Already have a name? Login
                    </Link>
                </div>
            </form>
        </NotebookPaper>
    );
}
