"use client"
// import { useRouter } from 'next/navigation';
import {signOut} from "next-auth/react"
import StatisticsDashboard from "@/components/dashboard/statistics";

export default function Dashboard() {
    // const router = useRouter();

    const api_url = process.env.NEXT_PUBLIC_API_URL ?? '';
  
    if (!api_url) return <div>API URL not found</div>;

    return (
        <StatisticsDashboard onLogout={()=>signOut()} username="Admin" api_url={api_url}/>
    )
}