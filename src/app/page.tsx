"use client"
import {RegisterVote} from "@/components/mycomponents/registerVote"

export default function Home() {
  const api_url = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : '';
  // console.log(api_url);
  if (!api_url) return <div>API URL not found</div>;
  return (
    <RegisterVote api_url={process.env.NEXT_PUBLIC_API_URL}/>
  )
}