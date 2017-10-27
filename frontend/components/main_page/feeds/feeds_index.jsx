import React from 'react';

export class FeedsIndex extends React.Component {

  componentDidMount() {
    this.props.fetchAllSubscriptions();
  }

  render() {
    const { feeds } = this.props;
    const feedsList = feeds.map( feed => (
      <div key={feed.id} className="feed-item">
        <p>{feed.title}</p>
        <li >{feed.website_url}</li>
      </div>
    ));
    return (
      <div className="feeds-index">
        {feedsList}
      </div>
    );
  }
}

export default FeedsIndex;
