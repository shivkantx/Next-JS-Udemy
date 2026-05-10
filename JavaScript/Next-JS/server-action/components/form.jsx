"use client";

import React from "react";
import { useActionState } from "react";
import { createUser } from "@/actions";

function Form() {
    const [state, formAction] = useActionState(createUser, {});

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm">

                <h2 className="text-white text-xl font-semibold mb-1">Sign up</h2>
                <p className="text-gray-500 text-sm mb-6">Create your account</p>

                <form action={formAction} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1">
                        <label className="text-gray-400 text-xs">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2.5 outline-none focus:border-violet-500 transition-colors placeholder-gray-600"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-gray-400 text-xs">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2.5 outline-none focus:border-violet-500 transition-colors placeholder-gray-600"
                        />
                    </div>

                    {state?.error && (
                        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                            {state.error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-1"
                    >
                        Create account
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Form;