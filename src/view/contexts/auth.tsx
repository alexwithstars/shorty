import { createContext, useEffect, useState } from 'react'
import { AuthContextProps, AuthProviderProps, Token } from '../types/auth.js'

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<Token>('')

  useEffect(() => {
    const candidateToken = window.sessionStorage.getItem('token')
    if (candidateToken !== null) {
      setToken(candidateToken)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
