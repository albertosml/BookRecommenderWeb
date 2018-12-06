import React, { Component } from 'react';
import { render } from 'react-dom';

import Menu from './Menu';
import Footer from './Footer';

import StarRatings from 'react-star-ratings';

class MyValorations extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <h3 className="center-align">Mis valoraciones</h3>
                <div className="row">
                    <div className="col s8 offset-s2 card orange lighten-2">
                        <p className="white-text center-align">La Mare Balena</p>

                        <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>Valoración hecha el día 18/02/2018 a las 12:59:</strong></p> 
                        
                        <div className="row">
                            <p className="col s10 offset-m1">&nbsp; &nbsp; &nbsp; &nbsp; El libro mola ya que el humor es muy chulo. Refleja la literatura catalana. Profe, menos mal que
                hoy no hay clase porque tengo un resacón...</p>
                        </div>

                        <p>&nbsp; &nbsp; &nbsp; &nbsp;<strong>Nota:</strong> &nbsp; <StarRatings rating={3} starRatedColor="yellow" starDimension="20px" starSpacing="5px"/></p> 

                        <p className="right">&nbsp; &nbsp; &nbsp; &nbsp; <i className="material-icons">thumb_up</i> 3 &nbsp; &nbsp; <i className="material-icons">thumb_down</i> 0</p>
                    </div>
                </div>

                <div className="row">
                    <ul class="pagination center-align">
                        <li class="disabled"><a className="tooltipped" data-position="left" data-delay="50" data-tooltip="Página Anterior"><i class="material-icons">chevron_left</i></a></li>
                        <li class="waves-effect"><a>1</a></li>
                        <li class="waves-effect"><a className="tooltipped" data-position="right" data-delay="50" data-tooltip="Página Siguiente"><i class="material-icons">chevron_right</i></a></li>
                    </ul>
                </div>


                <Footer/>
            </div>
        )
    }
}

render(<MyValorations/>, document.getElementById('base'));
