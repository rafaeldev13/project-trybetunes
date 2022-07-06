import React from 'react';
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
      </header>
    );
  }
}

export default Header;
