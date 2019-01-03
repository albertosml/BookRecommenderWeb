import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

import Chips, { Chip } from 'react-chips';

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chips: [],
            suggestions: [], 
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmpassword: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name] : value });
    }

    componentDidMount() {
        fetch('/verifysession',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.msg == 'NO') location.href = "/index.html";
            })
            .catch(err => console.log(err));

        fetch('/genrelist',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => { 
                // Preparo array de géneros de sugerencia
                let array = [];
                data.map(d => {
                    array.push(d.name);
                }); 

                // Inserto array de géneros de sugerencia
                this.setState({
                    suggestions: array
                });
            })   
            .catch(err => console.log(err));

        fetch('/user/data',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => { 
                this.setState({
                    chips: data.generos,
                    name: data.user.name,
                    surname: data.user.surname,
                    email: data.user.email
                });
            })   
            .catch(err => console.log(err));
    }

    unsubscribeUser() {
        M.toast({html: 'Usuario dado de baja'});
        {/* Con Express doy la página*/}
    }

    editUser() {
        M.toast({html: 'Usuario editado'});    
    }

    render() {
        return (
            <div>
                <Menu/>

                <h3 className="center-align">Perfil</h3>
                
                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <form onSubmit={this.editUser}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="name">Nombre</label>
                                    <input type="text" name="name" className="materialize-textarea" value={this.state.name} onChange={this.handleChange} /> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="surname">Apellidos</label> 
                                    <input type="text" name="surname" className="materialize-textarea" value={this.state.surname} onChange={this.handleChange} /> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="email">Correo Electrónico</label> 
                                    <input type="email" name="email" className="materialize-textarea" value={this.state.email} onChange={this.handleChange} /> 
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="password">Contraseña</label> 
                                    <input type="password" name="password" className="materialize-textarea" value={this.state.password} onChange={this.handleChange} />  
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="confirmpassword">Confirmar contraseña</label> 
                                    <input type="password" name="confirmpassword" className="materialize-textarea" value={this.state.confirm_password} onChange={this.handleChange} /> 
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col s12">
                                    <label htmlFor="genres">Géneros Favoritos</label> 
                                    <Chips value={this.state.chips} placeholder="Añada un género literario que le guste" onChange={chips => this.setState({ chips })} suggestions={this.state.suggestions} />
                                    <span className="helper-text" data-error="wrong" data-success="right">Si su género no aparece, pinche en el botón de añadir nuevo género e insértelo allí.</span>
                                </div>
                            </div>

                            <button style={{marginBottom: '4%', color: 'black'}} className="btn waves-effect waves-light light-green lighten-4" type="submit">
                                Modificar
                            </button>
                        </form>
                    </div>
                </div>

                <div className="center-align" style={{marginBottom: '4%'}}>
                    <button type="button" onClick={this.unsubscribeUser} className="waves-effect waves-light btn">Darse de baja</button> 
                </div>

                <div className="center-align" style={{marginBottom: '4%'}}>
                    <a className="waves-effect waves-light btn" href="add_genre.html">Añadir nuevo género</a>
                </div>
                
                <Footer/>
            </div>
        )
    }
}

render(<Perfil/>, document.getElementById('base'));
