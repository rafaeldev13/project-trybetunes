import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Header from '../components/Header';

class Album extends React.Component {
      state = {
        musicas: [],
        nameArtist: '',
        albumArtist: '',
      }

      componentDidMount() {
        this.musics();
      }

    musics = async () => {
      const { match: { params: { id } } } = this.props;
      const musicApi = await getMusics(id);
      const [index, ...musicas] = musicApi;
      this.setState({ musicas,
        nameArtist: index.artistName,
        albumArtist: index.collectionName });
    }

    render() {
      const { nameArtist, albumArtist, musicas } = this.state;
      return (
        <div data-testid="page-album">
          <Header />
          <p data-testid="artist-name">{nameArtist}</p>
          <p data-testid="album-name">{albumArtist}</p>
          <div>
            {musicas.map((param) => (
              <MusicCard
                key={ param.trackId }
                trackId={ param.trackId }
                trackName={ param.trackName }
                src={ param.previewUrl }
                data={ param }
              />
            ))}
          </div>
        </div>
      );
    }
}
Album.propTypes = {
  match: PropTypes.string,
}.isRequired;
export default Album;
