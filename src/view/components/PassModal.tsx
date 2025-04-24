import { useEffect, useRef, useState } from 'react'
import { checkToken } from '../apis/links.js'
import './PassModal.css'

interface Props {
  onSubmit: (password: string) => void
}

export const PassModal: React.FC<Props> = ({ onSubmit }) => {
  const input = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState<boolean>(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const token = formData.get('token')?.toString() ?? ''

    const response = await checkToken(token)
    if (response) {
      window.sessionStorage.setItem('token', token)
      onSubmit(token)
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (input.current !== null) {
      input.current.focus()
    }
  }, [input.current])
  return (
    <div className='pass_modal'>
      <form onSubmit={e => { void handleSubmit(e) }} className='pass_modal__form'>
        <section className='pass_modal__header'>
          <h2 className='pass_modal__title'>Password Required</h2>
          <p className='pass_modal__description'>Please enter your password to continue.</p>
        </section>
        <section className='pass_modal__body'>
          <label className='pass_modal__label'>
            <span className='pass_modal__label_text'>Password</span>
            <input
              type='password'
              placeholder='Password'
              name='token'
              className='pass_modal__input'
              ref={input}
            />
            {error && <span className='pass_modal__error'>Invalid password</span>}
          </label>
          <button type='submit' className='pass_modal__button'>Submit</button>
        </section>
      </form>
    </div>
  )
}
