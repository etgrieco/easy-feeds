import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

class StoriesIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect(e, id) {
    const originPath = this.props.history.location.pathname;
    if (e.target.tagName.toLowerCase() !== 'a') {
      this.props.history.push(`${originPath}/stories/${id}`);
    }

  }

  render() {
    const { story, feed } = this.props;
    let pubDateTime = moment(story.pub_datetime).fromNow();
    pubDateTime = pubDateTime.split(" ")[0] === "in" ? "Just now" : pubDateTime;

    const summary = story.teaser ? story.teaser.slice(0,250).split(" ").slice(0, -1).join(" ") + "..." : null;
    const summaryText = {__html: summary};

    const backgroundImage = `url(${story.image_url || feed.favicon_url})`;
    const imageStyle = {backgroundImage};

    const originPath = this.props.history.location.pathname;

    return (
      <div className="story-index-item" onClick={e => this.handleRedirect(e, story.id)}>
        <div className="story-item-image" style={imageStyle} />
        <div className="story-details">
          <h4>
            <Link to={`${originPath}/stories/${story.id}`}>
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
