import React from 'react';
import StoriesIndexItem from './stories_index_item';

class StoriesIndex extends React.Component {

  componentDidMount() {
    this.props.fetchAllSubscriptions();
  }

  render() {
    const { storiesIds, stories, feeds } = this.props;
    const storyItems = storiesIds.map(storyId => {
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
