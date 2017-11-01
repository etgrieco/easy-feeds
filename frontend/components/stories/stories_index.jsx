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
      newProps.fetchAction(newProps.match.params.id);
    }
  }

  render() {
    const { stories, feeds, storyIds, title} = this.props;
    const id = this.props.match.params.id;

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
        <div>
          {title}
        </div>
        {storyItems}
      </div>
    );
  }

}

export default StoriesIndex;
