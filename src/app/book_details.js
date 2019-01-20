import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

import StarRatings from 'react-star-ratings';

class BookDetails extends Component {
    constructor() {
        super();
        this.state = {
            rating: 0,
            isbn: '',
            title: '',
            author: '',
            url: '',
            numpages: 0,
            publicationdate: '',
            publisher: '',
            studio: '',
            language: '',
            genres: [],
            type: ''
        };
    }

    componentDidMount() {
        fetch('/book/data',{
            method: 'POST',
            body: JSON.stringify({ isbn: window.location.search.split("=")[1] }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => { 
                if(data.data == undefined) location.href = '/index.html';

                this.setState({
                    title: data.data[0].title,
                    isbn: data.data[0].isbn,
                    author: data.data[0].author,
                    numpages: data.data[0].numpages,
                    genres: data.genres,
                    type: data.data[0].type
                });

                if(data.data[0].publicationdate != undefined) this.setState({ publicationdate: data.data[0].publicationdate });
                if(data.data[0].url.length > 0) this.setState({ url: data.data[0].url });
                if(data.data[0].publisher.length > 0) this.setState({ publisher: data.data[0].publisher });
                if(data.data[0].studio.length > 0) this.setState({ studio: data.data[0].studio });
                if(data.data[0].language.length > 0) this.setState({ language: data.data[0].language });
            })  
        .catch(err => console.log(err));
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
        M.toast({html: 'Le ha dado a \'No me gusta\' esta valoración'});
    }
    
    render() {
        return (
            <div>
                <Menu/>

                <div id="normal" className="row" style={{marginTop:'2%'}}>
                    <div className="col s4 offset-s2">
                        <img style={{width:'100px', height:'150px'}} src={"images/books/" + this.state.isbn + "." + this.state.type} alt="No hay imagen" />    
                    </div>

                    <div className="col s6">
                        <h3>
                            {this.state.title}
                            &nbsp;
                            <a href={"book_edit.html?isbn=" + this.state.isbn} className="tooltipped" data-position="right" data-delay="50" data-tooltip="Modificar Libro"><i className="material-icons">book</i></a> 
                        </h3>
                        <div className="row">
                            <button onClick={this.addPendingBook} className="btn waves-effect waves-light" type="submit" id="buttonPendientes">Agregar a Pendientes</button>
                            &nbsp; &nbsp; &nbsp;
                            <button className="btn waves-effect waves-light" onClick={() => alert(" - ISBN: " + this.state.isbn + "\n - Autor: " + this.state.author + "\n - Número de páginas: " + this.state.numpages + "\n - Fecha de publicación: " + this.state.publicationdate.split("T")[0] + "\n - URL: " + this.state.url + "\n - Editorial: " + this.state.publisher + "\n - Estudio: " + this.state.studio + "\n - Idioma: " + this.state.language + "\n - Géneros: " + this.state.genres)} type="submit" id="buttonDetalles">Datos del libro</button>
                        </div>
                    </div>
                </div>

                <div id="responsive" className="row" style={{marginTop:'2%'}}>
                    <div className="row">
                        <h4 className="center-align">
                            {this.state.title}
                            &nbsp;
                            <a href={"book_edit.html?isbn=" + this.state.isbn} className="tooltipped" data-position="right" data-delay="50" data-tooltip="Modificar Libro"><i className="material-icons">book</i></a> 
                        </h4>
                    </div>
                        <div className="row center-align">
                            <img style={{width:'100px', height:'150px', margin: 'auto'}} src={"images/books/" + this.state.isbn + "." + this.state.type} alt="No hay imagen" />
                        </div>    

                        <div className="row center-align">
                            <button onClick={this.addPendingBook} className="btn waves-effect waves-light" type="submit" id="buttonPendientes">Agregar a Pendientes</button>
                        </div>
                        <div className="row center-align">
                            <button className="btn waves-effect waves-light" onClick={() => alert(" - ISBN: " + this.state.isbn + "\n - Autor: " + this.state.author + "\n - Número de páginas: " + this.state.numpages + "\n - Fecha de publicación: " + this.state.publicationdate.split("T")[0] + "\n - URL: " + this.state.url + "\n - Editorial: " + this.state.publisher + "\n - Estudio: " + this.state.studio + "\n - Idioma: " + this.state.language + "\n - Géneros: " + this.state.genres)} type="submit" id="buttonDetalles">Datos del libro</button>
                        </div>
                </div>

                <div className="row">
                    <div className="col s8">
                        <ul className="tabs">
                            <li className="tab col s5 offset-s2"><a className="active green-text" href="#valoraciones">Valoraciones</a></li>
                            <li className="tab col s5"><a className="green-text" href="#comentarios">Comentarios</a></li>
                        </ul>
                    </div>
                    <div id="comentarios" className="col s10 offset-s1 green" style={{marginTop:"1%"}}>
                        <div className="row">
                            <details className="col s8 offset-s2 card orange lighten-2" style={{marginTop:"2%"}}>
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
                                    <ul className="pagination center-align">
                                        <li className="disabled"><a className="tooltipped" data-position="left" data-delay="50" data-tooltip="Página Anterior"><i className="material-icons">chevron_left</i></a></li>
                                        <li className="waves-effect"><a>1</a></li>
                                        <li className="waves-effect"><a className="tooltipped" data-position="right" data-delay="50" data-tooltip="Página Siguiente"><i className="material-icons">chevron_right</i></a></li>
                                    </ul>
                                </div>

                                <div className="col s10 offset-s1 card light-green lighten-3">
                                    <p className="center"><strong>Comentario</strong></p>
                                    <form onSubmit={this.addComment}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <label htmlFor="response">Respuesta</label> 
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
                            <ul className="pagination center-align">
                                <li className="disabled"><a className="tooltipped" data-position="left" data-delay="50" data-tooltip="Página Anterior"><i className="material-icons">chevron_left</i></a></li>
                                <li className="waves-effect"><a>1</a></li>
                                <li className="waves-effect"><a className="tooltipped" data-position="right" data-delay="50" data-tooltip="Página Siguiente"><i className="material-icons">chevron_right</i></a></li>
                            </ul>
                        </div>

                        <div className="row">
                            <div className="col s8 offset-s2 card light-green lighten-3">
                                <p className="center"><strong>Nuevo Tema</strong></p>
                                <form onSubmit={this.addTheme}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <label htmlFor="title">Título</label>
                                            <input type="text" id="title" name="title"  /> 
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="input-field col s12">
                                            <label htmlFor="comment">Comentario</label> 
                                            <textarea id="comment" className="materialize-textarea" rows="3" cols="50"></textarea> 
                                        </div>
                                    </div>

                                    <button style={{marginBottom: '4%', color: 'black'}} className="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
                                        Crear
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div id="valoraciones" className="col s10 offset-s1 green"  style={{marginTop:"1%"}}>
                        <div className="row">
                            <div className="col s8 offset-s2 card orange lighten-2" style={{marginTop:"2%"}}>
                                <p className="white-text center-align">La Mare Balena</p>

                                <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>albertosml realizó esta valoración el día 18/02/2018 a las 12:59:</strong></p> 
                                
                                <div className="row">
                                    <p className="col s10 offset-m1">&nbsp; &nbsp; &nbsp; &nbsp; El libro mola ya que el humor es muy chulo. Refleja la literatura catalana. Profe, menos mal que
                        hoy no hay clase porque tengo un resacón...</p>
                                </div>

                                <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>Nota:</strong> &nbsp; <StarRatings rating={3} starRatedColor="yellow" starDimension="20px" starSpacing="5px"/></p>

                                <a style={{color: 'black'}} onClick={this.addLike} data-position="left" data-delay="50" data-tooltip="Me gusta la valoración" className="left btn waves-effect waves-light light-green lighten-4 tooltipped">
                                    <i className="material-icons">thumb_up</i>
                                </a>
                                &nbsp; &nbsp; &nbsp;
                                <a style={{color: 'black'}} onClick={this.addDislike} data-position="right" data-delay="50" data-tooltip="No me gusta la valoración" className="btn waves-effect waves-light light-green lighten-4 tooltipped">
                                    <i className="material-icons">thumb_down</i>
                                </a>
                                <p className="right">&nbsp; &nbsp; &nbsp; &nbsp; <i className="material-icons">thumb_up</i> 3 &nbsp; &nbsp; <i className="material-icons">thumb_down</i> 0</p>
                            </div>
                        </div>

                        <div className="row">
                            <ul className="pagination center-align">
                                <li className="disabled"><a className="tooltipped" data-position="left" data-delay="50" data-tooltip="Página Anterior"><i className="material-icons">chevron_left</i></a></li>
                                <li className="waves-effect"><a>1</a></li>
                                <li className="waves-effect"><a className="tooltipped" data-position="right" data-delay="50" data-tooltip="Página Siguiente"><i className="material-icons">chevron_right</i></a></li>
                            </ul>
                        </div>

                        <div className="col s8 offset-s2 card light-green lighten-3">
                            <p className="center"><strong>Valoración</strong></p>
                            <form onSubmit={this.addValoration}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="description">Descripción</label> 
                                        <textarea id="description" name="description" className="materialize-textarea" rows="3" cols="50"></textarea> 
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="note">Nota</label> 
                                    </div>
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <StarRatings rating={this.state.rating} starRatedColor="yellow" starDimension="20px" starSpacing="5px" 
                                    changeRating={(rating,name) => this.changeRating(rating,name)} starEmptyColor="black" starHoverColor="yellow" numberOfStars={5} name='rating' />
                                </div>

                                <button style={{marginBottom: '4%', color: 'black'}} className="btn waves-effect waves-light light-green lighten-4" type="submit" id="button">
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
