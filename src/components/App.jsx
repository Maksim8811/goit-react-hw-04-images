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
const [buttonShow, setButtonShow] = useState(false)
const [galleryPage, setGalleryPage] = useState(1)
const [isLoading, setIsLoading] = useState(false)
const [showModal, setShowModal] = useState(false)
const [error, setError] = useState(null)
const [largeImage, setLargeImage] = useState("")
const [totalHits, setTotalHits] = useState(0)

// useEffect(() => {
//   if(prevSearchName !== searchName) {
//     getImages()
//   }
// })

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
        setError({ error })

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
// class App extends Component {

//   state = {
//     images: [],
//     searchName: "",
//     buttonShow: false,
//     galleryPage: 1,
//     isLoading: false,
//     showModal: false,
//     error: null,
//     largeImage: "",
//     totalHits: 0,
//   }

// componentDidUpdate(prevProps, prevState) {
//   if(prevState.searchName !== this.state.searchName) {
//     this.getImages()
    
//   }
// }

// onSubmitForm = nameSearch => {
//   this.setState({
//     searchName: `${nameSearch}`,
//     images: [],
//     galleryPage: 1,
//   })
// }

// getImages = async () => {
  
//   const { searchName} = this.state
//   this.setState({
//     isLoading: true,
//   })

// try {
//   const {totalHits, hits} = await fetchImages(searchName, (this.state.galleryPage))
//   this.setState(prevState=>({
//     images: [...prevState.images, ...hits],
//     galleryPage: prevState.galleryPage + 1,
//     totalHits: totalHits,
//     searchName: searchName,
//   }))
// }
// catch (error) {
//         console.log('Smth wrong with App fetch', error);
//         this.setState({ error })

// } finally {
//   this.setState({
//     isLoading: false,
//   })
// }
// }

// handleGalleryItem = fullImageUrl => {
//       this.setState({
//         largeImage: fullImageUrl,
//         showModal: true,
//       });
//     };

// toggleModal = () => {
//   this.setState(prevState=>({
//     showModal:!prevState.showModal,
//     largeImage: "",
//   }))
// }

//   render () {
//     const { images, isLoading, showModal, totalHits } = this.state;
//     const needToShowLoadMore = totalHits>12 && totalHits>images.length
    
//     return (
//       <div className="App">
//       <Searchbar onSubmit={this.onSubmitForm}/>
//       <ImageGallery images={images} onImageClick={this.handleGalleryItem}/>
//       {isLoading && <Loader />}
//       {needToShowLoadMore &&<Button onClick={this.getImages}/>}
//       {showModal&&<Modal onClose={this.toggleModal} imgState={this.state.largeImage}>
//         {/* <>
//           <img src={this.state.largeImage} alt="img" />
//         </> */}
//         </Modal>}
//       <ToastContainer/>
//       </div>
//       )
//   }
// }

export default App


