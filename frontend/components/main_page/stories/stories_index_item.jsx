import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class StoriesIndexItem extends React.Component {

  render() {
    const { story, feed } = this.props;
    const pubDateTime = moment(story.pub_datetime).fromNow();

    return (
      <div className="story-index-item">
        <div className="story-item-image">
          <img src={story.image_url || feed.favicon_url} />
        </div>
        <div className="story-details">
          <h4>
            <Link to={`/i/stories/${story.id}`}>
              {story.title}
            </Link>
          </h4>

          <h5>
            <Link to={`/i/subscriptions/${story.feed_id}`}>
              {feed.subscription_title}
            </Link>
            {` by ${story.author} / ${pubDateTime}`}
          </h5>
          <p>{story.summary ? story.summary.split('.')[0].slice(0,200) + ' ...' : null}</p>
        </div>
      </div>
    );
  }
}

export default StoriesIndexItem;
