import React, { Component } from 'react';
import { AutoComplete, MuiThemeProvider } from 'material-ui';

export default class Menu extends Component {
    constructor(props){
        super(props);
        this.state = { username: '', name: '', options: [], value: '' };
        this.closeSession = this.closeSession.bind(this);
    }

    componentWillMount() {
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

        fetch('/title', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    options: data.data
                });
            })
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
                location.href = "/index.html"
                this.forceUpdate();
            })
            .catch(err => console.log(err));
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
        
                {(() => {
                    if(this.state.username == "admin") {
                        return (
                            <ul id="slide-out" className="sidenav">
                                <li>
                                    <div className="user-view">
                                        <div className="background"><img src="images/libros.jpg"/></div>
                                        <span className="white-text name">{this.state.username}</span>
                                        <span className="white-text email">{this.state.name}</span>
                                        <a href="" onClick={this.closeSession}>Abandonar Sesión</a>
                                    </div>
                                </li>
        
                                <li><a href="suggestions.html"><i className="material-icons">remove_red_eye</i>Ver Sugerencias</a></li>
                                <li><a href="new_suggestion.html"><i className="material-icons">edit</i>Nueva Sugerencia</a></li>
                            </ul>
                        )
                    }
                    else if(this.state.username.length > 0) {
                        return (
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
                                <li><a href="book_registration.html"><i className="material-icons">book</i>Registrar Libro</a></li>
                                <li><a href="new_suggestion.html"><i className="material-icons">edit</i>Nueva Sugerencia</a></li>
                                <li><div className="divider"></div></li>
                                <li>
                                    <div className="center">
                                        <MuiThemeProvider>
                                            <AutoComplete hintText="Buscar libro..." dataSource={this.state.options} dataSourceConfig={{ text: 'label', value: 'label' }}
                                                          onUpdateInput={(value) => this.setState({ value: value.split(" - ")[1] })} 
                                                          filter={(searchText, key) => {return searchText.toUpperCase() !== '' && key.toUpperCase().indexOf(searchText.toUpperCase()) !== -1;}}  />
                                        </MuiThemeProvider>
                                    </div>
                                    <div className="center">
                                        <button className="btn" onClick={() => { if(this.state.value.match("[0-9]+")) location.href = "/book_details.html?isbn=" + this.state.value }}><i className="material-icons">search</i></button> 
                                    </div>
                                </li>
                                <li><div className="divider"></div></li>
                                <li><a href="my_valorations.html"><i className="material-icons">book</i>Mis Valoraciones</a></li>
                                <li><a href="my_pending_books.html"><i className="material-icons">book</i>Mis Libros Pendientes</a></li>
                                <li><a href="my_readed_books.html"><i className="material-icons">book</i>Mis Libros Leídos</a></li>
                                <li><a href="my_recommended_books.html"><i className="material-icons">book</i>Mis Libros Recomendados</a></li>
                            </ul>
                        )
                    }
                    else {
                        return (
                            <ul id="slide-out" className="sidenav">
                                <li>
                                    <div className="user-view">
                                        <div className="background"><img src="images/libros.jpg"/></div>
                                        <span className="white-text name">No conectado</span>
                                        <a href="start_session.html">Iniciar Sesión</a>
                                    </div>
                                </li>
        
                                <li><a href="user_registration.html"><i className="material-icons">perm_identity</i>Registrar Usuario</a></li>
                                <li><a href="book_registration.html"><i className="material-icons">book</i>Registrar Libro</a></li>
                                <li><a href="new_suggestion.html"><i className="material-icons">edit</i>Nueva Sugerencia</a></li>
                                <li><div className="divider"></div></li>
                                <li>
                                    <div className="center">
                                        <MuiThemeProvider>
                                            <AutoComplete hintText="Buscar libro..." dataSource={this.state.options} dataSourceConfig={{ text: 'label', value: 'label' }}
                                                          onUpdateInput={(value) => this.setState({ value: value.split(" - ")[1] })} 
                                                          filter={(searchText, key) => {return searchText.toUpperCase() !== '' && key.toUpperCase().indexOf(searchText.toUpperCase()) !== -1;}}  />
                                        </MuiThemeProvider>
                                    </div>
                                    <div className="center">
                                        <button className="btn" onClick={() => { if(this.state.value.match("[0-9]+")) location.href = "/book_details.html?isbn=" + this.state.value }}><i className="material-icons">search</i></button> 
                                    </div>   
                                </li>
                                <li><div className="divider"></div></li>
                            </ul> 
                        )
                    }
                })()}   
            </div>
        )
    }
}

