import React, {Component} from "react"
import Searchbar from "./Searchbar/Searchbar"
import ImageGallery from "./ImageGallery/ImageGallery"
import Button from "./Button/Button"
import Loader from "./Loader/Loader"
import Modal from "./Modal/Modal"
import "./App.css"
import fetchImages from "../api/api-services"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


class App extends Component {

  state = {
    images: [],
    searchName: "",
    buttonShow: false,
    galleryPage: 1,
    isLoading: false,
    showModal: false,
    error: null,
    largeImage: "",
    totalHits: 0,
  }

componentDidUpdate(prevProps, prevState) {
  if(prevState.searchName !== this.state.searchName) {
    this.getImages()
    
  }
}

onSubmitForm = nameSearch => {
  this.setState({
    searchName: `${nameSearch}`,
    images: [],
    galleryPage: 1,
  })
}

getImages = async () => {
  
  const { searchName} = this.state
  this.setState({
    isLoading: true,
  })

try {
  const {totalHits, hits} = await fetchImages(searchName, (this.state.galleryPage))
  this.setState(prevState=>({
    images: [...prevState.images, ...hits],
    galleryPage: prevState.galleryPage + 1,
    totalHits: totalHits,
    searchName: searchName,
  }))
}
catch (error) {
        console.log('Smth wrong with App fetch', error);
        this.setState({ error })

} finally {
  this.setState({
    isLoading: false,
  })
}
}

handleGalleryItem = fullImageUrl => {
      this.setState({
        largeImage: fullImageUrl,
        showModal: true,
      });
    };

toggleModal = () => {
  this.setState(prevState=>({
    showModal:!prevState.showModal,
    largeImage: "",
  }))
}

  render () {
    const { images, isLoading, showModal, totalHits } = this.state;
    const needToShowLoadMore = totalHits>12 && totalHits>images.length
    
    return (
      <div className="App">
      <Searchbar onSubmit={this.onSubmitForm}/>
      <ImageGallery images={images} onImageClick={this.handleGalleryItem}/>
      {isLoading && <Loader />}
      {needToShowLoadMore &&<Button onClick={this.getImages}/>}
      {showModal&&<Modal onClose={this.toggleModal} imgState={this.state.largeImage}>
        {/* <>
          <img src={this.state.largeImage} alt="img" />
        </> */}
        </Modal>}
      <ToastContainer/>
      </div>
      )
  }
}

export default App


