import React from 'react';

export class AddFeedForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rss_url: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createFeed(this.state);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  render() {
    const errors = this.props.errors.map((err, idx) => <li key={idx}>{err}</li>);
    const loadingMessages = this.props.loadingMessages.map((msg, idx) =>
      <li key={idx}>{msg}</li>
    );

    return(
      <form className="add-feed-form" onSubmit={this.handleSubmit}>
        <ul className="add-feed-errors">{errors}</ul>
        <ul className="loading-messages">{loadingMessages}</ul>
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
