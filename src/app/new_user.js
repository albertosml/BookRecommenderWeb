import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

class NewUser extends Component {
    render() {
        return (
            <div>
                <Menu/>

                <h3 className="center-align">Nuevo Usuario</h3>
                
                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <form action="/start_session.html" method="post">
                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="username">Nombre de usuario</label>
                                    <input type="text" id="username" name="username" className="materialize-textarea" defaultValue=""/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="password">Contraseña</label> 
                                    <input type="password" id="password" name="password" className="materialize-textarea" defaultValue=""/> 
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="name">Nombre</label>
                                    <input type="text" id="name" name="name" className="materialize-textarea" defaultValue=""/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="surname">Apellidos</label> 
                                    <input type="text" id="surname" name="surname" className="materialize-textarea" defaultValue=""/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="email">Correo Electrónico</label> 
                                    <input type="email" id="email" name="email" className="materialize-textarea" defaultValue=""/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="genres">Géneros Favoritos</label> 
                                    <input type="text" id="genres" name="genres" className="materialize-textarea" defaultValue="" /> 
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

render(<NewUser/>, document.getElementById('base'));
