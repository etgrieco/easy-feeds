import React from 'react';

class StoriesIndex extends React.Component {

  componentDidMount() {
    this.props.fetchAllSubscriptions();
  }

  render() {
    const { storiesIds, stories } = this.props;
    const storyTitles = storiesIds.map(
      storyId =>
      <li>{stories[storyId].title}</li>
    );

    return (
      <div>
        {storyTitles}
      </div>
    );
  }

}

export default StoriesIndex;
