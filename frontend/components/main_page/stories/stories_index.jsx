import React from 'react';
import StoriesIndexItem from './stories_index_item';

class StoriesIndex extends React.Component {

  componentDidMount() {
    if (this.props.popOutFeedId) {
      this.props.fetchAction(this.props.popOutFeedId);
      return;
    }

    this.props.fetchAction(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    // for switching among feed-views
    const newURL = newProps.match.url;
    const oldURL = this.props.match.url;
    if (newURL !== oldURL) {
      newProps.fetchAction(newProps.match.params.id);
    }
  }

  render() {
    const { stories, feeds, title } = this.props;
    const id = this.props.match.params.id;

    const storyItems = stories.map(story => {
      const feed = feeds[story.feed_id];

      return (
        <StoriesIndexItem key={story.id}
          story={story}
          feed={feed} />
      );
    }
    );

    return (
      <div className="story-index">
        <div>
          {title}
        </div>
        {storyItems}
      </div>
    );
  }

}

export default StoriesIndex;
