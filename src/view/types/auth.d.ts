export type Token = string

export interface AuthContextProps {
  validToken: boolean
  token: Token
  setToken: React.Dispatch<React.SetStateAction<Token>>
}

export interface AuthProviderProps {
  children: React.ReactNode
}
