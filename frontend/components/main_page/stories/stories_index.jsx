import React from 'react';
import StoriesIndexItem from './stories_index_item';
import { Link } from 'react-router-dom';
import StoryLoadingAnimation from 'react-loading-animation';

class StoriesIndex extends React.Component {
  state = {
    fetching: false,
    condensedView: window.innerWidth <= 780
  };

  static defaultProps = {
    stories: [],
    title: ""
  };

  componentDidMount() {
    document.querySelector(".main-content").scrollTo(0,0);
    document.querySelector(".main-content").addEventListener('scroll', this.onScroll, false);
    addEventListener('resize', this.onResize, false)
    if (this.props.stories.length === 0 || this.props.readView) {
      this.props.fetchAction(this.props.match.params.id);
    }
    this.storyIndex = document.querySelector(".story-index");
  }

  onResize = e => {
    if (this.storyIndex.offsetWidth < 500 && !this.state.condensedView) {
      this.setState({condensedView: true})
    } else if (this.storyIndex.offsetWidth > 500 && this.state.condensedView) {
      this.setState({condensedView: false})
    }
  }

  componentWillUnmount() {
    let timeout = null;
    document.querySelector(".main-content").removeEventListener('scroll', this.onScroll, false);
    removeEventListener('resize', this.onResize, false);
  }

  componentWillUpdate(newProps) {
    if (newProps.stories.length > this.props.stories.length) {
      this.setState({ fetching: false });
    }
  }

  onScroll = (e) => {
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
          titleLink={Boolean(titleLink)}
          history={this.props.history}
          {...this.state}
          {...this.props}
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

export default StoriesIndex;
