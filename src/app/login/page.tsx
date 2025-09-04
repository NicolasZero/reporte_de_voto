"use client"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { LoginForm } from "@/components/login/loginForm"
import { toast } from "sonner"

interface User {
    username: string
    isAuthenticated: boolean
}

export default function Login () {
    const router = useRouter();

    const [user, setUser] = useState<User>({ username: "", isAuthenticated: false })
    // const [currentView, setCurrentView] = useState<"form" | "login" | "stats">("form")
    const [loginError, setLoginError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    const api_url = process.env.NEXT_PUBLIC_API_URL ?? ''

    if (!api_url) return <div>API URL not found</div>

    const handleSubmit = async (username: string, password: string) => {
        setIsLoading(true)
        setLoginError("")

        const data = {username, password}


        await fetch(`${api_url}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Activar este header
            },
            body: JSON.stringify(data) // Enviar el objeto JSON
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) return setLoginError("Usuario o contraseña incorrectos")
          toast.success('Inicio de sesión exitoso')
        })
        .catch(error => { 
            // console.log(error);
            setLoginError("Usuario o contraseña incorrectos")
        });

        setIsLoading(false)
    }

    const handleLogin = async (username: string, password: string) => {
        setIsLoading(true)
        setLoginError("")

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Demo credentials - in real app, this would be server-side validation
        if (username === "admin" && password === "password") {
            setUser({ username, isAuthenticated: true })

            // setCurrentView("stats")
            router.push('/dashboard');
        } else {
            setLoginError("Usuario o contraseña incorrectos")
        }

        setIsLoading(false)
    }

    
    return <LoginForm onLogin={handleLogin} error={loginError} isLoading={isLoading} />
}