import React from 'react'
import SearchBar from './SearchBar'
import VideoLoad from '../api/VideoLoad'
import VideoList from './VideoList'
import VideoDetail from './VideoDetail'
import 'semantic-ui-css/semantic.min.css'

class VideoPlayer extends React.Component {
  state = { videos: [], selectedVideo: null }

  componentDidMount() {
    this.onTermSubmit('jazzy')
  }

  onTermSubmit = async (term) => {
    const response = await VideoLoad.get('/search', {
      params: {
        q: term,
      },
    })

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    })
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video })
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: '30px' }}>
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoPlayer
