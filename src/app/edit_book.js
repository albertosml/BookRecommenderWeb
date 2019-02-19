import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

import Chips, { Chip } from 'react-chips';

class EditBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
          chips: [],
          suggestions: [],
          isbn: '',
          title: '',
          chips_author: [],
          url: '',
          numpages: 0,
          publicationdate: '',
          publisher: '',
          language: '',
          chips_old: [],
          title_old: '',
          chips_author_old: [],
          url_old: '',
          numpages_old: 0,
          publicationdate_old: '',
          publisher_old: '',
          language_old: '',
          image: null,
          path: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.editBook = this.editBook.bind(this);
        this.fileSelectedHandle = this.fileSelectedHandle.bind(this);
    }

    componentWillMount() {
        fetch('/genrelist',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => { 
                // Preparo array de géneros de sugerencia
                let array = [];
                data.map(d => {
                    array.push(d.name);
                }); 

                // Inserto array de géneros de sugerencia
                this.setState({
                    suggestions: array
                });
            })   
            .catch(err => console.log(err));

        fetch('/book/data',{
            method: 'POST',
            body: JSON.stringify({ isbn: window.location.search.split("=")[1] }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => { 
                if(data.data == undefined) location.href = '/index.html';

                this.setState({
                    title_old: data.data[0].title,
                    isbn: data.data[0].isbn,
                    chips_author_old: data.data[0].authors,
                    chips_author: data.data[0].authors,
                    numpages_old: data.data[0].numpages,
                    chips_old: data.genres,
                    chips: data.genres
                });

                if(data.data[0].publicationdate != undefined) this.setState({ publicationdate_old: data.data[0].publicationdate });
                if(data.data[0].url.length > 0) this.setState({ url_old: data.data[0].url });
                if(data.data[0].publisher.length > 0) this.setState({ publisher_old: data.data[0].publisher });
                if(data.data[0].language.length > 0) this.setState({ language_old: data.data[0].language });
            })   
            .catch(err => console.log(err));
    }

    fileSelectedHandle(e) {
        // Image
        var file = document.querySelector('input[type="file"]').files[0];
        
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => this.setState({ image: reader.result });

        // Path 
        this.setState({ path: e.target.path.value });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name] : value });
    }
             
    editBook(e) {   
        e.preventDefault();

        fetch('/book/edit',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => { 
                if(data.msg.length == 0) location.href = "/book_details.html?isbn=" + this.state.isbn;
                else M.toast({html: data.msg});
            })   
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <Menu/>

                <h3 className="center-align">Editar Libro con ISBN: {this.state.isbn}</h3>
                
                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <form onSubmit={this.editBook}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="title">Título</label>
                                    <input type="text" name="title" className="materialize-textarea" value={this.state.title} onChange={this.handleChange}/> 
                                    <span className="helper-text" data-error="wrong" data-success="right">Título actual: {this.state.title_old}</span>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col s12">
                                    <label htmlFor="authors">Autores</label> 
                                    <Chips value={this.state.chips_author} placeholder="Añada los autores..." onChange={chips_author => this.setState({ chips_author })} />
                                    <span className="helper-text" data-error="wrong" data-success="right">Después de escribir el nombre de cada autor, presionar la tecla Tab para almacenarlo.</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="numpages">Número de páginas</label> 
                                    <input type="number" name="numpages" min="0" className="materialize-textarea" value={this.state.numpages} onChange={this.handleChange} /> 
                                    <span className="helper-text" data-error="wrong" data-success="right">Número de páginas actual: {this.state.numpages_old}</span> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="date-field col s12">
                                    <label htmlFor="publicationdate">Fecha de publicación</label> 
                                    <input type="date" name="publicationdate" className="materialize-textarea" value={this.state.publicationdate} onChange={this.handleChange} /> 
                                    <span className="helper-text" data-error="wrong" data-success="right">Fecha de publicación actual: {this.state.publicationdate_old.split("T")[0]}</span> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="url">URL</label> 
                                    <input type="url" name="url" className="materialize-textarea" value={this.state.url} onChange={this.handleChange} /> 
                                    <span className="helper-text" data-error="wrong" data-success="right">URL actual: <a href={this.state.url_old}>Ver URL</a></span>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="publisher">Editorial</label> 
                                    <input type="text" name="publisher" className="materialize-textarea" value={this.state.publisher} onChange={this.handleChange} /> 
                                    <span className="helper-text" data-error="wrong" data-success="right">Editorial actual: {this.state.publisher_old}</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="language">Idioma</label> 
                                    <input type="text" name="language" className="materialize-textarea" value={this.state.language} onChange={this.handleChange} /> 
                                    <span className="helper-text" data-error="wrong" data-success="right">Idioma actual: {this.state.language_old}</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col s12">
                                    <label htmlFor="genres">Géneros</label> 
                                    <Chips value={this.state.chips} placeholder="Añada un género literario" onChange={chips => this.setState({ chips })} suggestions={this.state.suggestions} />
                                    <span className="helper-text" data-error="wrong" data-success="right">Busque sú género en el autocompletado y selecciónelo con el ratón. Si su género no aparece, introdúzcalo y pulse a la tecla 'TAB' o tabulador.</span>
                                </div>
                            </div>

                            <div className="row">
                                &nbsp; &nbsp; <label htmlFor="image">Imagen</label> 
                                <div className="file-field input-field col s12">
                                    <div className="btn">
                                        <span>Archivo</span>
                                        <input type="file" name="image" onChange={this.fileSelectedHandle} accept="image/*"/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path" name="path" defaultValue={this.state.path} type="text" />
                                    </div>
                                    <span className="helper-text" data-error="wrong" data-success="right">Las imágenes que se suban a esta web deben ser libres, es decir, que no tengan derechos de autor y, también, que tengan un tamaño menor de 16MB; en el caso de que se suba una imagen que no sea libre, la responsabilidad caerá sobre usted.</span>
                                </div>
                            </div>

                            <button style={{marginBottom: '4%', color: 'black'}} className="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
                                Editar
                            </button>
                        </form>
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }
}

render(<EditBook/>, document.getElementById('base'));
