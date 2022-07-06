import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumAPI from '../services/searchAlbumsAPI';

const minCharacters = 2;
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      album: [],
      artista: '',
    };
  }

  getAlbum = async () => {
    const { search } = this.state;
    this.setState({
      artista: search,
    });
    const data = await searchAlbumAPI(search);
    this.setState({
      album: data,
      search: '',
    });
  }

  handlChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { search, album, artista } = this.state;

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
            onClick={ this.getAlbum }
          >
            Pesquisar
          </button>
        </form>
        {album.length > 1
        && <p>{`Resultado de álbuns de: ${artista}`}</p>}
        {album.map((albuns) => (
          <div key={ albuns.collectionId }>
            <img src={ albuns.artworkUrl100 } alt="Capa do Album" />
            <p>{albuns.collectionName}</p>
            <p>{albuns.artistName}</p>
            <Link
              data-testid={ `link-to-album-${albuns.collectionId}` }
              to={ `/album/${albuns.collectionId}` }
            >
              Album
            </Link>
          </div>
        ))}
        {album.length === 0 ? <p>Nenhum álbum foi encontrado</p> : ''}
      </div>

    );
  }
}
export default Search;
