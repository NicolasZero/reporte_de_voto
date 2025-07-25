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
    name: string;
    idNumber: string;
    state: string;
    municipality: string;
    parish: string;
    registrationDate: string;
    email: string;
    phone: string;
}

interface StatisticsDashboardProps {
    onLogout: () => void;
    username: string;
}

export default function StatisticsDashboard({ onLogout, username }: StatisticsDashboardProps) {
    const [isExporting, setIsExporting] = useState(false);
    const [registrationData, setRegistrationData] = useState<Registration[]>([]);
    // const { toast } = useToast(); // If using shadcn/ui toast

    // Simulate fetching data
    useEffect(() => {
        // In a real app, this would be an API call
        const fetchData = async () => {
            // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
            const sampleData: Registration[] = [
                {
                    id: 1,
                    name: "María González",
                    idNumber: "V-12345678",
                    state: "Miranda",
                    municipality: "Chacao",
                    parish: "Chacao",
                    registrationDate: "2024-01-15T10:30:00Z",
                    email: "maria.gonzalez@email.com",
                    phone: "+58-212-1234567",
                },
                {
                    id: 2,
                    name: "Carlos Rodríguez",
                    idNumber: "V-87654321",
                    state: "Carabobo",
                    municipality: "Valencia",
                    parish: "San José",
                    registrationDate: "2024-01-14T14:20:00Z",
                    email: "carlos.rodriguez@email.com",
                    phone: "+58-241-7654321",
                },
                {
                    id: 3,
                    name: "Ana Martínez",
                    idNumber: "V-11223344",
                    state: "Distrito Capital",
                    municipality: "Libertador",
                    parish: "Catedral",
                    registrationDate: "2024-01-13T09:15:00Z",
                    email: "ana.martinez@email.com",
                    phone: "+58-212-1122334",
                },
                {
                    id: 4,
                    name: "Luis Pérez",
                    idNumber: "V-55667788",
                    state: "Miranda",
                    municipality: "Baruta",
                    parish: "Baruta",
                    registrationDate: "2024-01-12T16:45:00Z",
                    email: "luis.perez@email.com",
                    phone: "+58-212-5566778",
                },
                {
                    id: 5,
                    name: "Carmen Silva",
                    idNumber: "V-99887766",
                    state: "Carabobo",
                    municipality: "San Diego",
                    parish: "San Diego",
                    registrationDate: "2024-01-11T11:30:00Z",
                    email: "carmen.silva@email.com",
                    phone: "+58-241-9988776",
                },
                {
                    id: 6,
                    name: "Roberto Fernández",
                    idNumber: "V-44556677",
                    state: "Miranda",
                    municipality: "El Hatillo",
                    parish: "El Hatillo",
                    registrationDate: "2024-01-10T13:20:00Z",
                    email: "roberto.fernandez@email.com",
                    phone: "+58-212-4455667",
                },
                {
                    id: 7,
                    name: "Isabella Torres",
                    idNumber: "V-33445566",
                    state: "Carabobo",
                    municipality: "Naguanagua",
                    parish: "Naguanagua",
                    registrationDate: "2024-01-09T08:10:00Z",
                    email: "isabella.torres@email.com",
                    phone: "+58-241-3344556",
                },
                {
                    id: 8,
                    name: "Diego Morales",
                    idNumber: "V-22334455",
                    state: "Miranda",
                    municipality: "Sucre",
                    parish: "Petare",
                    registrationDate: "2024-01-08T15:40:00Z",
                    email: "diego.morales@email.com",
                    phone: "+58-212-2233445",
                },
            ];
            setRegistrationData(sampleData);
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
                title: "Total Registrations",
                value: totalRegistrations.toString(),
                description: "Total number of form submissions",
                icon: Users,
                trend: "+12% from last month", // Placeholder
            },
            {
                title: "States Covered",
                value: uniqueStates.toString(),
                description: "Number of states with registrations",
                icon: MapPin,
                trend: `${uniqueStates} states active`,
            },
            {
                title: "Most Popular State",
                value: mostPopularState ? mostPopularState[0] : "N/A",
                description: "State with highest registrations",
                icon: TrendingUp,
                trend: mostPopularState ? `${mostPopularState[1]} registrations` : "N/A",
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
                        <h1 className="text-3xl font-bold text-foreground">Statistics Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, {username}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Export Buttons */}
                        <div className="flex space-x-2">
                            <Button onClick={exportToCSV} disabled={isExporting} variant="outline" size="sm">
                                <FileText className="w-4 h-4 mr-2" />
                                {isExporting ? "Exporting..." : "Export CSV"}
                            </Button>
                            <Button onClick={exportToExcel} disabled={isExporting} variant="outline" size="sm">
                                <FileSpreadsheet className="w-4 h-4 mr-2" />
                                {isExporting ? "Exporting..." : "Export Excel"}
                            </Button>
                        </div>
                        {/* Logout Button (consider moving to a more prominent or common layout area) */}
                        <Button onClick={onLogout} variant="ghost" size="sm">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
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
                            Data Export
                        </CardTitle>
                        <CardDescription>
                            Export registration data in CSV or Excel format for analysis and reporting.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center mb-2">
                                    <FileText className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                                    <h3 className="font-medium">CSV Export</h3>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Download data as comma-separated values file. Compatible with Excel, Google Sheets, and other
                                    spreadsheet applications.
                                </p>
                                <Button onClick={exportToCSV} disabled={isExporting} size="sm">
                                    Download CSV
                                </Button>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center mb-2">
                                    <FileSpreadsheet className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                                    <h3 className="font-medium">Excel Export</h3>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Download data as Excel workbook with formatted columns and proper data types for advanced analysis.
                                </p>
                                <Button onClick={exportToExcel} disabled={isExporting} size="sm">
                                    Download Excel
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Registrations */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Registrations</CardTitle>
                        <CardDescription>
                            Latest form submissions from users ({registrationData.length} total records)
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
                                                    <p className="text-sm text-muted-foreground">ID: {registration.idNumber}</p>
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
                                            {new Date(registration.registrationDate).toLocaleDateString()}
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