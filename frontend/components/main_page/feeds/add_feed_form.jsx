import React from 'react';

export class AddFeedForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rss_url: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.createFeed(this.state);
  }

  render() {
    return(
      <form className="add-feed-form" onSubmit={this.handleSubmit}>
        <input placeholder="Add a feed URL"
          value={this.state.rss_url}
          onChange={e => this.setState({rss_url: e.target.value})}
          />
        <button>Add Feed</button>
      </form>
    );
  }

}

export default AddFeedForm;

// export default () => (<input placeholder="Add a feed URL"/>);
