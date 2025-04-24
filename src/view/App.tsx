import { JSX } from 'react'
import { AuthProvider } from './contexts/auth.js'
import { Form } from './components/Form.js'
import { Links } from './components/Links.js'
import { useAuth } from './hooks/useAuth.js'
import { PassModal } from './components/PassModal.js'
import { LinksProvider } from './contexts/links.js'

const App = (): JSX.Element => {
  return (
    <AuthWrapper />
  )
}

const AuthWrapper = (): JSX.Element => {
  return (
    <AuthProvider>
      <AuthLayer />
    </AuthProvider>
  )
}

const AuthLayer = (): JSX.Element => {
  const { validToken, setToken } = useAuth()

  return (
    <>
      {validToken
        ? (
          <Providers>
            <Main />
          </Providers>
          )
        : <PassModal onSubmit={setToken} />}
    </>
  )
}

interface ProvidersProps {
  children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <LinksProvider>
        {children}
      </LinksProvider>
    </>
  )
}

const Main = (): JSX.Element => {
  return (
    <main className='main'>
      <h1 className='main_title'>Shorty</h1>
      <Form />
      <Links />
    </main>
  )
}

export default App
