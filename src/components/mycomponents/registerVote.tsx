"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";

export function RegisterVote() {
  
  const [selectedState, setSelectedState] = useState("")
  const [selectedMunicipality, setSelectedMunicipality] = useState("")

  // Sample data - replace with your actual data
  const states = [
    "Amazonas",
    "Anzoátegui",
    "Apure",
    "Aragua",
    "Barinas",
    "Bolívar",
    "Carabobo",
    "Cojedes",
    "Delta Amacuro",
    "Distrito Capital",
    "Falcón",
    "Guárico",
    "Lara",
    "Mérida",
    "Miranda",
    "Monagas",
    "Nueva Esparta",
    "Portuguesa",
    "Sucre",
    "Táchira",
    "Trujillo",
    "Vargas",
    "Yaracuy",
    "Zulia",
  ]

  const municipalities = {
    Miranda: [
      "Baruta",
      "Brión",
      "Buroz",
      "Carrizal",
      "Chacao",
      "El Hatillo",
      "Guaicaipuro",
      "Independencia",
      "Lander",
      "Los Salias",
      "Páez",
      "Paz Castillo",
      "Pedro Gual",
      "Plaza",
      "Simón Bolívar",
      "Sucre",
      "Urdaneta",
      "Zamora",
    ],
    "Distrito Capital": ["Libertador"],
    Carabobo: [
      "Bejuma",
      "Carlos Arvelo",
      "Diego Ibarra",
      "Guacara",
      "Juan José Mora",
      "Libertador",
      "Los Guayos",
      "Miranda",
      "Montalbán",
      "Naguanagua",
      "Puerto Cabello",
      "San Diego",
      "San Joaquín",
      "Valencia",
    ],
  }

  const parishes = {
    Chacao: ["Chacao"],
    Baruta: ["Baruta", "El Cafetal", "Las Minas de Baruta"],
    "El Hatillo": ["El Hatillo"],
    Sucre: [
      "Bello Monte",
      "Casanova",
      "Catia La Mar",
      "El Paraíso",
      "La Pastora",
      "Macarao",
      "Petare",
      "San Bernardino",
    ],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted")
  }

  return (
    <div className="flex min-h-[100vh] items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Confirma que ya votaste</CardTitle>
          <CardDescription>Por favor ingresa tus datos</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" autoComplete="none" type="text" placeholder="Introduce tu nombre" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ic">Cédula</Label>
              <Input id="ic" autoComplete="none" type="text" placeholder="Introduce tu cédula" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" autoComplete="none" type="text" placeholder="Introduce tu teléfono" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo</Label>
              <Input id="email" autoComplete="none" type="text" placeholder="Introduce tu correo" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Select
                required
                value={selectedState}
                onValueChange={(value) => {
                  setSelectedState(value)
                  setSelectedMunicipality("")
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="municipality">Municipio</Label>
              <Select
                required
                value={selectedMunicipality} 
                onValueChange={setSelectedMunicipality} 
                disabled={!selectedState}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un municipio" />
                </SelectTrigger>
                <SelectContent>
                  {selectedState &&
                    municipalities[selectedState as keyof typeof municipalities]?.map((municipality) => (
                      <SelectItem key={municipality} value={municipality}>
                        {municipality}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="parish">Parroquia</Label>
              <Select 
                required
                disabled={!selectedMunicipality}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una parroquia" />
                </SelectTrigger>
                <SelectContent>
                  {selectedMunicipality &&
                    parishes[selectedMunicipality as keyof typeof parishes]?.map((parish) => (
                      <SelectItem key={parish} value={parish}>
                        {parish}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full">Registrar mi voto</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
