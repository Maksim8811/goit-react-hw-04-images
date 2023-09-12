import React, {Component} from "react";
import "./Searchbar.css"
import  {toast}  from 'react-toastify';
import PropTypes from "prop-types"

class Searchbar extends Component {

    state = {
        searchForm: "",
    }

    handleChange = evt => {
        this.setState({searchForm: evt.currentTarget.value.toLowerCase()})
    }

    handleSubmit = evt => {
        const form = evt.currentTarget
        evt.preventDefault()
        if(this.state.searchForm.trim() === "") {
            toast.error("Enter your search!")
            return
        }
        this.props.onSubmit(this.state.searchForm)
        form.reset()
    }

    render() {
        return(
            <div>
            <header className="Searchbar">
            <form onSubmit={this.handleSubmit} className="SearchForm">
            <button type="submit" className="SearchForm-button ">
            <span className="SearchForm-button-label">Search</span>
            </button>

         <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            />
        </form>
</header>
</div>
        )
        
    }
}

Searchbar.propTypes = {
    searchForm: PropTypes.string,
}

export default Searchbar

