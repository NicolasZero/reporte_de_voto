"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useEffect, useState } from "react";

interface RegisterVoteProps {
  api_url: string | undefined;
}

export function RegisterVote(props: RegisterVoteProps) {
  const {api_url} = props 
  const [selectedState, setSelectedState] = useState("")
  const [selectedMunicipality, setSelectedMunicipality] = useState("")

  const [stateValue, setState] = useState([{id: 0, state: "Cargando..."}])
  const [municipalityValue, setMunicipality] = useState([{id: 0, state_id: 0, municipality: "Cargando..."}])
  const [parishValue, setParish] = useState([{id: 0, municipality_id: 0, parish: "Cargando..."}])

  useEffect(() => {
    fetch(`${api_url}/location`, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
      setState(data.data.state)
      setMunicipality(data.data.municipality)
      setParish(data.data.parish)      
    })
    .catch(error => console.error('Error:', error));
  }, [api_url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetch(`${api_url}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ /* datos a enviar */ })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    console.log("Form submitted")
  }

  return (
    <div className="flex min-h-[100vh] items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>¿Ya votaste?</CardTitle>
          
          <CardDescription>Por favor ingresa tus datos si ya votaste</CardDescription>
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
                  {stateValue.map((state) => (
                    <SelectItem key={state.id} value={state.id.toString()}>
                      {state.state}
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
                    municipalityValue.map((municipality) => (
                      municipality.state_id === parseInt(selectedState) &&
                      <SelectItem key={municipality.id} value={municipality.id.toString()}>
                        {municipality.municipality}
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
                    parishValue.map((parish) => (
                      parish.municipality_id === parseInt(selectedMunicipality) &&
                      <SelectItem key={parish.id} value={parish.id.toString()}>
                        {parish.parish}
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
