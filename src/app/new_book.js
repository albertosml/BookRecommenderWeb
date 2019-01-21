import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

import Chips, { Chip } from 'react-chips';

class NewBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
          chips: [],
          suggestions: [],
          isbn: '',
          title: '',
          author: '',
          numpages: 0,
          publicationdate: '',
          url: '',
          publisher: '',
          studio: '',
          language: '',
          image: null,
          path: '',
          type: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.newBook = this.newBook.bind(this);
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

    newBook(e) {
        e.preventDefault();

        fetch('/book/signup',{
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
                else {
                    M.toast({html: data.msg});
                    this.setState({ 
                        image: null,
                        path: '',
                        type: '' 
                    });
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <Menu/>

                <h3 className="center-align">Nuevo Libro</h3>

                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <form onSubmit={this.newBook} encType="multipart/form-data">
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="isbn">ISBN</label>
                                    <input type="number" name="isbn" className="materialize-textarea" value={this.state.isbn} onChange={this.handleChange} /> 
                                    <span className="helper-text" data-error="wrong" data-success="right">Si quiere hacer rellenado automático, introduzca sólo el ISBN del libro, el resto de datos se los intentaremos proporcionar, si no se los podemos proporcionar, rellénelos usted</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="title">Título</label>
                                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} /> 
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="author">Autor</label>
                                    <input type="text" name="author" value={this.state.author} onChange={this.handleChange} /> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="numpages">Número de páginas</label> 
                                    <input type="number" name="numpages" min="0" value={this.state.numpages} onChange={this.handleChange} /> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="date-field col s12">
                                    <label htmlFor="publicationdate">Fecha de publicación</label> 
                                    <input type="date" name="publicationdate" value={this.state.publicationdate} onChange={this.handleChange} /> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="url">URL</label> 
                                    <input type="url" name="url" value={this.state.url} onChange={this.handleChange} /> 
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="publisher">Editorial</label> 
                                    <input type="text" name="publisher" value={this.state.publisher} onChange={this.handleChange} /> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="studio">Estudio</label> 
                                    <input type="text" name="studio" value={this.state.studio} onChange={this.handleChange} /> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="language">Idioma</label> 
                                    <input type="text" name="language" value={this.state.language} onChange={this.handleChange}/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="col s12">
                                    <label htmlFor="genres">Géneros</label> 
                                    <Chips value={this.state.chips} placeholder="Añada un género literario" onChange={chips => this.setState({ chips })} suggestions={this.state.suggestions} />
                                    <span className="helper-text" data-error="wrong" data-success="right">Cuando seleccione un género, no le de a la tecla de 'INTRO', sino que lo seleccione con el ratón.</span>
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
                                Registrar
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

render(<NewBook/>, document.getElementById('base'));
