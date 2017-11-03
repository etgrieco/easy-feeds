import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

class StoriesIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect(e, id) {
    if (e.target.tagName.toLowerCase() === 'a') {
      const subId = e.target.href.split("/").slice(-1)[0];
      this.props.history.push(`/i/subscriptions/${subId}`);
    } else {
      this.props.history.push(`/i/stories/${id}`);
    }

  }

  render() {
    const { story, feed } = this.props;
    let pubDateTime = moment(story.pub_datetime).fromNow();
    pubDateTime = pubDateTime.split(" ")[0] === "in" ? "Just now" : pubDateTime;

    const summary = story.teaser ? story.teaser.slice(0,300).split(" ").slice(0, -1).join(" ") + "..." : null;
    const summaryText = {__html: summary};

    const backgroundImage = `url(${story.image_url || feed.favicon_url})`;
    const imageStyle = {backgroundImage};

    return (
      <div className="story-index-item" onClick={e => this.handleRedirect(e, story.id)}>
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
    );
  }
}

export default StoriesIndexItem;
