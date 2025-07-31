"use client"
import {RegisterVote} from "@/components/mycomponents/registerVote"

export default function Home() {
  return (
    <RegisterVote api_url={process.env.NEXT_PUBLIC_API_URL}/>
  )
}