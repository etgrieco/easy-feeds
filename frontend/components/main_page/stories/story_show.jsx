import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStory } from '../../../actions/story_actions';

class StoriesShow extends  React.Component {

  componentDidMount() {
    this.props.fetchStory(this.props.match.params.id);
  }

  render() {
    let { story } = this.props;

    story = story ? story :
      { title: "", link_url: "", summary: ""};

    story.feedInfo = story.feedInfo ?
      story.feedInfo : {title: "" };

    const { summary, image_url, link_url, title } = story;
    const feedTitle = story.feedInfo.title;

    const summaryText = {__html: summary};
    const backgroundImage = `url(${image_url})`;
    const imageStyle = {backgroundImage};

    return (
      <div className="story-show-container">
        <h1>{title}</h1>

        <div className="story-show-info">
          {feedTitle}
        </div>

        <div className="story-show-image">
          <img src={image_url} />
        </div>

        <div className="story-summary">
          <article dangerouslySetInnerHTML={summaryText} />
        </div>

        <div className="story-website-link">
          <a target="__blank"
            href={`${link_url}`}><button>Visit Website</button></a>
        </div>
      </div>

    );
  }
}


export default withRouter(
  connect(
    (state, ownProps) => {
      const story = state.entities.stories.byId[ownProps.match.params.id];
      return {
        story
      };
    },
    dispatch => (
      {
        fetchStory: (storyId) => dispatch(fetchStory(storyId))
      }
    )
  )(StoriesShow));
