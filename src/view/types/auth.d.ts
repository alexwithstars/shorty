export type Token = string

export interface AuthContextProps {
  token: Token
  setToken: React.Dispatch<React.SetStateAction<Token>>
}

export interface AuthProviderProps {
  children: React.ReactNode
}
