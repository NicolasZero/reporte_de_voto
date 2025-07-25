"use client"
import { useState } from "react"
import { useRouter } from 'next/navigation';

import { LoginForm } from "@/components/mycomponents/loginForm"

interface User {
    username: string
    isAuthenticated: boolean
}

export default function Login () {
    const router = useRouter();

    const [user, setUser] = useState<User>({ username: "", isAuthenticated: false })
    const [currentView, setCurrentView] = useState<"form" | "login" | "stats">("form")
    const [loginError, setLoginError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (username: string, password: string) => {
        setIsLoading(true)
        setLoginError("")

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Demo credentials - in real app, this would be server-side validation
        if (username === "admin" && password === "password") {
            setUser({ username, isAuthenticated: true })

            // setCurrentView("stats")
            router.push('/book');
        } else {
            setLoginError("Invalid username or password")
        }

        setIsLoading(false)
    }

    //   const handleLogout = () => {
    //     setUser({ username: "", isAuthenticated: false })
    //     setCurrentView("form")
    //   }

    return (
        <LoginForm onLogin={handleLogin} error={loginError} isLoading={isLoading} />
    )
}