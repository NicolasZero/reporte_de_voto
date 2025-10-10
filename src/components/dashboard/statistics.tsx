"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, MapPin, TrendingUp, LogOut, Download, FileSpreadsheet, FileText } from 'lucide-react';
import { exportToExcelFunction } from "@/hooks/exportToExcel";
import { exportToCsvFunction } from "@/hooks/exportToCsv"; // New import
import { useState, useEffect, useMemo } from "react";
// import { useToast } from "@/components/ui/use-toast"; // If using shadcn/ui toast

// Define interface for registration data
interface Registration {
  id: number;
  id_number: number;
  name: string;
  gender: string;
  gender_id: number;
  state: string;
  state_id: number;
  municipality: string;
  municipality_id: number;
  parish: string;
  parish_id: number;
  create_on: string;
  email: string;
  phone: string;
}

interface StatisticsDashboardProps {
  onLogout: () => void;
  username: string;
  api_url: string;
}

export default function StatisticsDashboard({ onLogout, username, api_url }: StatisticsDashboardProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [registrationData, setRegistrationData] = useState<Registration[]>([]);
  // const { toast } = useToast(); // If using shadcn/ui toast

  // Simulate fetching data
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchData = async () => {
      fetch(`${api_url}/vote`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setRegistrationData(data.data);
      })
      .catch(error => console.error('Error:', error));
    };
    fetchData();
  }, []);

  // Dynamically calculate stats using useMemo for performance
  const stats = useMemo(() => {
    const totalRegistrations = registrationData.length;
    const uniqueStates = new Set(registrationData.map(data => data.state)).size;
    
    const stateCounts = registrationData.reduce((acc, data) => {
      acc[data.state] = (acc[data.state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>); // Type assertion for stateCounts

    const sortedStates = Object.entries(stateCounts).sort(([, countA], [, countB]) => Number(countB) - Number(countA));
    const mostPopularState = sortedStates.length > 0 ? sortedStates[0] : null;

    return [
      {
        title: "Registros totales",
        value: totalRegistrations.toString(),
        description: "Número de registros totales",
        icon: Users,
        trend: "+12% desde el mes pasado", // Placeholder
      },
      {
        title: "Estados registrados",
        value: uniqueStates.toString(),
        description: "Número de estados registrados",
        icon: MapPin,
        trend: `${uniqueStates} estados diferentes`,
      },
      {
        title: "Estado más popular",
        value: mostPopularState ? mostPopularState[0] : "N/A",
        description: "Estado con mayor cantidad de registros",
        icon: TrendingUp,
        trend: mostPopularState ? `${mostPopularState[1]} Registros` : "N/A",
      },
      {
        title: "Completion Rate",
        value: "87%", // This would require actual data on completion status
        description: "Forms completed successfully",
        icon: BarChart3,
        trend: "+5% improvement",
      },
    ];
  }, [registrationData]); // Recalculate if registrationData changes

  const exportToCSV = () => {
    exportToCsvFunction(registrationData, setIsExporting, "registrations");
    // if (error) toast({ title: "Error", description: "Failed to export CSV.", variant: "destructive" });
  };

  const exportToExcel = () => {
    exportToExcelFunction(setIsExporting, registrationData);
    // if (error) toast({ title: "Error", description: "Failed to export Excel.", variant: "destructive" });
  };

  const RECENT_REGISTRATIONS_LIMIT = 5; // Constant for clarity

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Estadisticas</h1>
            <p className="text-muted-foreground">Bienvenido, {username}</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Export Buttons */}
            <div className="flex space-x-2">
              <Button onClick={exportToCSV} disabled={isExporting} variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                {isExporting ? "Exportando..." : "Exportar CSV"}
              </Button>
              <Button onClick={exportToExcel} disabled={isExporting} variant="outline" size="sm">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                {isExporting ? "Exportando..." : "Exportar Excel"}
              </Button>
            </div>
            {/* Logout Button (consider moving to a more prominent or common layout area) */}
            <Button onClick={onLogout} variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">{stat.trend}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Export Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Exportar Datos
            </CardTitle>
            <CardDescription>
              Exporte datos de registro en formato CSV o Excel para análisis e informes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-2">
                  <FileText className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-medium">Exportar en CSV</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Descargue datos como un archivo de valores separados por comas. Compatible con Excel, Hojas de Cálculo de Google y otras aplicaciones de hojas de cálculo.
                </p>
                <Button onClick={exportToCSV} disabled={isExporting} size="sm">
                  Descargar CSV
                </Button>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-2">
                  <FileSpreadsheet className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  <h3 className="font-medium">Exportar en Excel</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Descargue datos como un archivo de Excel con columnas formateadas y tipos de datos adecuados para análisis avanzados.
                </p>
                <Button onClick={exportToExcel} disabled={isExporting} size="sm">
                  Descargar Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registros Recientes</CardTitle>
            <CardDescription>
              Últimos envíos de formularios de los usuarios ({registrationData.length} registros)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {registrationData.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No registration data available.</p>
            ) : (
              <div className="space-y-4">
                {registrationData.slice(0, RECENT_REGISTRATIONS_LIMIT).map((registration) => (
                  <div key={registration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4"> {/* Use flex-wrap for responsiveness */}
                        <div>
                          <p className="font-medium">{registration.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {registration.id_number}</p>
                        </div>
                        <div>
                          <p className="text-sm">{registration.state}</p>
                          <p className="text-sm text-muted-foreground">{registration.municipality}</p>
                        </div>
                        <div>
                          <p className="text-sm">{registration.email}</p>
                          <p className="text-sm text-muted-foreground">{registration.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground ml-4"> {/* Add ml-4 for spacing */}
                      {new Date(registration.create_on).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}