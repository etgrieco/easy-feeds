import React from 'react';
import StoriesIndexItem from './stories_index_item';

class StoriesIndex extends React.Component {

  componentDidMount() {
    switch (this.props.formType) {
      case 'ALL':
        this.props.fetchAction();
        break;
      case 'FEED':
        this.props.fetchAction(this.props.match.params.formId);
        break;
      case 'COLLECTION':
        this.props.fetchAction(this.props.match.params.collectionId);
        break;
      default:
        this.props.fetchAction();
    }
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
