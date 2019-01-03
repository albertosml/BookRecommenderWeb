import React, { Component } from 'react';

export default class Menu extends Component {
    constructor(){
        super();
        this.state = { username: '', name: '' };
        this.closeSession = this.closeSession.bind(this);
    }

    componentDidMount() {
        fetch('/user',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.msg.length == 0) this.setState({username: data.username, name: data.name });
            })
            .catch(err => console.log(err));
    }

    closeSession() {
        fetch('/users/signout',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                M.toast({html: data.msg});
                this.forceUpdate();
            })
            .catch(err => console.log(err));
    }

    render() {
        if(this.state.username.length > 0) {
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
                                <span className="white-text name">{this.state.username}</span>
                                <span className="white-text email">{this.state.name}</span>
                                <a href="" onClick={this.closeSession}>Abandonar Sesión</a>
                            </div>
                        </li>
                        <li><a href="profile.html"><i className="material-icons">perm_identity</i>Perfil</a></li>
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
        else {
            return (
                <div>
                    <nav className="green" role="navigation">
                        <div className="nav-wrapper">
                            <a href="index.html">BookRecommender</a>
                            <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
                        </div>
                    </nav>
                    <ul id="slide-out" className="sidenav">
                        <li>
                            <div className="user-view">
                                <div className="background"><img src="images/libros.jpg"/></div>
                                <span className="white-text name">No conectado</span>
                                <a href="start_session.html">Iniciar Sesión</a>
                            </div>
                        </li>
                        <li><a href="user_registration.html"><i className="material-icons">perm_identity</i>Registrar Usuario</a></li>
                        <li><div className="divider"></div></li>
                        <li><a href="book_registration.html"><i className="material-icons">book</i>Registrar Libro</a></li>
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
                    </ul>   
                </div>
            )
        }
        
    }
}

