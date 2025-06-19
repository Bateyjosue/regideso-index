import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const BiometricSetup: React.FC = () => {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isEnrolling, setIsEnrolling] = useState<boolean>(false);
  const [enrollmentStep, setEnrollmentStep] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    if (window.PublicKeyCredential) {
      try {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        setIsSupported(available);
      } catch (error) {
        setIsSupported(false);
      }
    }
  };

  const enrollBiometric = async () => {
    if (!isSupported) {
      toast.error('Biometric authentication is not supported on this device');
      return;
    }

    setIsEnrolling(true);
    setEnrollmentStep(2);

    try {
      // Simulate enrollment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEnrollmentStep(3);
      
      // Create credential
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: { name: "Regideso Agent App" },
          user: {
            id: new Uint8Array(16),
            name: "agent@regideso.com",
            displayName: "Field Agent"
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required"
          }
        }
      });

      if (credential) {
        setEnrollmentStep(4);
        toast.success('Biometric authentication setup successful!');
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (error) {
      toast.error('Failed to setup biometric authentication');
      setIsEnrolling(false);
      setEnrollmentStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Setup Biometric Login
          </h2>
          <p className="text-gray-600 mb-8">
            Secure and convenient access for field agents
          </p>
        </div>

        {!isSupported ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Not Supported</h3>
            <p className="text-gray-600 mb-6">
              Biometric authentication is not available on this device.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Continue with Password
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= enrollmentStep
                      ? 'bg-blue-600'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {enrollmentStep === 1 && (
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Setup</h3>
                <p className="text-gray-600 mb-6">
                  We'll guide you through setting up fingerprint or face recognition for quick and secure access.
                </p>
                <button
                  onClick={enrollBiometric}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Start Setup
                </button>
              </div>
            )}

            {enrollmentStep === 2 && (
              <div className="text-center">
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="animate-spin w-8 h-8 border-4 border-yellow-600 border-t-transparent rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Preparing...</h3>
                <p className="text-gray-600">
                  Setting up secure authentication on your device.
                </p>
              </div>
            )}

            {enrollmentStep === 3 && (
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Authenticate Now</h3>
                <p className="text-gray-600 mb-6">
                  Please use your fingerprint or face recognition when prompted by your device.
                </p>
                <div className="animate-pulse bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    Follow your device's prompts to complete setup...
                  </p>
                </div>
              </div>
            )}

            {enrollmentStep === 4 && (
              <div className="text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Setup Complete!</h3>
                <p className="text-gray-600 mb-6">
                  Biometric authentication is now enabled. You can use it to quickly access your account.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800 text-sm">
                    ✓ Secure authentication enabled<br/>
                    ✓ Quick access configured<br/>
                    ✓ Ready to use
                  </p>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiometricSetup;