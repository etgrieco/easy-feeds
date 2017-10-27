import React from 'react';
import FeedsIndexRow from './feeds_index_row';

export class FeedsIndex extends React.Component {

  componentDidMount() {
    this.props.fetchAllSubscriptions();
  }

  render() {
    const feedsIndexRows = this.props.feeds.map(feed => {
      return <FeedsIndexRow key={feed.id}
        deleteFeed={this.props.deleteFeed}
        feed={feed} />;
    });

    return (
      <div className="feeds-index">
        <h1>Organize Sources</h1>
        <table>
          <thead>
            <tr>
              <th>Source Name</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {feedsIndexRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FeedsIndex;
