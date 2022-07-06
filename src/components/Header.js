import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    nome: '',
    carregar: true,
  }

componentDidMount = () => {
  this.isGetUser();
}

  isGetUser = async () => {
    const user = await getUser();
    this.setState({ nome: user, carregar: false });
  };

  render() {
    const { nome, carregar } = this.state;
    return (
      <header data-testid="header-component">
        {carregar ? <Loading /> : (
          <h3 data-testid="header-user-name">
            {nome.name}
          </h3>
        )}
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisar </Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos </Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
