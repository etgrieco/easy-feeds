import React from 'react';
import { Link } from 'react-router-dom';
import merge from 'lodash/merge';

class FeedsIndexRow extends React.Component {
  state = {
    renaming: false,
    isMouseInside: false,
  }

  updateTitle = (title) => {
    this.props.updateSubscription({
      id: this.props.feed.subscription_id,
      title
    }).then(() => {
      this.setState({renaming: false});
    });
  }

  handleDelete = () => {
    this.props.deleteFeed(this.props.feed);
  }

  rename = () => {
    this.setState({ renaming: true })
  }

  render() {
    const { feed } = this.props;
    const { isMouseInside, renaming } = this.state;

    return (
      <tr className="feed-index-row"
        onMouseEnter={e => this.setState({ isMouseInside: true })}
        onMouseLeave={e => this.setState({ isMouseInside: false })}
      >
      <td className="feed-source-name">
        <img src={feed.favicon_url} className="feed-index-icon"/>

        { renaming ?
          <SubscriptionTitleInput
            updateTitle={this.updateTitle}
            title={feed.subscription_title}
          /> :
          <div className="feed-name-show">
            <Link to={`/i/subscriptions/${feed.id}`}>{feed.subscription_title}</Link>
            { isMouseInside ? <PencilButton rename={this.rename} /> : null }
          </div>
        }

      </td>
      <td className="feed-status-text">{feed.status}</td>
      <td className="feed-delete-cell">
        { isMouseInside ? <TrashButton handleDelete={this.handleDelete} /> : null }
      </td>
      </tr>
    );
  }
}

function PencilButton({ rename }) {
  return (
    <button className="modify-button feed-rename" onClick={rename}>
      <i className="fa fa-pencil" aria-hidden="true"></i>
    </button>
  );
}

class TrashButton extends React.Component {
  state = { confirmation: false }

  triggerConfirm = () => {
    if (this.state.confirmation) {
      this.props.handleDelete();
    } else {
      this.setState({ confirmation: true });
    }
  }

  render() {
    return (
      <button className="modify-button feed-delete" onClick={this.triggerConfirm}>
        { this.state.confirmation ?
          "DELETE?" :
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        }
      </button>
    );
  }
}

class SubscriptionTitleInput extends React.Component{
  state = {title: this.props.title};

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateTitle(this.state.title);
  }

  handleChange = e => {
    this.setState({title: e.target.value});
  }

  render() {
    const { title } = this.state;

    return (
      <form className="feed-rename-form" onSubmit={this.handleSubmit}>
        <input type="text"
          value={title}
          onChange={this.handleChange}
          />
        <button><i className="fa fa-check" aria-hidden="true"></i></button>
      </form>
    );
  }
}

export default FeedsIndexRow;
