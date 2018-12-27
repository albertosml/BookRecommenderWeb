import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

class NewGenre extends Component {
    constructor(){
        super();
        this.state = { name: '', list: [] };
        this.handleChange = this.handleChange.bind(this);
        this.addGenre = this.addGenre.bind(this);
    }
    
    addGenre(e) {
        e.preventDefault();
        fetch('/newgenre',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.msg.length == 0) M.toast({html: 'Género añadido'});
                else M.toast({html: data.msg});
                this.setState({ name: ''});
                this.mountGenresList();
            })
            .catch(err => console.log(err));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name] : value });
    }

    mountGenresList() {
        fetch('/genrelist',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => { 
                this.setState({
                    list: data
                });
            })   
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.mountGenresList();
    }

    render() {
        return (
            <div>
                <Menu/>
                <h3 className="center-align">Nuevo Género Literario</h3>
                
                <div className="row">
                    <div className="col s8 offset-s2 card light-green lighten-3">
                        <form onSubmit={this.addGenre}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="name">Nombre del género</label>
                                    <input type="text" name="name" className="materialize-textarea" value={this.state.name} onChange={this.handleChange} /> 
                                </div>
                            </div>

                            <button style={{marginBottom: '4%', color: 'black'}} className="btn waves-effect waves-light light-green lighten-4" type="submit">
                                Añadir
                            </button>
                        </form>
                    </div>
                </div>

                <div className="row">
                    <details className="col s8 offset-s2 card orange lighten-2">
                        <summary className="card-content white-text">Lista de géneros añadidos</summary>

                        <div className="col s8 offset-s1" style={{marginTop: '2%', marginBottom: '2%'}}>
                            {
                                this.state.list.map(l => {
                                    return (
                                        <p key={l.name}>- {l.name}</p>
                                    )
                                })
                            }
                        </div>
                    </details>
                </div>

                <Footer/>
            </div>
        )
    }
}

render(<NewGenre/>, document.getElementById('base'));
