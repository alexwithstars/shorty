import './Link.css'
import { useLinks } from '../hooks/useLinks.js'
import { ClipboardIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Props {
  id: string
  url: string
  alias: string
}

export const Link: React.FC<Props> = ({ id, url, alias }) => {
  const { deleteLink } = useLinks()
  const handleCopy: React.MouseEventHandler = () => {
    void navigator.clipboard.writeText(url)
  }
  const handleDelete: React.MouseEventHandler = () => {
    void deleteLink(id)
  }
  return (
    <div className='link'>
      <section className='link_info'>
        <a href={url} target='_blank' rel='noreferrer'>{alias}</a>
        <span>{url}</span>
      </section>
      <section className='link_actions'>
        <button type='button' onClick={handleCopy} title='Copy'>
          <ClipboardIcon />
        </button>
        <button type='button' title='Edit'>
          <PencilIcon />
        </button>
        <button type='button' onClick={handleDelete} title='Delete'>
          <TrashIcon />
        </button>
      </section>
    </div>
  )
}
