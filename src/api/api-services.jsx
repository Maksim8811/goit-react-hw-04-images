import axios from "axios";

const fetchImages = async (query, galleryPage) => {
    let per_page = 12
    const {data} = await  axios.get(`https://pixabay.com/api/?key=31290162-40f32dd3366e200868c1207df&q=${query}&page=${galleryPage}&image_type=photo&per_page=${per_page}`)
              return data
           }
export default fetchImages