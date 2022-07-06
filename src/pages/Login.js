import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '',
      changeOfButton: true,
      loading: false,
      btnDisabled: false,
    };
  }

  handlChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.enableButton);
  }

  enableButton = () => {
    const { login } = this.state;
    const minCharacters = 3;
    if (login.length >= minCharacters) {
      this.setState({
        changeOfButton: false,
      });
    } else {
      this.setState({
        changeOfButton: true,
      });
    }
  };

  clickButton = async () => {
    const { login } = this.state;

    this.setState(
      { loading: true },
    );
    await createUser({ name: login });
    this.setState({ btnDisabled: true });
  }

  render() {
    const { login, changeOfButton, loading, btnDisabled } = this.state;

    return (
      <div data-testid="page-login">
        Login
        <form>
          <label htmlFor="login-name-input">
            <input
              data-testid="login-name-input"
              type="text"
              name="login"
              onChange={ this.handlChange }
              value={ login }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ changeOfButton }
            onClick={ this.clickButton }
            name="Entrar"
            value="Entrar"
          >
            Entrar
          </button>
        </form>
        <div>
          { loading ? <Loading /> : null }
          { btnDisabled ? <Redirect to="/search" /> : null }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string,
  changeOfButton: PropTypes.bool,
  loading: PropTypes.bool,
  btnDisabled: PropTypes.bool,
}.isRequired;

export default Login;
