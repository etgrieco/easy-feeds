import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStory } from '../../../actions/story_actions';
import moment from 'moment';

class StoriesShow extends React.Component {

  componentDidMount() {
    this.props.fetchStory(this.props.match.params.id);
  }

  render() {
    let { story } = this.props;
    if (!story.feedInfo) { story.feedInfo = {title: "" }; }

    const { summary, image_url, link_url, title } = story;
    const feedTitle = story.feedInfo.title;
    let pubDateTime = moment(story.pub_datetime).fromNow();
    pubDateTime = pubDateTime.split(" ")[0] === "in" ? "Just now" : pubDateTime;

    const summaryText = {
      __html: summary.replace("<a", "<a target=\"__blank\" ")
    };

    return (
      <div className="story-show">
        <h1>{title}</h1>

        <div className="story-show-info">
          <Link to={`/i/subscriptions/${story.feed_id}`}>{feedTitle}</Link>
           / by {story.author} / {pubDateTime}
        </div>

        <div className="story-show-img">
          <img src={image_url} / >
        </div>

        <div className="story-summary">
          <article dangerouslySetInnerHTML={summaryText} />
        </div>

        <a target="__blank" href={`${link_url}`}>
          <div className="story-website-link">
            <button>Visit Website</button>
          </div>
        </a>
      </div>

    );
  }
}

StoriesShow.defaultProps = {
  story: {
    title: "",
    link_url: "",
    summary: "",
    feedInfo: {title: ""}
  }
};

export default withRouter(
  connect(
    (state, ownProps) => {
      const story = state.entities.stories.byId[ownProps.match.params.id];
      return {story};
    },
    dispatch => (
      {
        fetchStory: (storyId) => dispatch(fetchStory(storyId))
      }
    )
  )(StoriesShow));
