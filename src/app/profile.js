import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

class Perfil extends Component {
    render() {
        return (
            <div>
                <Menu/>

                <h3 className="center-align">Datos del usuario: albertosml</h3>
                
                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <form action="profile.html" method="post">
                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="name">Nombre</label>
                                    <input type="text" id="name" name="name" defaultValue="Alberto Silvestre"/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="surname">Apellidos</label> 
                                    <input type="text" id="surname" name="surname" defaultValue="Montes Linares"/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="password">Contraseña</label> 
                                    <input type="password" id="password" name="password" defaultValue="alberto"/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="email">Correo Electrónico</label> 
                                    <input type="email" id="email" name="email" defaultValue="albertosml@correo.ugr.es"/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="genres">Géneros Favoritos</label> 
                                    <input type="text" id="genres" name="genres" defaultValue="Ficción, Aventuras" /> 
                                    <span class="helper-text" data-error="wrong" data-success="right">Los géneros van separados por comas</span>
                                </div>
                            </div>

                            <button style={{marginBottom: '4%', color: 'black'}} class="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
                                Modificar
                            </button>
                        </form>
                    </div>
                </div>

                <div className="center-align" style={{marginBottom: '4%'}}>
                    <button type="button" onClick="darDeBaja()" className="waves-effect waves-light btn">Darse de baja</button> 
                </div>
        
                
                <Footer/>
            </div>
        )
    }
}

render(<Perfil/>, document.getElementById('base'));
