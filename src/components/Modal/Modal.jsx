import React, {Component} from "react";
import { createPortal } from "react-dom";
import "./Modal.css"
import PropTypes from "prop-types"

const modalRoot = document.querySelector('#modal-root')

class Modal extends Component {

  componentDidMount () {
    window.addEventListener("keydown", this.handleKeydown)

  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown)
  }

  handleKeydown = e => {
    if(e.code === "Escape") {
      this.props.onClose()
    }
  }

  handleBackDropClick = e => {
    if(e.currentTarget === e.target) {
      this.props.onClose()
    }
  }

  render () {
    return createPortal (
      <div className="Overlay" onClick={this.handleBackDropClick}>
      <div className="Modal">
      {this.props.children}
        </div>
      </div>,
      modalRoot,
  
   
    )
    
  }
}


Modal.propTypes = {
  children: PropTypes.object,
  onClose: PropTypes.func,
}

export default Modal