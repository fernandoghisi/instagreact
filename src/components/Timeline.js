import React, { Component } from 'react';
import FotoItem from './Foto';
import { CSSTransitionGroup } from 'react-transition-group';
import TimelineStore from '../logicas/TimelineStore';
import { connect } from 'react-redux';

class Timeline extends Component {

  constructor(props) {
    super(props);
    this.login = this.props.login;
  }

  carregaFotos() {
    let urlPerfil;

    if (this.login === undefined) {
      urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else {
      urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
    }

    this.props.lista(urlPerfil);
  }

  componentDidMount() {
    this.carregaFotos();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.login) {
      this.login = nextProps.login;
      this.carregaFotos();
    }
  }

  render() {
    console.log("render");
    return (
      <div className="fotos container">
        <CSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
            this.props.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.props.like} comenta={this.props.comenta} />)
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { fotos: state.timeline }
};

const mapDispatchToProps = dispatch => {
  return {
    like: (fotoId) => {
      dispatch(TimelineStore.like(fotoId));
    },
    comenta: (fotoId, textoComentario) => {
      dispatch(TimelineStore.comenta(fotoId, textoComentario))
    },
    lista: (urlPerfil) => {
      dispatch(TimelineStore.lista(urlPerfil));
    }

  }
}

const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(Timeline);

export default TimelineContainer