import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

import StarRatings from 'react-star-ratings';

class BookDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        };
    }

    changeRating( newRating, name ) {
        this.setState({
          rating: newRating
        });
    }

    addPendingBook() {
        M.toast({html: 'Libro añadido como pendiente de leer'});
    }

    addValoration() {
        M.toast({html: 'Valoración añadida'});
    }

    addComment() {
        M.toast({html: 'Comentario añadido'});
    }

    addTheme() {
        M.toast({html: 'Tema añadido'});
    }

    addLike() {
        M.toast({html: 'Le ha dado a \'Me gusta\' esta valoración'});
    }

    addDislike() {
        M.toast({html: 'Le ha dado a \'Mo me gusta\' esta valoración'});
    }
    
    render() {
        return (
            <div>
                <Menu/>

                <div className="row" style={{marginTop:'2%'}}>
                    <div className="col s4 offset-s2">
                        <img style={{width:'100px', height:'150px'}} src="images/la_mare_balena.JPEG" />    
                    </div>

                    <div className="col s6">
                        <h3>
                            La Mare Balena 
                            &nbsp;
                            <a href="book_edit.html"><i onMouseOver={() => M.toast({html: 'Modificar Libro'})} className="material-icons">book</i></a> 
                        </h3>
                        <div className="row">
                            <button onClick={this.addPendingBook} className="btn waves-effect waves-light" type="submit" id="buttonPendientes">Agregar a Pendientes</button>
                            &nbsp; &nbsp; &nbsp;
                            <button className="btn waves-effect waves-light" onClick={() => alert(" - ISBN: 98145566156 \n - Autor: Victor Català \n - Número de páginas: 62 \n - Fecha de publicación: 09/08/2018 \n - URL: https://www.amazon.com/Mare-Balena-Catalan-Víctor-Català/dp/1500780170/ref=sr_1_3?ie=UTF8&qid=1539369463&sr=8-3&keywords=La+Mare-Balena \n - Editorial: CreateSpace Independent Publishing Platform \n - Estudio: CreateSpace Independent Publishing Platform \n - Idioma: Catalán \n - Géneros: Historias Cortas, Humor")} type="submit" id="buttonDetalles">Datos del libro</button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col s8">
                        <ul className="tabs">
                            <li className="tab col s5 offset-s2"><a className="active green-text" href="#valoraciones">Valoraciones</a></li>
                            <li className="tab col s5"><a className="green-text" href="#comentarios">Comentarios</a></li>
                        </ul>
                    </div>
                    <div id="comentarios" className="col s10 offset-s1 green darken-2" style={{marginTop:"1%"}}>
                        <div className="row">
                            <details className="col s8 offset-s2 card orange darken-4" style={{marginTop:"2%"}}>
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

                                <div className="col s10 offset-s1 card light-green lighten-3">
                                    <p className="center"><strong>Comentario</strong></p>
                                    <form onSubmit={this.addComment}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <label for="response">Respuesta</label> 
                                                <textarea id="response" className="materialize-textarea" rows="3" cols="50"></textarea> 
                                            </div>
                                        </div>
                                        
                                        <button style={{marginBottom: '4%', color: 'black'}} className="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
                                            Comentar
                                        </button>
                                    </form>
                                </div>
                            </details>
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
                    </div>
                    <div id="valoraciones" className="col s10 offset-s1 green darken-2"  style={{marginTop:"1%"}}>
                        <div className="row">
                            <div className="col s8 offset-s2 card orange darken-4" style={{marginTop:"2%"}}>
                                <p className="white-text center-align">La Mare Balena</p>

                                <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>albertosml realizó esta valoración el día 18/02/2018 a las 12:59:</strong></p> 
                                
                                <div className="row">
                                    <p className="col s10 offset-m1">&nbsp; &nbsp; &nbsp; &nbsp; El libro mola ya que el humor es muy chulo. Refleja la literatura catalana. Profe, menos mal que
                        hoy no hay clase porque tengo un resacón...</p>
                                </div>

                                <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>Nota:</strong> &nbsp; <StarRatings rating={3} starRatedColor="yellow" starDimension="20px" starSpacing="5px"/></p> 

                                <a style={{color: 'black'}} onClick={this.addLike} onMouseOver={() => M.toast({html: 'Me gusta la valoración'})} className="left btn waves-effect waves-light light-green lighten-4">
                                    <i className="material-icons">thumb_up</i>
                                </a>
                                &nbsp; &nbsp; &nbsp;
                                <a style={{color: 'black'}} onClick={this.addDislike} onMouseOver={() => M.toast({html: 'No me gusta la valoración'})} className="btn waves-effect waves-light light-green lighten-4">
                                    <i className="material-icons">thumb_down</i>
                                </a>
                                <p className="right">&nbsp; &nbsp; &nbsp; &nbsp; <i className="material-icons">thumb_up</i> 3 &nbsp; &nbsp; <i className="material-icons">thumb_down</i> 0</p>
                            </div>
                        </div>

                        <div className="row">
                            <ul class="pagination center-align">
                                <li class="disabled"><a onMouseOver={() => M.toast({html: 'Página Anterior'})}><i class="material-icons">chevron_left</i></a></li>
                                <li class="waves-effect"><a>1</a></li>
                                <li class="waves-effect"><a onMouseOver={() => M.toast({html: 'Página Siguiente'})}><i class="material-icons">chevron_right</i></a></li>
                            </ul>
                        </div>

                        <div className="col s8 offset-s2 card light-green lighten-3">
                            <p className="center"><strong>Valoración</strong></p>
                            <form onSubmit={this.addValoration}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label for="description">Descripción</label> 
                                        <textarea id="description" name="description" className="materialize-textarea" rows="3" cols="50"></textarea> 
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <label for="note">Nota</label> 
                                    </div>
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <StarRatings rating={this.state.rating} starRatedColor="yellow" starDimension="20px" starSpacing="5px" 
                                    changeRating={(rating,name) => this.changeRating(rating,name)} starEmptyColor="black" starHoverColor="yellow" numberOfStars={5} name='rating' />
                                </div>

                                <button style={{marginBottom: '4%', color: 'black'}} class="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
                                    Valorar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
        
                <Footer/>
            </div>
        )
    }
}

render(<BookDetails/>, document.getElementById('base'));
