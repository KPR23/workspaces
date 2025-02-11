"use client"

import { useState } from "react"
import Login from "../components/Login"
import EmployeeManagement from "../components/EmployeeManagement"

export default function Home() {
  const [user, setUser] = useState<{ name: string; role: "admin" | "employee" } | null>(null)

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Employee Management System</h1>
      {user ? <EmployeeManagement user={user} onLogout={() => setUser(null)} /> : <Login onLogin={setUser} />}
    </main>
  )
}

