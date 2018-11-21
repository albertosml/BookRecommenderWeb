import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

class ReadedBooks extends Component {
    seeBookDetails() {

    }

    valorateBook() {
        
    }

    render() {
        return (
            <div>
                <Menu/>
                
                <h3 className="center-align">Mis libros leídos</h3>
                
                <div className="row">
                    <div className="col s8 offset-s2 card orange darken-4">
                        <p>
                            La Mare Balena
                            <div className="right">
                                <a onClick={this.seeBookDetails} onMouseOver={() => M.toast({html: 'Más detalle del libro'})}><i class="material-icons">add</i></a>
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <a onClick={this.valorateBook} onMouseOver={() => M.toast({html: 'Valorar libro'})}><i class="material-icons">create</i></a>
                            </div>
                        </p>  
                    </div>
                </div>

                <div className="row">
                    <div className="col s8 offset-s2 card orange darken-4">
                        <p>
                            El Capitán Veneno
                            <div className="right">
                                <a onClick={this.seeBookDetails} onMouseOver={() => M.toast({html: 'Más detalle del libro'})}><i class="material-icons">add</i></a>
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <a onClick={this.valorateBook} onMouseOver={() => M.toast({html: 'Valorar libro'})}><i class="material-icons">create</i></a>
                            </div>
                        </p>  
                    </div>
                </div>

                <div className="row">
                    <ul class="pagination center-align">
                        <li class="disabled"><a onMouseOver={() => M.toast({html: 'Página Anterior'})}><i class="material-icons">chevron_left</i></a></li>
                        <li class="waves-effect"><a>1</a></li>
                        <li class="waves-effect"><a onMouseOver={() => M.toast({html: 'Página Siguiente'})}><i class="material-icons">chevron_right</i></a></li>
                    </ul>
                </div>

                <Footer/>
            </div>
        )
    }
}

render(<ReadedBooks/>, document.getElementById('base'));
