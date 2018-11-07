import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

class NewBook extends Component {
    render() {
        return (
            <div>
                <Menu/>

                <h3 className="center-align">Editar Libro: La Mare Balena</h3>
                
                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <form action="book.html" method="post">
                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="title">Título</label>
                                    <input type="text" id="title" name="title" defaultValue="La Mare Balena"/> 
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="author">Autor</label>
                                    <input type="text" id="author" name="author" defaultValue="Victor Catalá"/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="numpages">Número de páginas</label> 
                                    <input type="number" id="numpages" name="numpages" min="1" defaultValue="62"/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="date-field col s12">
                                    <label for="publicationdate">Fecha de publicación</label> 
                                    <input type="date" id="publicationdate" name="publicationdate" defaultValue="2014-08-08"/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="url">URL</label> 
                                    <input type="url" id="url" name="url" defaultValue="https://www.amazon.com/Mare-Balena-Catalan-Víctor-Català/dp/1500780170/ref=sr_1_3?ie=UTF8&qid=1539369463&sr=8-3&keywords=La+Mare-Balena" /> 
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="publisher">Editorial</label> 
                                    <input type="text" id="publisher" name="publisher" defaultValue="CreateSpace Independent Publishing Platform"/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="studio">Estudio</label> 
                                    <input type="text" id="studio" name="studio" defaultValue="CreateSpace Independent Publishing Platform"/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="language">Idioma</label> 
                                    <input type="text" id="language" name="language" defaultValue="Catalán"/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="genres">Géneros</label> 
                                    <input type="text" id="genres" name="genres" defaultValue="Historias Cortas, Humor"/> 
                                    <span class="helper-text" data-error="wrong" data-success="right">Los géneros van separados por comas</span>
                                </div>
                            </div>

                            <button style={{marginBottom: '4%', color: 'black'}} class="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
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

render(<NewBook/>, document.getElementById('base'));
