import React from 'react';
import StoriesIndexItem from './stories_index_item';
import { Link } from 'react-router-dom';

class StoriesIndex extends React.Component {

  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    let timeout = null;

    window.document.querySelector(".main-content").addEventListener('scroll', e => this.onScroll(e, timeout), false);
    if (this.props.stories.length === 0) {
      this.props.fetchAction(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    window.document.querySelector(".main-content").removeEventListener('scroll', this.onScroll, false);
  }

  onScroll(e, timeout) {
    if ((e.target.scrollHeight - e.target.scrollTop
          <= e.target.offsetHeight + 200) &&
        this.props.stories.length
      ) {
      timeout = timeout ? clearTimeout(timeout) :
        setTimeout(
          () => this.fetchMoreStories(this.props.stories.length)
          , 500);
    }
  }

  componentWillReceiveProps(newProps) {
    const oldURL = this.props.match.url;
    const newURL = newProps.match.url;
    if (newProps.stories.length === 0 && oldURL !== newURL) {
      newProps.fetchAction(newProps.match.params.id);
    }
  }

  fetchMoreStories(offset) {
    this.props.fetchAction(this.props.match.params.id, offset);
  }

  render() {
    const { stories, feeds, title, titleLink } = this.props;
    const id = this.props.match.params.id;

    const storyItems = stories.map(story => {
      const feed = feeds[story.feed_id];

      return (
        <StoriesIndexItem key={story.id}
          story={story}
          feed={feed}
          titleLink={Boolean(titleLink)}
          history={this.props.history}
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
      </div>
    );
  }

}

export default StoriesIndex;
