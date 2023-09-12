
import React from "react"
import "./ImageGallery.css"
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem"
import PropTypes from "prop-types"


const ImageGallery = ({images, onImageClick})=> (
    
        <>
        <ul className="ImageGallery">
            {images.map (image =>{
                return(
                        <ImageGalleryItem
                            key={image.id}
                            image={image}
                            onImageClick={onImageClick}
                                />
                            )}
                        )}
        </ul>
        </>
    )

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
})
),
    onImageClick: PropTypes.func,
}

export default ImageGallery