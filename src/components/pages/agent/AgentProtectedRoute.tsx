import { ReactNode, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

interface AgentProtectedRouteProps {
  children: ReactNode
}

export function AgentProtectedRoute({ children }: AgentProtectedRouteProps) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if agent is logged in
    const agentLoggedIn = localStorage.getItem('agent_logged_in') === 'true'
    setIsAuthenticated(agentLoggedIn)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/agent-login" replace />
  }

  return <>{children}</>
}