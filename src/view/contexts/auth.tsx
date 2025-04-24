import { createContext, useEffect, useState } from 'react'
import { AuthContextProps, AuthProviderProps, Token } from '../types/auth.js'
import { checkToken } from '../apis/links.js'

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<Token>('')
  const [validToken, setValidToken] = useState<boolean>(false)

  useEffect(() => {
    const candidateToken = window.sessionStorage.getItem('token')
    if (candidateToken !== null) {
      setToken(candidateToken)
    }
  }, [])

  useEffect(() => {
    if (token === '') {
      setValidToken(false)
      return
    }
    const check = async (): Promise<void> => {
      const ok = await checkToken(token)
      setValidToken(ok)
    }
    void check()
  }, [token])

  return (
    <AuthContext.Provider value={{ token, validToken, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
