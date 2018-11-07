import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

class NewSession extends Component {
    render() {
        return (
            <div>
                <Menu/>

                <h3 className="center-align">Iniciar Sesión</h3>
                
                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <form action="index.html" method="post">
                        <div className="row">
                                <div className="input-field col s12">
                                    <label for="username">Nombre de usuario</label>
                                    <input type="text" id="username" name="username" className="materialize-textarea"/> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="password">Contraseña</label> 
                                    <input type="password" id="password" name="password" className="materialize-textarea"/> 
                                </div>
                            </div>

                            <button style={{marginBottom: '4%', color: 'black'}} class="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
                                Iniciar
                            </button>
                        </form>
                    </div>
                </div>
                
                <Footer/>
            </div>
        )
    }
}

render(<NewSession/>, document.getElementById('base'));
