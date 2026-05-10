import React from 'react'
import { createUser } from "@/actions/index.js"

function UserForm() {

    // async function createUser(formData) {
    //     "use server"
    //     const name = formData.get("name")
    //     console.log("Creating user", name);

    // }
    return (
        <form action={createUser} className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Username"
                className="border p-2 rounded"
            />

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Login
            </button>
        </form>
    )
}

export default UserForm