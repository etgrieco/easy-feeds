import React from 'react';

export class AddFeedForm extends React.Component {
  state = {rss_url: ""};

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createFeed(this.state);
  }

  componentWillReceiveProps() {
    this.setState({rss_url: ""});
  }

  render() {
    const errors = this.props.errors.map((err, idx) => <li key={idx}>{err}</li>);
    const loadingMessages = this.props.loadingMessages.map((msg, idx) =>
      <li key={idx}>{msg}</li>
    );

    return(
      <form className="add-feed-form" onSubmit={this.handleSubmit}>
        <div className="add-feed-input-container">
          <input placeholder="Add a feed URL..."
            value={this.state.rss_url}
            onChange={e => this.setState({rss_url: e.target.value})}
            />
          <i className="fa fa-search" aria-hidden="true"></i>
          <button className="green-button">Add Feed</button>
          <ul className="add-feed-errors">{errors}</ul>
        </div>
      </form>
    );
  }

}

export default AddFeedForm;
