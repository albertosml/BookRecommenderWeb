import React, { Component } from 'react';

export default class Menu extends Component {
    closeSession() {

    }

    render() {
        return (
            <div>
                <nav className="green" role="navigation">
                    <div className="nav-wrapper">
                        <a href="index.html" >BookRecommender</a>
                        <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
                    </div>
                </nav>
                <ul id="slide-out" className="sidenav">
                    <li>
                        <div className="user-view">
                            <div className="background"><img src="images/libros.jpg"/></div>
                            <span className="white-text name">albertosml</span>
                            <span className="white-text email">Alberto Silvestre Montes Linares</span>
                            <a href="start_session.html">Iniciar Sesión</a>
                            <a href="" onClick={this.closeSession}>Abandonar Sesión</a>
                        </div>
                    </li>
                    <li><a href="profile.html"><i className="material-icons">perm_identity</i>Perfil</a></li>
                    <li><div className="divider"></div></li>
                    <li><a href="user_registration.html"><i className="material-icons">perm_identity</i>Registrar Usuario</a></li>
                    <li><div className="divider"></div></li>
                    <li>
                        <div className="nav-wrapper">
                            <form action="book_details.html">
                                <div className="input-field"> 
                                    <input id="search" type="search" placeholder="Buscar Libro" required />
                                    <label className="label-icon" htmlFor="search"><a href="book_details.html"><i className="material-icons">search</i></a></label>
                                    <i className="material-icons">close</i>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li><div className="divider"></div></li>
                    <li><a href="book_registration.html"><i className="material-icons">book</i>Registrar Libro</a></li>
                    <li><div className="divider"></div></li>
                    <li><a href="my_valorations.html"><i className="material-icons">book</i>Mis Valoraciones</a></li>
                    <li><div className="divider"></div></li>
                    <li><a href="my_pending_books.html"><i className="material-icons">book</i>Mis Libros Pendientes</a></li>
                    <li><div className="divider"></div></li>
                    <li><a href="my_readed_books.html"><i className="material-icons">book</i>Mis Libros Leídos</a></li>
                    <li><div className="divider"></div></li>
                    <li><a href="my_recommended_books.html"><i className="material-icons">book</i>Mis Libros Recomendados</a></li>
                </ul>   
            </div>
        )
    }
}

