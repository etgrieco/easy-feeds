import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class StoriesIndexItem extends React.Component {

  render() {
    const { story, feed } = this.props;
    const pubDateTime = moment(story.pub_datetime).fromNow();

    // const summary = story.summary ? story.summary.slice(0,400).split(".").slice(0, -1).join(".") + ' ...' : null;
    const summary = story.summary ? story.summary.slice(0,300).split(" ").slice(0, -1).join(" ") + "..." : null;
    const summaryText = {__html: summary};

    const backgroundImage = `url(${story.image_url || feed.favicon_url})`;
    const imageStyle = {backgroundImage};

    return (
      <Link className="link-wrapper" to={`/i/stories/${story.id}`}>
      <div className="story-index-item">
        <div className="story-item-image" style={imageStyle} />
        <div className="story-details">
          <h4>
            <Link to={`/i/stories/${story.id}`}>
              {story.title}
            </Link>
          </h4>

          <h5>
            { !this.props.titleLink ?
              <Link to={`/i/subscriptions/${story.feed_id}`}>
                {feed.subscription_title}
              </Link> : null
            }
            {` by ${story.author} / ${pubDateTime}`}
          </h5>
            <p dangerouslySetInnerHTML={summaryText} />
        </div>
      </div>
    </Link>
    );
  }
}

export default StoriesIndexItem;
