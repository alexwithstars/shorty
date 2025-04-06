import { createContext, useEffect, useState } from 'react'
import { LinksContextProps, LinksProviderProps, Links } from '../types/links.js'
import { getLinks } from '../apis/links.js'

export const LinksContext = createContext<LinksContextProps | undefined>(undefined)

export const LinksProvider: React.FC<LinksProviderProps> = ({ children }) => {
  const [links, setLinks] = useState<Links>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await getLinks()
      setLinks(data)
    }
    void fetchData()
  }, [])

  return (
    <LinksContext.Provider value={{ links, setLinks }}>
      {children}
    </LinksContext.Provider>
  )
}
