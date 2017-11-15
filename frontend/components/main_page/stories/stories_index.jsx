import React from 'react';
import StoriesIndexItem from './stories_index_item';
import { Link } from 'react-router-dom';

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

  fetchMoreStories(offset) {
    this.props.fetchAction(this.props.match.params.id, offset);
  }

  render() {
    const { stories, feeds, title, titleLink } = this.props;
    const id = this.props.match.params.id;

    const storyItems = stories.map(story => {
      const feed = feeds[story.feed_id];

      return (
        <StoriesIndexItem key={story.id}
          story={story}
          feed={feed}
          titleLink={Boolean(titleLink)}
          history={this.props.history}
           />
      );
    }
    );

    return (
      <div className="story-index">
        <div>
          <h2>{titleLink ?
                <a href={titleLink} target="__blank">{title}</a>
                 : title
          }</h2>
        </div>
        {storyItems}
        <div onClick={e => this.fetchMoreStories(stories.length)}>CLICK FOR MORE STORIES</div>
      </div>
    );
  }

}

export default StoriesIndex;
