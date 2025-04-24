import { JSX } from 'react/jsx-runtime'
import './Loading.css'

export const Loading = (): JSX.Element => {
  return (
    <div className='loading'>
      <div className='spinner' />
      <div className='loading-text'>Loading...</div>
    </div>
  )
}
