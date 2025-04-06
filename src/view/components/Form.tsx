import { JSX, useRef, useState } from 'react'
import './Form.css'
import { useLinks } from '../hooks/useLinks.js'
import { LinkEntry } from '../../models/types.js'

export const Form = (): JSX.Element => {
  const [aliasError, setAliasError] = useState<string>('')
  const [urlError, setUrlError] = useState<string>('')
  const [uiState, setUiState] = useState<string>('')

  const { createLink } = useLinks()
  const button = useRef<HTMLButtonElement>(null)
  const successTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (button.current === null) throw new Error('Button not found')

    const target = event.currentTarget
    const formData = new FormData(target)
    const newField: LinkEntry = {
      url: formData.get('url')?.toString() ?? '',
      alias: formData.get('alias')?.toString() ?? ''
    }

    if (successTimeout.current !== null) {
      clearTimeout(successTimeout.current)
    }
    setUiState('loading')
    const errors = await createLink(newField)
    if (errors !== undefined) {
      setAliasError(errors.find(error => error.path === 'alias')?.message ?? '')
      setUrlError(errors.find(error => error.path === 'url')?.message ?? '')
      setUiState('')
      return
    }
    setUiState('success')
    successTimeout.current = setTimeout(() => {
      setUiState('')
    }, 1500)
    setAliasError('')
    setUrlError('')
    target.reset()
  }

  return (
    <form onSubmit={(e) => { void handleSubmit(e) }} className='main_form' id='mainForm'>
      <section className='main_form_inputs'>
        <label>
          <span className='label'>URL</span>
          <input type='text' name='url' id='url' placeholder='https://somesite.com' />
          {urlError.length > 0 && <span className='error'>{urlError}</span>}
        </label>
        <label>
          <span className='label'>Alias</span>
          <input type='text' name='alias' id='alias' placeholder='some' />
          {aliasError.length > 0 && <span className='error'>{aliasError}</span>}
        </label>
      </section>
      <button type='submit' className={`main_form_button ${uiState}`} ref={button}>
        <span id='label'>Shorten</span>
        <span id='done'>Done</span>
        <div id='loader' />
      </button>
    </form>
  )
}
