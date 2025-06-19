import { ReactNode, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

interface FieldAgentProtectedRouteProps {
  children: ReactNode
}

export function FieldAgentProtectedRoute({ children }: FieldAgentProtectedRouteProps) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if field agent is logged in
    const agentLoggedIn = localStorage.getItem('field_agent_logged_in') === 'true'
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
    return <Navigate to="/field-agent-login" replace />
  }

  return <>{children}</>
}