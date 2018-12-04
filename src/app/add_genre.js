import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

class NewGenre extends Component {
    addGenre(){
        M.toast({html: 'Género añadido'});
    }

    render() {
        return (
            <div>
                <Menu/>
                <h3 className="center-align">Nuevo Género Literario</h3>
                
                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <form onSubmit={this.addGenre}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="name">Nombre del género</label>
                                    <input type="text" id="name" name="name" className="materialize-textarea" defaultValue=""/> 
                                </div>
                            </div>

                            <button style={{marginBottom: '4%', color: 'black'}} class="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
                                Añadir
                            </button>
                        </form>
                    </div>
                </div>

                <div className="row">
                    <details className="col s8 offset-s2 card orange lighten-2">
                        <summary className="card-content white-text">Lista de géneros</summary>

                        <div className="col s8 offset-s1" style={{marginTop: '2%'}}>
                            Los géneros añadidos al sistema son: 
                            <p>- Ficción</p>
                            <p>- Amor</p> 
                            <p>- Aventuras</p>
                        </div>
                    </details>
                </div>

                <Footer/>
            </div>
        )
    }
}

render(<NewGenre/>, document.getElementById('base'));
