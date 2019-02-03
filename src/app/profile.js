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
            confirmpassword: '',
            chips_old: [],
            name_old: '',
            surname_old: '',
            email_old: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name] : value });
    }

    componentWillMount() {
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
                    name: '',
                    surname: '',
                    email: '',
                    chips_old: data.generos,
                    name_old: data.user.name,
                    surname_old: data.user.surname,
                    email_old: data.user.email
                });
            })   
            .catch(err => console.log(err));
    }

    editUser(e) {
        e.preventDefault();
        fetch('/user/profile',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => { 
                if(data.msg.length == 0) M.toast({html: 'Usuario editado'}); 
                else M.toast({html: data.msg});

                // Actualizo los cambios en el formulario
                if(this.state.name.length >0) this.setState({ name: '', name_old: this.state.name });
                if(this.state.surname.length >0) this.setState({ surname: '', surname_old: this.state.surname });
                if(this.state.email.length >0) this.setState({ email: '', email_old: this.state.email });

                // Vacío los campos relacionados con la contraseña
                this.setState({ password: '', confirmpassword: ''});
            })   
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <Menu/>

                <h3 className="center-align">Perfil</h3>
                
                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <p className="center">Rellene los campos que quiera modificar</p>
                        <form onSubmit={this.editUser}>
                            <div className="row">
                                <div className="input-field col s12">    
                                    <label htmlFor="name">Nombre</label>
                                    <input type="text" name="name" className="materialize-textarea" value={this.state.name} onChange={this.handleChange} /> 
                                    <span className="helper-text" data-error="wrong" data-success="right">Nombre actual: {this.state.name_old}</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="surname">Apellidos</label> 
                                    <input type="text" name="surname" className="materialize-textarea" value={this.state.surname} onChange={this.handleChange} /> 
                                    <span className="helper-text" data-error="wrong" data-success="right">Apellidos actuales: {this.state.surname_old}</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="email">Correo Electrónico</label> 
                                    <input type="email" name="email" className="materialize-textarea" value={this.state.email} onChange={this.handleChange} /> 
                                    <span className="helper-text" data-error="wrong" data-success="right">Email actual: {this.state.email_old}</span>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="password">Contraseña</label> 
                                    <input type="password" name="password" className="materialize-textarea" value={this.state.password} onChange={this.handleChange} />  
                                    <span className="helper-text" data-error="wrong" data-success="right">Para modificar la contraseña, introduzca una nueva y confirmela.</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="confirmpassword">Confirmar contraseña</label> 
                                    <input type="password" name="confirmpassword" className="materialize-textarea" value={this.state.confirmpassword} onChange={this.handleChange} /> 
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col s12">
                                    <label htmlFor="genres">Géneros Favoritos</label> 
                                    <Chips value={this.state.chips} placeholder="Añada un género literario que le guste" onChange={chips => this.setState({ chips })} suggestions={this.state.suggestions} />
                                    <span className="helper-text" data-error="wrong" data-success="right">Si su género no aparece, pinche en el botón de añadir nuevo género e insértelo allí.</span>
                                    <br/>
                                    <span className="helper-text" data-error="wrong" data-success="right">Cuando seleccione un género, no le de a la tecla de 'INTRO', sino que lo seleccione con el ratón.</span>
                                </div>
                            </div>

                            <button style={{marginBottom: '4%', color: 'black'}} className="btn waves-effect waves-light light-green lighten-4" type="submit">
                                Modificar
                            </button>
                        </form>
                    </div>
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
