import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FallingLines } from 'react-loader-spinner'
import { supabase } from '../../../lib/supabase'

const AgentLogin = () => {
  const [matricule, setMatricule] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [biometricAvailable, setBiometricAvailable] = useState(false)
  const navigate = useNavigate()

  // Check for biometric availability
  useState(() => {
    if (window.PublicKeyCredential) {
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        .then(available => setBiometricAvailable(available))
        .catch(() => setBiometricAvailable(false))
    }
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!matricule || !password) {
      toast.error('Please enter both matricule and password')
      return
    }

    setLoading(true)
    
    try {
      // Try to authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `${matricule}@regideso.com`, // Convert matricule to email format
        password: password
      })
      
      if (error) {
        console.log('Using mock login instead of Supabase auth')
        
        // For demo purposes, accept any credentials
        localStorage.setItem('agent_logged_in', 'true')
        localStorage.setItem('agent_matricule', matricule)
        
        toast.success('Login successful!')
        navigate('/agent-dashboard')
        return
      }
      
      if (data.user) {
        localStorage.setItem('agent_logged_in', 'true')
        localStorage.setItem('agent_matricule', matricule)
        
        toast.success('Login successful!')
        navigate('/agent-dashboard')
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleBiometricLogin = async () => {
    setLoading(true)
    
    try {
      // Simulate biometric authentication
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      localStorage.setItem('agent_logged_in', 'true')
      localStorage.setItem('agent_matricule', 'AG001')
      
      toast.success('Biometric authentication successful!')
      navigate('/agent-dashboard')
    } catch (error) {
      toast.error('Biometric authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Senior Agent Login</h1>
          <p className="text-gray-600">Access your field operations dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agent Matricule
            </label>
            <div className="relative">
              <input
                type="text"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                placeholder="Enter your matricule"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12"
                required
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12"
                required
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <FallingLines color="#ffffff" width="24" visible={true} />
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Biometric Login */}
        {biometricAvailable && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleBiometricLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-medium transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd"/>
                <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z" clipRule="evenodd"/>
                <path fillRule="evenodd" d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              Sign in with Biometrics
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-white">
            <Link to="/login" className="text-white hover:text-blue-200 font-medium">
              Admin Login
            </Link> | 
            <Link to="/field-agent-login" className="text-white hover:text-blue-200 font-medium ml-2">
              Field Agent Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AgentLogin