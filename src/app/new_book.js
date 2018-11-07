import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

class NewBook extends Component {
    render() {
        return (
            <div>
                <Menu/>

                <h3 className="center-align">Nuevo Libro</h3>
                
                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <form action="book.html" method="post">
                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="isbn">ISBN</label>
                                    <input type="text" id="isbn" name="isbn" defaultValue=""/> 
                                    <span class="helper-text" data-error="wrong" data-success="right">Si quiere hacer rellenado automático, introduzca sólo el ISBN del libro, el resto de datos se los intentaremos proporcionar, si no se los podemos proporcionar, rellénelos usted</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="title">Título</label>
                                    <input type="text" id="title" name="title" defaultValue=""/> 
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="author">Autor</label>
                                    <input type="text" id="author" name="author" defaultValue=""/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="numpages">Número de páginas</label> 
                                    <input type="number" id="numpages" name="numpages" min="1" defaultValue=""/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="date-field col s12">
                                    <label for="publicationdate">Fecha de publicación</label> 
                                    <input type="date" id="publicationdate" name="publicationdate" defaultValue=""/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="url">URL</label> 
                                    <input type="url" id="url" name="url" defaultValue="" /> 
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="publisher">Editorial</label> 
                                    <input type="text" id="publisher" name="publisher" defaultValue=""/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="studio">Estudio</label> 
                                    <input type="text" id="studio" name="studio" defaultValue=""/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="language">Idioma</label> 
                                    <input type="text" id="language" name="language" defaultValue=""/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="genres">Géneros</label> 
                                    <input type="text" id="genres" name="genres" defaultValue=""/> 
                                    <span class="helper-text" data-error="wrong" data-success="right">Los géneros van separados por comas</span>
                                </div>
                            </div>

                            <button style={{marginBottom: '4%', color: 'black'}} class="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
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
