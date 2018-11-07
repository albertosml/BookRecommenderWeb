import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

class Inicio extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <h3 className="center-align">Mis valoraciones</h3>
                <div className="row">
                    <div className="col s8 offset-s2 card orange darken-4">
                        <p className="white-text center-align">La Mare Balena</p>

                        <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>Valoración hecha el día 18/02/2018 a las 12:59:</strong></p> 
                        
                        <div className="row">
                            <p className="col s10 offset-m1">&nbsp; &nbsp; &nbsp; &nbsp; El libro mola ya que el humor es muy chulo. Refleja la literatura catalana. Profe, menos mal que
                hoy no hay clase porque tengo un resacón...</p>
                        </div>

                        <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>Nota:</strong> 3 (Aunque molarían estrellas)</p> 

                        <p className="right">&nbsp; &nbsp; &nbsp; &nbsp; <i className="material-icons">thumb_up</i> 3</p>
                    </div>
                </div>

                <div className="row">
                    <ul class="pagination center-align">
                        <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                        <li class="waves-effect"><a href="#!">1</a></li>
                        <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
                    </ul>
                </div>

                <Footer/>
            </div>
        )
    }
}

render(<Inicio/>, document.getElementById('base'));
