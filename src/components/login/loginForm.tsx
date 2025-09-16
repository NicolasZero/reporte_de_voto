"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"

import { Toaster } from "@/components/ui/sonner"

interface LoginFormProps {
  onLogin: (username: string, password: string) => void
  error?: string
  isLoading?: boolean
}

export function LoginForm ({ onLogin, error, isLoading }: LoginFormProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Inicio de Sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder al área de estadísticas</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Ingrese su usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Ingresando..." : "Ingresar"}
              </Button>
            </form>

          {/*  <div className="mt-4 text-sm text-muted-foreground text-center">
              <p>Demo credenciales:</p>
              <p>Username: admin | Password: password</p>
            </div>*/}
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </>
  )
}