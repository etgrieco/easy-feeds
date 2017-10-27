import React from 'react';

class FeedsIndexRow extends React.Component {

  handleDelete(feed) {
    return e => this.props.deleteFeed(feed);
  }

  render() {
    const { feed } = this.props;
    return (
      <tr>
        <td>
          <img src={feed.image_url} className="feed-index-icon"/>
          {feed.subscription_title}
        </td>
        <td>FEED STATUS</td>
        <td>
          <button>Rename</button>
          <button onClick={this.handleDelete(feed)}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default FeedsIndexRow;
