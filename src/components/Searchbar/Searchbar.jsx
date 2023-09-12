import {useState} from "react";
import "./Searchbar.css"
import  {toast}  from 'react-toastify';
import PropTypes from "prop-types"


function Searchbar ({onSubmit}) {
    const [searchForm, setSearchForm] = useState('')

    const handleChange = evt => {
    setSearchForm(evt.currentTarget.value.toLowerCase())
            }

    const handleSubmit = evt => {
                        const form = evt.currentTarget
                        evt.preventDefault()
                        if(searchForm.trim() === "") {
                            toast.error("Enter your search!")
                            return
                        }
                        onSubmit(searchForm)
                        form.reset()
                    }

        return(
                <div>
                <header className="Searchbar">
                <form onSubmit={handleSubmit} className="SearchForm">
                <button type="submit" className="SearchForm-button ">
                <span className="SearchForm-button-label">Search</span>
                </button>
                        
                <input
                className="SearchForm-input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={handleChange}
                />
                </form>
                </header>
                </div>
                                )
                                
            }

Searchbar.propTypes = {
    searchForm: PropTypes.string,
}

export default Searchbar