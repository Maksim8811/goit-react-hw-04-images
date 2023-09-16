import {useEffect} from "react"
import { createPortal } from "react-dom"
import "./Modal.css"
import PropTypes from "prop-types"

const modalRoot = document.querySelector('#modal-root')

function Modal ({onClose, imgState}) {

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown)

    return () => window.removeEventListener("keydown", handleKeydown)
  })

  const handleKeydown = e => {
    if(e.code === "Escape") {
      onClose()
    } else if (e.currentTarget === e.target) {
      onClose()
    }
  }

    return createPortal (
      <div className="Overlay" onClick={handleKeydown}>
      <div className="Modal">
      <img src={imgState} alt="img" />
        </div>
      </div>,
      modalRoot,
  )
}

Modal.propTypes = {
  onClose: PropTypes.func,
  imgState: PropTypes.string
}

export default Modal