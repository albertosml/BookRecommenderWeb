import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="page-footer green darken-2">
                    <div className="container">
                        TFG realizado por Alberto Silvestre Montes Linares
                        <a className="grey-text text-lighten-4 right" href="details.html">Detalles del proyecto</a>
                    </div>
                </footer>
            </div>
        )    
    }
}
