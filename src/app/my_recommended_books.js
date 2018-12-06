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
                    <div className="col s8 offset-s2 card orange lighten-2">
                        <p>
                            La Mare Balena
                            <div className="right">
                                <a onClick={this.seeBookDetails} className="tooltipped" data-position="left" data-delay="50" data-tooltip="Más detalle del libro"><i class="material-icons">add</i></a>
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <a onClick={this.removeRecommendedBook} className="tooltipped" data-position="right" data-delay="50" data-tooltip="Quitar libro recomendado"><i class="material-icons">remove</i></a>
                            </div>
                        </p>  
                    </div>
                </div>

                <div className="row">
                    <div className="col s8 offset-s2 card orange lighten-2">
                        <p>
                            El Capitán Veneno
                            <div className="right">
                                <a onClick={this.seeBookDetails} className="tooltipped" data-position="left" data-delay="50" data-tooltip="Más detalle del libro"><i class="material-icons">add</i></a>
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <a onClick={this.removeRecommendedBook} className="tooltipped" data-position="right" data-delay="50" data-tooltip="Quitar libro recomendado"><i class="material-icons">remove</i></a>
                            </div>
                        </p>  
                    </div>
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
                        <p className="center-align">¿En qué quiere que nos basemos más para hacerle la recomendación?</p>                                                
                        <div className="row">
                            <form onSubmit={this.requestRecommendation}>
                                <div id="normal" className="row">
                                    <p className="col s2 offset-s1">Valoraciones</p>
                                    <div className="col s6">
                                        <p class="range-field">
                                            <input type="range" id="barra" min="0" max="100" />
                                        </p>
                                    </div>
                                    <p className="col s2">&nbsp; &nbsp; &nbsp; Comentarios</p>
                                </div> 

                                <div id="responsive" className="row">
                                    <p className="row center-align">Valoraciones</p>
                                    <div className="row">
                                        <p class="col s6 offset-s3 range-field center-align">
                                            <input type="range" id="barra" min="0" max="100" />
                                        </p>
                                    </div>
                                    <p className="row center-align">Comentarios</p>
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
