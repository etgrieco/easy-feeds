import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStory } from '../../../actions/story_actions';

class StoriesShow extends  React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStory(this.props.match.params.id);
  }

  render() {
    let { story } = this.props;

    story = story ? story : { title: "", link_url: "", summary: ""};

    return (
      <div>
        <h1>{story.title}</h1>
        <div className="story-summary">
          <p>{story.summary}</p>
        </div>
        <div>
          <a href={`${story.link_url}`}>Visit Website</a>
        </div>
      </div>

    );
  }
}

export default withRouter(
  connect(
    (state, ownProps) => (
      {
        story: state.entities.stories.byId[ownProps.match.params.id]
      }
    ),
    dispatch => (
      {
        fetchStory: (storyId) => dispatch(fetchStory(storyId))
      }
    )
  )(StoriesShow));
