import React from 'react';
import Header from '../components/Header';

const minCharacters = 2;
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  handlChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { search } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              data-testid="search-artist-input"
              id="search-artist-input"
              type="text"
              name="search"
              onChange={ this.handlChange }
              value={ search }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ search.length < minCharacters }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
export default Search;
