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
          author: '',
          url: '',
          numpages: 0,
          publicationdate: '',
          publisher: '',
          studio: '',
          language: '',
          chips_old: [],
          title_old: '',
          author_old: '',
          url_old: '',
          numpages_old: 0,
          publicationdate_old: '',
          publisher_old: '',
          studio_old: '',
          language_old: '',
          image: null,
          path: '',
          type: '',
          type_old: ''
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
                    author_old: data.data[0].author,
                    numpages_old: data.data[0].numpages,
                    chips_old: data.genres,
                    chips: data.genres
                });

                if(data.data[0].publicationdate != undefined) this.setState({ publicationdate_old: data.data[0].publicationdate });
                if(data.data[0].url.length > 0) this.setState({ url_old: data.data[0].url });
                if(data.data[0].publisher.length > 0) this.setState({ publisher_old: data.data[0].publisher });
                if(data.data[0].studio.length > 0) this.setState({ studio_old: data.data[0].studio });
                if(data.data[0].language.length > 0) this.setState({ language_old: data.data[0].language });
                if(data.data[0].type.length > 0) this.setState({ type_old: data.data[0].type });
            })   
            .catch(err => console.log(err));
    }

    fileSelectedHandle(e) {
        this.setState({ 
            image: e.target.files[0],
            type: e.target.files[0].type.split("/")[1]
        });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name] : value });
    }

    uploadImage() {
        const data = new FormData();
        data.append('image', this.state.image, this.state.isbn + "." + this.state.image.type.split("/")[1]);

        fetch('/uploadimage',{
            method: 'POST', 
            body: data
        })
            .then(res => res.json())
            .then(data => {
                if(data.msg.length == 0) {
                    M.toast({html: 'Problema al subir la imagen. Inténtelo otra vez'});
                    this.setState({ 
                        image: null,
                        path: '',
                        type: ''
                    });
                }
                else location.href = "/book_details.html?isbn=" + this.state.isbn;
            })
            .catch(err => console.log(err));
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
                if(data.msg.length == 0) {
                    // Si se ha introducido la imagen y el titulo, la subo y obtengo su ruta
                    if(this.state.image && this.state.isbn) this.uploadImage();
                    else location.href = "/book_details.html?isbn=" + this.state.isbn;
                } 
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
                                <div className="input-field col s12">
                                    <label htmlFor="author">Autor</label>
                                    <input type="text" name="author" className="materialize-textarea" value={this.state.author} onChange={this.handleChange} /> 
                                    <span className="helper-text" data-error="wrong" data-success="right">Autor actual: {this.state.author_old}</span>
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
                                    <span className="helper-text" data-error="wrong" data-success="right">URL actual: {this.state.url_old}</span>
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
                                    <label htmlFor="studio">Estudio</label> 
                                    <input type="text" name="studio" className="materialize-textarea" value={this.state.studio} onChange={this.handleChange} /> 
                                    <span className="helper-text" data-error="wrong" data-success="right">Estudio actual: {this.state.studio_old}</span>
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
                                </div>
                            </div>

                            <div className="row">
                                &nbsp; &nbsp; <label htmlFor="image">Imagen</label> 
                                <div className="file-field input-field col s12">
                                    <div className="btn">
                                        <span>Archivo</span>
                                        <input type="file" onChange={this.fileSelectedHandle} accept="image/*"/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path" name="image" value={this.state.path} onChange={this.handleChange} type="text" />
                                    </div>
                                    <span className="helper-text" data-error="wrong" data-success="right">Las imágenes que se suban a esta web deben ser libres, es decir, que no tengan derechos de autor; en el caso de que se suba una imagen que no sea libre, la responsabilidad caerá sobre usted.</span>
                                </div>
                            </div>

                            <button style={{marginBottom: '4%', color: 'black'}} className="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
                                Editar
                            </button>
                        </form>
                    </div>
                </div>

                <div className="center-align" style={{marginBottom: '4%'}}>
                    <a className="waves-effect waves-light btn" href="add_genre.html">Añadir nuevo género</a>
                </div>
                
                <Footer/>
            </div>
        )
    }
}

render(<EditBook/>, document.getElementById('base'));
