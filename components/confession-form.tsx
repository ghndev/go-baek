"use client";

import { useActionState, useState, useEffect } from "react";
import { type User } from "next-auth";
import { createConfession } from "@/actions/confessions";

const initialState = {
    message: "",
    errors: undefined,
    success: false,
};

export default function ConfessionForm({ user }: { user?: User }) {
    const [state, formAction, isPending] = useActionState(createConfession, initialState);
    const [useProfileName, setUseProfileName] = useState(false);

    // Reset form on success (optional, but good UX)
    useEffect(() => {
        if (state?.success) {
            setUseProfileName(false);
            // We can't easily reset uncontrolled inputs without refs or key reset
            // For now, simplicity is key. The page revalidatePath("/") might refresh the list, 
            // but the form values persist unless we clear them. 
            // Let's rely on the user seeing the success message or page refresh data.
            // Actually, binding "key" to success state is a simple way to reset form.
        }
    }, [state?.success]);

    return (
        <form action={formAction} className="space-y-4" key={state?.success ? 'success' : 'form'}>
            <div className="flex flex-col space-y-2">
                <label className="text-xl pl-2 text-gray-600">From.</label>

                <div className="flex items-center gap-4 pl-2 mb-2">
                    {user && (
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                name="useProfileName"
                                checked={useProfileName}
                                onChange={(e) => setUseProfileName(e.target.checked)}
                                className="w-5 h-5 accent-gray-800"
                            />
                            <span className="font-gaegu text-xl text-gray-700">Use Profile Name ({user.name})</span>
                        </label>
                    )}
                </div>

                {!useProfileName && (
                    <input
                        type="text"
                        name="customName"
                        placeholder="Anonymous (or your nickname)"
                        disabled={!user || isPending}
                        className="w-full bg-transparent border-b-2 border-gray-300 focus:border-gray-500 outline-hidden px-2 py-1 text-2xl font-bold placeholder-gray-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50 font-gaegu"
                    />
                )}
                {state?.errors?.properties?.customName && (
                    <p className="text-red-500 font-gaegu text-lg pl-2">{state.errors.properties.customName.errors?.[0]}</p>
                )}
            </div>

            <div className="relative">
                <textarea
                    name="content"
                    rows={5}
                    placeholder={user ? "e.g. I've liked you since the first time we met... (Write your secret here)" : "Please login to write a confession."}
                    disabled={!user || isPending}
                    className="w-full bg-gray-50/50 p-4 text-2xl leading-relaxed resize-none border-2 border-gray-100 rounded-lg focus:border-gray-300 outline-hidden placeholder-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100 font-gaegu"
                />
                {/* Decorative doodle */}
                <div className="absolute -bottom-2 -right-2 transform rotate-12 opacity-20 pointer-events-none">
                    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 50 Q 50 10 90 50 T 90 90" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                </div>
            </div>

            {state?.errors?.properties?.content && (
                <p className="text-red-500 font-gaegu text-xl">{state.errors.properties.content.errors?.[0]}</p>
            )}

            {state?.message && (
                <p className={`font-gaegu text-xl text-center ${state.success ? 'text-green-600' : 'text-red-500'}`}>
                    {state.message}
                </p>
            )}

            <div className="text-right">
                <button
                    type="submit"
                    disabled={!user || isPending}
                    className="bg-gray-800 text-white cursor-pointer px-6 py-2 rounded-full text-xl hover:bg-black transition-transform disabled:opacity-50 disabled:cursor-not-allowed font-gaegu"
                >
                    {isPending ? "Sharing..." : "Share Secret"}
                </button>
            </div>
        </form>
    );
}
