import { JSX } from 'react'
import { Link } from './Link.js'
import './Links.css'
import { useLinks } from '../hooks/useLinks.js'

export const Links = (): JSX.Element => {
  const { links } = useLinks()

  return (
    <section className='links'>
      {links.map((link) => (
        <Link key={link.id} id={link.id} url={link.url} alias={link.alias} />
      ))}
    </section>
  )
}
