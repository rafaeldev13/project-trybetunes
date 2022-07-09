import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
  }

  saveMusicFavorite = async () => {
    const { data } = this.props;
    this.setState({ loading: true });
    await addSong(data);
    this.setState({ loading: false, check: true });
    this.getSongsFavorite();
  }

  getSongsFavorite = async () => {
    const { data } = this.props;
    this.setState({ check: true });
    await getFavoriteSongs(data);
  }

  render() {
    const { loading, check } = this.state;
    const { trackId, previewUrl, trackName } = this.props;
    return (
      <div>
        { loading ? <Loading /> : (
          <p>
            <p>
              { trackName }
            </p>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track
                kind="captions"
              />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="Label Favorita">
              <input
                text="Favorita"
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.saveMusicFavorite }
                checked={ check }
              />
              Favorita
            </label>
          </p>
        )}

      </div>

    );
  }
}
MusicCard.propTypes = {
  key: PropTypes.string,
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;
export default MusicCard;
