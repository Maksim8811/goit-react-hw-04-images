import {useState, useEffect} from "react"
import Searchbar from "./Searchbar/Searchbar"
import ImageGallery from "./ImageGallery/ImageGallery"
import Button from "./Button/Button"
import Loader from "./Loader/Loader"
import Modal from "./Modal/Modal"
import "./App.css"
import fetchImages from "../api/api-services"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App () {

const [images, setImages] = useState([])
const [searchName, setSearchName] = useState("")
const [galleryPage, setGalleryPage] = useState(1)
const [isLoading, setIsLoading] = useState(false)
const [showModal, setShowModal] = useState(false)
const [largeImage, setLargeImage] = useState("")
const [totalHits, setTotalHits] = useState(0)

useEffect(() => {
  
  if(searchName) {
    getImages()
  }


},[searchName])

const getImages = async () => {

setIsLoading(true)
  
try {
  const {totalHits, hits} = await fetchImages(searchName, galleryPage)
  setImages(prevState => [...prevState, ...hits])
  setGalleryPage(prevState => prevState + 1)
  setTotalHits(totalHits)
  setSearchName(searchName)
}

catch (error) {
        console.log('Smth wrong with App fetch', error);
        

} finally {
  setIsLoading(false)
}
}

const onSubmitForm = nameSearch => {
  setSearchName(`${nameSearch}`)
  setImages([])
  setGalleryPage(1)
}

const handleGalleryItem = fullImageUrl => {
      setLargeImage(fullImageUrl)
      setShowModal(true)
    };

const toggleModal = () => {
      setShowModal(prevState => !prevState)
      setLargeImage("")
}

    const needToShowLoadMore = totalHits>12 && totalHits>images.length


return (
  <div className="App">
        <Searchbar onSubmit={onSubmitForm}/>
        <ImageGallery images={images} onImageClick={handleGalleryItem}/>
        {isLoading && <Loader />}
        {needToShowLoadMore &&<Button onClick={getImages}/>}
        {showModal&&<Modal onClose={toggleModal} imgState={largeImage}>
        </Modal>}
        <ToastContainer/>
        </div>
)

}

export default App


