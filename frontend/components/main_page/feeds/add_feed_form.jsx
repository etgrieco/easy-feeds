import React from 'react';

export class AddFeedForm extends React.Component {

  handleSubmit() {
    return e => this.props.createFeed({rss_url: e.target.value });
  }

  render() {
    return(
      <form className="add-feed-form" onSubmit={this.handleSubmit}>
        <input placeholder="Add a feed URL"/>
        <button>Add Feed</button>
      </form>
    );
  }

}

export default AddFeedForm;

// export default () => (<input placeholder="Add a feed URL"/>);
