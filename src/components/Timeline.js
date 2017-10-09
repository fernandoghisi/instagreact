import React, { Component } from 'react';
import FotoItem from './FotoItem';

export default class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = {fotos: []};
    this.login = this.props.login;
  }

  loadPhotos() {
    let urlProfile;
    if (this.login === undefined) {
      urlProfile = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else {
      urlProfile = `http://localhost:8080/api/public/fotos/${this.login}`;
    }
    fetch(urlProfile)
      .then(response => response.json())
      .then(fotos => {
        this.setState({fotos:fotos});
      });
  }

  componentDidMount() {
    this.loadPhotos();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== undefined) {
      this.login = nextProps.login;
      this.loadPhotos();
    }
  }

  render() {
    return (
      <div className="fotos container">
        {
          this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto}/>)
        }
      </div>            
    );
  }
}