import React from 'react';
import { Link } from 'react-router-dom';

class StoriesIndexItem extends React.Component {

  render() {
    const { story, feed } = this.props;

    const pubDateTime = timeSince(new Date(story.pub_datetime));

    return (
      <div className="story-index-item">
        <div className="story-item-image">
          <img src={story.image_url || feed.favicon_url} />
        </div>
        <div className="story-details">
          <h4>{story.title}</h4>

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

// source: https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + "y";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + "m";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + "months";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + "h";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + "min";
  }
  return Math.floor(seconds) + "s";
}

export default StoriesIndexItem;
