import React from 'react';
import StoriesIndexItem from './stories_index_item';
import { Link } from 'react-router-dom';
import StoryLoadingAnimation from 'react-loading-animation';
import { throttle } from 'lodash';

class StoriesIndex extends React.Component {
  state = {
    condensedView: window.innerWidth <= 810
  };

  componentDidMount() {
    document.querySelector(".main-content").scrollTo(0,0);
    document.querySelector(".main-content").addEventListener('scroll', this.throttledScroll, false);
    addEventListener('resize', this.throttledResize, false)
    if (this.props.stories.length === 0 || this.props.readView) {
      this.props.fetchAction(this.props.match.params.id);
    }
    this.storyIndex = document.querySelector(".story-index");
  }

  componentWillUnmount() {
    let timeout = null;
    document.querySelector(".main-content").removeEventListener('scroll', this.throttledScroll, false);
    removeEventListener('resize', this.throttledResize, false);
  }

  throttledResize = throttle(e => this.onResize(e), 300);

  onResize = e => {
    if (this.storyIndex.offsetWidth < 500 && !this.state.condensedView) {
      this.setState({condensedView: true})
    } else if (this.storyIndex.offsetWidth > 500 && this.state.condensedView) {
      this.setState({condensedView: false})
    }
  }

  throttledScroll = throttle(e => this.onScroll(e), 300);

  onScroll = (e) => {
    if (this.props.readView || this.props.previewView) { return; }

    if ((e.target.scrollHeight - e.target.scrollTop
          <= e.target.offsetHeight + 300) &&
        this.props.stories.length &&
        this.props.moreStories
      ) {
        this.fetchMoreStories(this.props.stories.length);
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

    const storyItems = stories.map(story => {
      const feed = feeds[story.feed_id];

      return (
        <StoriesIndexItem key={story.id}
          {...{ story, feed, titleLink }}
          history={this.props.history}
          {...this.state}
          {...this.props}
           />
      );
    }
    );

    return (
      <div className="story-index">
        <StoriesIndexHeader {...{titleLink}}>{title}</StoriesIndexHeader>
        {storyItems}
        {moreStories && !previewView && !readView ?
          <StoryLoadingAnimation /> :
          null}
      </div>
    );
  }

  static defaultProps = {
    stories: [],
    title: "",
    titleLink: null
  };
}

const StoriesIndexHeader = ({titleLink, title, children}) => (
  <div>
    <h2>
      {titleLink ?
        <a href={titleLink} target="__blank">{children}</a>
        : children}
    </h2>
  </div>
);

export default StoriesIndex;
