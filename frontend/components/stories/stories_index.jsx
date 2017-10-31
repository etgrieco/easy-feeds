import React from 'react';
import StoriesIndexItem from './stories_index_item';

class StoriesIndex extends React.Component {

  componentDidMount() {
    this.props.fetchAction(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    const newURL = newProps.match.url;
    const oldURL = this.props.match.url;
    if (newURL !== oldURL) {
      this.props.fetchAction(newProps.match.params.id);
    }
  }

  render() {
    const { storyIds, stories, feeds } = this.props;
    const storyItems = storyIds.map(storyId => {
      const story = stories[storyId];
      const feed = feeds[story.feed_id];

      return (
        <StoriesIndexItem key={storyId}
          story={story}
          feed={feed} />
      );
    }
    );

    return (
      <div className="story-index">
        {storyItems}
      </div>
    );
  }

}

export default StoriesIndex;
