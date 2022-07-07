import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  saveMusicFavorite = async () => {
    const { data } = this.props;
    this.setState({ loading: true });
    await addSong(data);
  }

  render() {
    const { loading } = this.state;
    const { previewUrl, trackName } = this.props;
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
