import React from 'react';
import FeedsIndexRow from './feeds_index_row';

export class FeedsIndex extends React.Component {
  componentDidMount() {
    window.document.querySelector(".main-content").scrollTo(0,0);
  }

  render() {
    const { feeds, subscriptionIds, updateSubscription, deleteFeed, errors } = this.props;
    const feedsIndexRows = subscriptionIds.map(feedId => {
      const feed = feeds[feedId];
      return <FeedsIndexRow key={feed.id} {...{ updateSubscription, deleteFeed, feed }} />;
    });

    return (
      <div className="feeds-index-container">
        <h1>Organize Sources</h1>
        <div className="feeds-following-sources">
          <p>Following <span>{subscriptionIds.length} sources</span></p>
        </div>
        <div style={{color: "red"}}>{errors}</div>
        <div className="feeds-index">
          <div>
            <table>
              <thead>
                <tr className="feed-header-row">
                  <th className="feed-source-header">Source Name</th>
                  <th className="feed-status-header">Status</th>
                  <th className="feed-delete-header"></th>
                </tr>
              </thead>
              <tbody>
                {feedsIndexRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedsIndex;
