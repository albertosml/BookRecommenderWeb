import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

class Inicio extends Component {
    constructor(props) {
        super(props);
    }

    addTheme(){
        M.toast({html: 'Tema Creado'});
    }

    addComment() {
        M.toast({html: 'Comentario Realizado'});
    }

    render() {
        return (
            <div>
                <Menu/>
                <h3 className="center-align">Temas</h3>
                <div className="row">
                    <details className="col s8 offset-s2 card orange lighten-2">
                        <summary className="card-content white-text">Clase de pilates del lunes</summary>

                        <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>admin (18/02/2018 - 12:59):</strong></p> 
                        <div className="row">
                            <p className="col s10 offset-m1">&nbsp; &nbsp; &nbsp; &nbsp; El libro mola ya que el humor es muy chulo. Refleja la literatura catalana. Profe, menos mal que
                hoy no hay clase porque tengo un resacón...</p>
                        </div>

                        <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>albertosml (19/02/2018 - 00:45):</strong></p> 
                        <div className="row">
                            <p className="col s10 offset-m1">&nbsp; &nbsp; &nbsp; &nbsp; El libro mola ya que el humor es muy chulo. Refleja la literatura catalana. Profe, menos mal que
                hoy no hay clase porque tengo un resacón...</p>
                        </div>

                        <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>Pepe (19/02/2018 - 10:45):</strong></p> 
                        <div className="row">
                            <p className="col s10 offset-m1">&nbsp; &nbsp; &nbsp; &nbsp; El libro mola ya que el humor es muy chulo. Refleja la literatura catalana. Profe, menos mal que
                hoy no hay clase porque tengo un resacón...</p>
                        </div>

                        <div className="row">
                            <ul class="pagination center-align">
                                <li class="disabled"><a className="tooltipped" data-position="left" data-delay="50" data-tooltip="Página Anterior"><i class="material-icons">chevron_left</i></a></li>
                                <li class="waves-effect"><a>1</a></li>
                                <li class="waves-effect"><a className="tooltipped" data-position="right" data-delay="50" data-tooltip="Página Siguiente"><i class="material-icons">chevron_right</i></a></li>
                            </ul>
                        </div>

                        <div className="col s10 offset-s1 card light-green lighten-3">
                            <p className="center"><strong>Comentario</strong></p>
                            <form onSubmit={this.addComment}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label for="response">Respuesta</label> 
                                        <textarea id="response" className="materialize-textarea" rows="3" cols="50"></textarea> 
                                    </div>
                                </div>
                                
                                <button style={{marginBottom: '4%', color: 'black'}} class="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
                                    Comentar
                                </button>
                            </form>
                        </div>
                    </details>
                </div>

                <div className="row">
                    <ul class="pagination center-align">
                        <li class="disabled"><a className="tooltipped" data-position="left" data-delay="50" data-tooltip="Página Anterior"><i class="material-icons">chevron_left</i></a></li>
                        <li class="waves-effect"><a>1</a></li>
                        <li class="waves-effect"><a className="tooltipped" data-position="right" data-delay="50" data-tooltip="Página Siguiente"><i class="material-icons">chevron_right</i></a></li>
                    </ul>
                </div>

                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <p className="center"><strong>Nuevo Tema</strong></p>
                        <form onSubmit={this.addTheme}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="title">Título</label>
                                    <input type="text" id="title" name="title"  /> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="comment">Comentario</label> 
                                    <textarea id="comment" className="materialize-textarea" rows="3" cols="50"></textarea> 
                                </div>
                            </div>

                            <button style={{marginBottom: '4%', color: 'black'}} class="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
                                Crear
                            </button>
                        </form>
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }
}

render(<Inicio/>, document.getElementById('base'));
