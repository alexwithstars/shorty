import { JSX } from 'react/jsx-runtime'
import './Loading.css'

export const Loading = (): JSX.Element => {
  return (
    <div className='loading'>
      <div className='loading__spinner' />
    </div>
  )
}
