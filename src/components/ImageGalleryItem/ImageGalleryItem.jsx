import React from "react";
import "./ImageGalleryItem.css"
import PropTypes from "prop-types"

 const ImageGalleryItem = ({image, onImageClick}) => {
        const fullImage = () => onImageClick(image.largeImageURL)
        return (
    
            <li>
                <img className="ImageGalleryItem-image ImageGalleryItem"
                src={image.largeImageURL} 
                alt={image.tags} 
                onClick={fullImage}/>  
            </li>
                )
    }

    ImageGalleryItem.propTypes = {
        image: PropTypes.shape({
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,   
            }
        ),
        onImageClick: PropTypes.func,
    }

export default ImageGalleryItem