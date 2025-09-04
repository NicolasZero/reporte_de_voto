"use client"
import { useRouter } from 'next/navigation';
import StatisticsDashboard from "@/components/dashboard/statistics";

export default function Dashboard() {
    const router = useRouter();

    const handleLogout = () => {
        // setUser({ username: "", isAuthenticated: false })
        // setCurrentView("form")
        router.push('/login');
    }

    return (
        <StatisticsDashboard onLogout={handleLogout} username="Admin" />
    )
}