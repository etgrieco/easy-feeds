import React from 'react';
import StoriesIndexItem from './stories_index_item';
import { Link } from 'react-router-dom';
import StoryLoadingAnimation from 'react-loading-animation';

class StoriesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.state = {fetching: false};
  }

  componentDidMount() {
    window.document.querySelector(".main-content").scrollTo(0,0);
    window.document.querySelector(".main-content").addEventListener('scroll', this.onScroll, false);
    if (this.props.stories.length === 0 || this.props.readView) {
      this.props.fetchAction(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    let timeout = null;
    window.document.querySelector(".main-content").removeEventListener('scroll', this.onScroll, false);
  }

  componentWillUpdate(newProps) {
    if (newProps.stories.length > this.props.stories.length) {
      this.setState({ fetching: false });
    }
  }

  onScroll(e) {
    if (this.props.readView || this.props.previewView) { return; }

    if ((e.target.scrollHeight - e.target.scrollTop
          <= e.target.offsetHeight + 300) &&
        this.props.stories.length &&
        this.props.moreStories &&
        !this.state.fetching
      ) {
        this.setState({fetching: true})
        this.fetchMoreStories(this.props.stories.length)
      }
  }

  componentWillReceiveProps(newProps) {
    const oldURL = this.props.match.url;
    const newURL = newProps.match.url;
    if (newProps.stories.length === 0 && oldURL !== newURL) {
      newProps.fetchAction(newProps.match.params.id);
    } else if (oldURL !== newURL) {
      window.document.querySelector(".main-content").scrollTo(0,0);
    }
  }

  fetchMoreStories(offset) {
    this.props.fetchAction(this.props.match.params.id, offset);
  }

  render() {
    const { stories, feeds, title, titleLink,
            moreStories, previewView, readView } = this.props;

    const id = this.props.match.params.id;

    const storyItems = stories.map(story => {
      const feed = feeds[story.feed_id];

      return (
        <StoriesIndexItem key={story.id}
          story={story}
          feed={feed}
          readStory={this.props.readStory}
          unreadStory={this.props.unreadStory}
          titleLink={Boolean(titleLink)}
          history={this.props.history}
          readView={this.props.readView}
          previewView={this.props.previewView}
           />
      );
    }
    );

    return (
      <div className="story-index">
        <div>
          <h2>{titleLink ?
                <a href={titleLink} target="__blank">{title}</a>
                 : title
          }</h2>
        </div>
        {storyItems}
        { moreStories && !previewView && !readView ?
          <StoryLoadingAnimation /> : null
        }
      </div>
    );
  }

}

StoriesIndex.defaultProps = {
  stories: [],
  title: ""
};

export default StoriesIndex;
