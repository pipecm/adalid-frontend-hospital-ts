import React from "react";

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.searchField = React.createRef();
    }
    
    componentDidMount() {
        this.searchField.current.focus();
    }

    checkSearchTerm(e) {
        if(e.target.value && !/^[A-Za-z]+$/.test(e.target.value)) {
            alert('Ingrese sólo letras');
            this.searchField.current.value = "";
            this.searchField.current.focus(); 
        }
    }

    submitSearch(e) {
        e.preventDefault();
        alert('Búsqueda en construcción');
        this.searchField.current.focus();
        this.searchField.current.value = "";
    }
  
    render() {
        return (
            <div className='card mt-5' id="search">
                <h2>Buscador</h2>
                <form className="search-form" onSubmit={this.submitSearch}>
                    <input type="text" name="searchField" className="form-control" ref={this.searchField} onChange={this.checkSearchTerm} required/>
                    <button type="submit" className="btn btn-primary">Buscar</button>
                </form>
            </div>
        )
    }
}

export default SearchComponent;