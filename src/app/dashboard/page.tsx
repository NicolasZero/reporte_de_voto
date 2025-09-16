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

    const api_url = process.env.NEXT_PUBLIC_API_URL ?? '';
  
    if (!api_url) return <div>API URL not found</div>;

    return (
        <StatisticsDashboard onLogout={handleLogout} username="Admin" api_url={process.env.NEXT_PUBLIC_API_URL}/>
    )
}