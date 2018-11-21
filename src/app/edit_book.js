import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

import Chips, { Chip } from 'react-chips';

class NewBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
          chips: ["Ficción" , "Humor"],
          suggestions: ["Ficción" , "Humor", "Amor", "Muerte", "Guerra", "Novela histórica", "Odio", "Aventuras"] 
        }
    }

    editBook() {
        M.toast({html: 'Libro editado'});    
    }

    render() {
        return (
            <div>
                <Menu/>

                <h3 className="center-align">Editar Libro: La Mare Balena</h3>
                
                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <form onSubmit={this.editBook}>
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
                                <div className="col s12">
                                    <label for="genres">Géneros</label> 
                                    <Chips value={this.state.chips} placeholder="Añada un género literario" onChange={chips => this.setState({ chips })} suggestions={this.state.suggestions} />
                                </div>
                            </div>

                            <div className="row">
                                &nbsp; &nbsp; <label for="image">Imagen</label> 
                                <div className="file-field input-field col s12">
                                    <div className="btn">
                                        <span>Archivo</span>
                                        <input type="file" accept="image/*"/>
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input className="file-path" id="image" name="image" defaultValue="foto_la_mare_balena.jpeg" type="text" />
                                    </div>
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

render(<NewBook/>, document.getElementById('base'));
