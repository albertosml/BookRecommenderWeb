import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

class Inicio extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <h3 className="center-align">Temas</h3>
                <div className="row">
                    <details className="col s8 offset-s2 card orange darken-4">
                        <summary className="card-content white-text">Clase de pilates del lunes</summary>

                        <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>admin (18/02/2018 - 12:59):</strong></p> 
                        <p className="col s12 offset-m1">Os comunicamos que el próximo lunes no habrá clase de pilates debido a la enfermedad del técnico.</p>

                        <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>albertosml (19/02/2018 - 00:45):</strong></p> 
                        <p className="col s12 offset-m1">Que se ponga el profesor bueno.</p>

                        <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>Pepe (19/02/2018 - 10:45):</strong></p> 
                        <p className="col s12 offset-m1">Profe, menos mal que
            hoy no hay clase porque tengo un resacón...</p>

                        <div className="col s10 offset-s1 card light-green lighten-3">
                            <p className="center"><strong>Comentario</strong></p>
                            <form action="foro.html" method="post">
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
                        <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                        <li class="waves-effect"><a href="#!">1</a></li>
                        <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
                    </ul>
                </div>

                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <p className="center"><strong>Nuevo Tema</strong></p>
                        <form action="foro.html" method="post">
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
