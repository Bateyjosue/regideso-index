import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FallingLines } from 'react-loader-spinner';

const AgentMobileLogin: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [biometricAvailable, setBiometricAvailable] = useState<boolean>(false);
  const [lastLoginTime, setLastLoginTime] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    checkBiometricAvailability();
    getLastLoginTime();
  }, []);

  const checkBiometricAvailability = async () => {
    if (window.PublicKeyCredential) {
      try {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        setBiometricAvailable(available);
      } catch (error) {
        setBiometricAvailable(false);
      }
    }
  };

  const getLastLoginTime = () => {
    const lastLogin = localStorage.getItem('lastAgentLogin');
    if (lastLogin) {
      setLastLoginTime(new Date(lastLogin).toLocaleString());
    }
  };

  const handleBiometricLogin = async () => {
    setLoading(true);
    
    try {
      // Simulate biometric authentication
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          allowCredentials: [{
            id: new Uint8Array(16),
            type: 'public-key',
            transports: ['internal']
          }],
          userVerification: 'required'
        }
      });

      if (credential) {
        localStorage.setItem('lastAgentLogin', new Date().toISOString());
        toast.success('Welcome back, Agent!');
        navigate('/agent-dashboard');
      }
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyAccess = () => {
    // Redirect to agent login page instead of the admin login
    navigate('/agent-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Agent Access</h1>
          <p className="text-gray-600">Secure field authentication</p>
        </div>

        {/* Biometric Login */}
        {biometricAvailable ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21z"/>
                </svg>
              </div>
              
              <button
                onClick={handleBiometricLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <FallingLines color="#ffffff" width="24" visible={true} />
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                    Authenticate with Biometrics
                  </div>
                )}
              </button>
            </div>

            {/* Last Login Info */}
            {lastLoginTime && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Last Login</p>
                    <p className="text-xs text-blue-700">{lastLoginTime}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Emergency Access */}
            <div className="text-center">
              <button
                onClick={handleEmergencyAccess}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium underline"
              >
                Emergency Access (Password)
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Biometrics Not Available</h3>
              <p className="text-gray-600 text-sm mb-6">
                Your device doesn't support biometric authentication or it's not set up.
              </p>
              <button
                onClick={handleEmergencyAccess}
                className="w-full bg-gray-600 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
              >
                Continue with Password
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            REGIDESO Field Agent Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentMobileLogin;