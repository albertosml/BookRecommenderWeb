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
          chips_author: [],
          numpages: 0,
          publicationdate: '',
          url: '',
          publisher: '',
          language: '',
          image: null,
          path: ''
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
        console.log(this.state.path)
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
                    this.setState({ isbn: data.isbn});
                    location.href = "/book_details.html?isbn=" + this.state.isbn;
                }
                else M.toast({html: data.msg});
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
                                    <input type="text" name="isbn" className="materialize-textarea" value={this.state.isbn} onChange={this.handleChange} /> 
                                    <span className="helper-text" data-error="wrong" data-success="right">Para rellenado automático, introduzca sólo el ISBN del libro. En el caso de que no se los podamos proporcionar, rellénelos usted mismo.</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="title">Título</label>
                                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} /> 
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col s12">
                                    <label htmlFor="authors">Autores</label> 
                                    <Chips value={this.state.chips_author} placeholder="Añada los autores..." onChange={chips_author => this.setState({ chips_author })} />
                                    <span className="helper-text" data-error="wrong" data-success="right">Después de escribir el nombre de cada autor, presione la tecla "TAB" o tabulador para almacenarlo.</span>
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
                                    <label htmlFor="language">Idioma</label> 
                                    <input type="text" name="language" value={this.state.language} onChange={this.handleChange}/> 
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
                                    <span className="helper-text" data-error="wrong" data-success="right">Las imágenes que se suban a esta web deben ser libres, es decir, sin derechos de autor y, de un tamaño menor a 16MB. No nos haremos responsables de las imágenes subidas a esta web que no sean libres.</span>
                                </div>
                            </div> 
                            
                            <button style={{marginBottom: '4%', color: 'black'}} className="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
                                Registrar
                            </button>
                        </form>
                    </div>
                </div>
                
                <Footer/>
            </div>
        )
    }
}

render(<NewBook/>, document.getElementById('base'));
