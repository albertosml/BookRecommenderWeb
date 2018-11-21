import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

class RecommendedBooks extends Component {
    requestRecommendation() {
        M.toast({'html': 'Recomendación solicitada'});
    }

    seeBookDetails() {

    }

    removeRecommendedBook() {

    }

    render() {
        return (
            <div>
                <Menu/>
                
                <h3 className="center-align">Mis libros recomendados</h3>
                
                <div className="row">
                    <div className="col s8 offset-s2 card orange darken-4">
                        <p>
                            La Mare Balena
                            <div className="right">
                                <a onClick={this.seeBookDetails} onMouseOver={() => M.toast({html: 'Más detalle del libro'})}><i class="material-icons">add</i></a>
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <a onClick={this.removeRecommendedBook} onMouseOver={() => M.toast({html: 'Quitar libro recomendado'})}><i class="material-icons">remove</i></a>
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
                                <a onClick={this.removeRecommendedBook} onMouseOver={() => M.toast({html: 'Quitar libro recomendado'})}><i class="material-icons">remove</i></a>
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
                
                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <p className="center-align">¿En qué quiere que nos basemos más para hacerle la recomendación?</p>                                                
                        <div className="row">
                            <form onSubmit={this.requestRecommendation}>
                                <div className="row">
                                    <p className="col s2 offset-s1">Valoraciones</p>
                                    <div className="col s6">
                                        <p class="range-field">
                                            <input type="range" id="barra" min="0" max="100" />
                                        </p>
                                    </div>
                                    <p className="col s2">&nbsp; &nbsp; &nbsp; Comentarios</p>
                                </div> 
                                
                                
                                <div className="row">
                                    <div className="center-align">
                                        <button style={{color: 'black'}} className="btn waves-effect waves-light light-green lighten-4">
                                            Solicitar
                                        </button>
                                    </div>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>


                <Footer/>
            </div>
        )
    }
}

render(<RecommendedBooks/>, document.getElementById('base'));
