'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

const Login = () => {
    const router = useRouter()
    const [username, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const { mutate, error, isPending } = useMutation<{ error?: string }, Error, void>({
        mutationKey: ['login'],
        mutationFn: async () => {
            console.log("in mutation fn")
            const result = await fetch('/api/login', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

            const data = await result.json()
            if (!result.ok) throw new Error(data.error)

            return data
        },
        onSuccess: () => router.push('/')
    })

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate()
    }

    return <div>
        <h1 className="font-bold font-sans text-amber-400 text-4xl mb-10 mt-6">
            Login
        </h1>
        <form className="flex flex-col gap-3 max-w-xs" onSubmit={onSubmit}>
            <input
                className="border-2 border-amber-300 p-2"
                placeholder="Login"
                value={username}
                onChange={(e) => setLogin(e.target.value)}
            />
            <input
                className="border-2 border-amber-300 p-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-amber-400 p-2" type="submit">
                {"Login"}
            </button>
            {error && <p className="text-red-500">{error.message}</p>}
        </form>
    </div>
}

export default Login