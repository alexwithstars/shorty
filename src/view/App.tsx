import { JSX, useEffect, useState } from 'react'
import { AuthProvider } from './contexts/auth.js'
import { Form } from './components/Form.js'
import { Links } from './components/Links.js'
import { useAuth } from './hooks/useAuth.js'
import { PassModal } from './components/PassModal.js'
import { LinksProvider } from './contexts/links.js'
import { checkToken } from './apis/links.js'

interface ProvidersProps {
  children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <LinksProvider>
          {children}
        </LinksProvider>
      </AuthProvider>
    </>
  )
}

const App = (): JSX.Element => {
  return (
    <Providers>
      <Main />
    </Providers>
  )
}

const Main = (): JSX.Element => {
  const { token, setToken } = useAuth()
  const [validToken, setValidToken] = useState(false)

  useEffect(() => {
    const check = async (): Promise<void> => {
      const response = await checkToken(token)
      if (response) {
        setValidToken(true)
      } else {
        setValidToken(false)
      }
    }

    void check()
  }, [token])

  return (
    <>
      {validToken
        ? (
          <main className='main'>
            <h1 className='main_title'>Shorty</h1>
            <Form />
            <Links />
          </main>
          )
        : (
          <PassModal onSubmit={setToken} />
          )}
    </>
  )
}

export default App
