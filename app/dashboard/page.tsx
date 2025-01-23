"use client"

import { useAuth } from "../contexts/AuthContext"
import { ConditionalLayout } from "../components/ConditionalLayout"
import  Button  from "../components/ui/button"

export default function Dashboard() {
  const { logout } = useAuth()

  return (
    <ConditionalLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="mb-4">Welcome to your dashboard!</p>
        <Button onClick={logout}>Logout</Button>
      </div>
    </ConditionalLayout>
  )
}

