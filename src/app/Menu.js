import React, { Component } from 'react';

export default class Menu extends Component {
    render() {
        return (
            <div>
                <nav className="green darken-2" role="navigation">
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
                        </div>
                    </li>
                    <li><a href="profile.html"><i className="material-icons">perm_identity</i>Perfil</a></li>
                    <li><div className="divider"></div></li>
                    <li><a href="user_registration.html"><i className="material-icons">perm_identity</i>Registrar Usuario</a></li>
                    <li><div className="divider"></div></li>
                    <li>
                        <a href=""><i className="material-icons">book</i>Buscar Libro</a>
                        <div className="nav-wrapper">
                            <form>
                                <div className="input-field">
                                    <input id="search" type="search" required />
                                    <label className="label-icon" for="search"><a href="#"><i className="material-icons">search</i></a></label>
                                    <i class="material-icons">close</i>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li><div className="divider"></div></li>
                    <li>
                        <a href="book_edit.html"><i className="material-icons">book</i>Modificar Libro</a>
                        <div className="nav-wrapper">
                            <form>
                                <div className="input-field">
                                    <input id="search" type="search" required />
                                    <label className="label-icon" for="search"><a href="#"><i className="material-icons">search</i></a></label>
                                    <i class="material-icons">close</i>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li><div className="divider"></div></li>
                    <li><a href="book_registration.html"><i className="material-icons">book</i>Registrar Libro</a></li>
                    <li><div className="divider"></div></li>
                    <li><a href="my_valorations.html"><i className="material-icons">book</i>Mis Valoraciones</a></li>
                    <li><div className="divider"></div></li>
                </ul>   
            </div>
        )
    }
}

