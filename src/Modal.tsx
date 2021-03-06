import React from 'react'
import { Link } from 'react-router-dom'
import PrintButton from './PrintButton'

/**
 * React Component Modal
 * @param id id of modal div
 * @param title title of Modal
 * @param className css className for Modal, optional
 * @param children
 * @return Rendered React Component
 */
type ModalProps = {
  id: string
  title: string
  className?: string
  children: any
}
export const Modal = ({ id, title, className = '', children }: ModalProps) => (
  <div className={'conv-modal ' + className} id={id} tabIndex={-1}>
    <div className="modal-dialog">
      <div>
        <div className="conv-modal-header">
          <h5>{title}</h5>
          <button type="button" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div className="conv-modal-body">{children}</div>
      </div>
    </div>
  </div>
)

type ImageModalProps = {
  id: string
  title: string
  className?: string
  url: string
}
const ImageModal = ({ id, title, className, url }: ImageModalProps) => {
  let child
  if (!url) {
    child = (
      <div className="conv-image-modal conv-image-modal-loading">
        {'...generating image'}
      </div>
    )
  } else {
    child = (
      <div className="conv-image-modal conv-image-modal-loaded">
        <div>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img className="img-fluid" src={`${url}?ts=${Date.now()}`} />
          </a>
        </div>
        <div>
          <a
            className="text-secondary"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click to view the original image.
          </a>
        </div>
        <div>
          <PrintButton url={url} />
        </div>
      </div>
    )
  }
  return <Modal {...{ id, title, className }}>{child}</Modal>
}

type ImageLinkModalProps = {
  id: string
  title: string
  className?: string
  url: string
}
export const ImageLinkModal = ({
  id,
  title,
  className,
  url
}: ImageLinkModalProps) => {
  if (!url || url === 'None') {
    return <span>No Image</span>
  }
  return (
    <React.Fragment>
      <Link to={`show-${id}`} data-toggle="modal" data-target={'#' + id}>
        Click to view
      </Link>
      <ImageModal {...{ id, title, className, url }} />
    </React.Fragment>
  )
}
