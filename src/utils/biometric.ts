/**
 * Utility functions for biometric authentication
 */

export interface BiometricCredential {
  id: string;
  type: 'fingerprint' | 'face' | 'voice';
  created: Date;
  lastUsed?: Date;
}

class BiometricAuth {
  private static instance: BiometricAuth;
  
  private constructor() {}
  
  static getInstance(): BiometricAuth {
    if (!BiometricAuth.instance) {
      BiometricAuth.instance = new BiometricAuth();
    }
    return BiometricAuth.instance;
  }

  /**
   * Check if biometric authentication is supported
   */
  async isSupported(): Promise<boolean> {
    if (!window.PublicKeyCredential) {
      return false;
    }
    
    try {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch (error) {
      console.error('Error checking biometric support:', error);
      return false;
    }
  }

  /**
   * Check if device is mobile
   */
  isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  /**
   * Register biometric credential
   */
  async register(userId: string, userName: string): Promise<BiometricCredential | null> {
    try {
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);
      
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { 
            name: "REGIDESO",
            id: window.location.hostname
          },
          user: {
            id: new TextEncoder().encode(userId),
            name: userName,
            displayName: userName
          },
          pubKeyCredParams: [
            { alg: -7, type: "public-key" }, // ES256
            { alg: -257, type: "public-key" } // RS256
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
            requireResidentKey: false
          },
          timeout: 60000,
          attestation: "direct"
        }
      }) as PublicKeyCredential;

      if (credential) {
        const biometricCred: BiometricCredential = {
          id: credential.id,
          type: this.detectBiometricType(),
          created: new Date()
        };
        
        // Store credential info locally
        this.storeCredential(biometricCred);
        
        return biometricCred;
      }
      
      return null;
    } catch (error) {
      console.error('Biometric registration failed:', error);
      throw new Error('Failed to register biometric authentication');
    }
  }

  /**
   * Authenticate using biometric
   */
  async authenticate(): Promise<{ success: boolean; error?: string }> {
    try {
      const credentials = this.getStoredCredentials();
      if (credentials.length === 0) {
        return { success: false, error: 'No biometric credentials found' };
      }

      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          allowCredentials: credentials.map(cred => ({
            id: new TextEncoder().encode(cred.id),
            type: 'public-key',
            transports: ['internal']
          })),
          userVerification: 'required',
          timeout: 60000
        }
      });

      if (assertion) {
        // Update last used timestamp
        this.updateLastUsed(assertion.id);
        return { success: true };
      }
      
      return { success: false, error: 'Authentication failed' };
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }

  /**
   * Detect biometric type based on device capabilities
   */
  private detectBiometricType(): 'fingerprint' | 'face' | 'voice' {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      // iOS devices - could be Touch ID or Face ID
      return 'fingerprint'; // Default assumption
    } else if (userAgent.includes('android')) {
      // Android devices - usually fingerprint
      return 'fingerprint';
    }
    
    return 'fingerprint'; // Default fallback
  }

  /**
   * Store credential information locally
   */
  private storeCredential(credential: BiometricCredential): void {
    const stored = this.getStoredCredentials();
    stored.push(credential);
    localStorage.setItem('biometric_credentials', JSON.stringify(stored));
  }

  /**
   * Get stored credentials
   */
  private getStoredCredentials(): BiometricCredential[] {
    const stored = localStorage.getItem('biometric_credentials');
    if (!stored) return [];
    
    try {
      return JSON.parse(stored).map((cred: any) => ({
        ...cred,
        created: new Date(cred.created),
        lastUsed: cred.lastUsed ? new Date(cred.lastUsed) : undefined
      }));
    } catch {
      return [];
    }
  }

  /**
   * Update last used timestamp
   */
  private updateLastUsed(credentialId: string): void {
    const credentials = this.getStoredCredentials();
    const credential = credentials.find(c => c.id === credentialId);
    
    if (credential) {
      credential.lastUsed = new Date();
      localStorage.setItem('biometric_credentials', JSON.stringify(credentials));
    }
  }

  /**
   * Remove all stored credentials
   */
  clearCredentials(): void {
    localStorage.removeItem('biometric_credentials');
  }

  /**
   * Get credential statistics
   */
  getCredentialStats(): {
    total: number;
    byType: Record<string, number>;
    lastUsed?: Date;
  } {
    const credentials = this.getStoredCredentials();
    const byType = credentials.reduce((acc, cred) => {
      acc[cred.type] = (acc[cred.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const lastUsed = credentials
      .filter(c => c.lastUsed)
      .sort((a, b) => (b.lastUsed!.getTime() - a.lastUsed!.getTime()))[0]?.lastUsed;

    return {
      total: credentials.length,
      byType,
      lastUsed
    };
  }
}

export default BiometricAuth.getInstance();