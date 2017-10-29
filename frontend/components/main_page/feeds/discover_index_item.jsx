import React from 'react';

class DiscoverIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  handleSubscribe(feed) {
    this.props.createFeed(feed);
  }

  render() {
    const { feed } = this.props;
    return (
      <div key={feed.id}>
        {feed.title}
        {
          feed.subscribed ? null :
          <button onClick={e => this.handleSubscribe(feed)}>Subscribe</button>
        }
      </div>
    );
  }

}


export default DiscoverIndexItem;
